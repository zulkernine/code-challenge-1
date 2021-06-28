import React, { Component } from "react";
import "../App.css";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import {
  Paper,
  Grid,
  ButtonGroup,
  Button,
  Typography,
} from "@material-ui/core";

const axios = require("axios");

const customCss = (theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(5),
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    fontSize: 50,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },
});

class DisplayData extends Component {
  state = { data: [], loading: false };

  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { data } = await axios.get(
        "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
      );
      this.setState({ data });
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { classes, history } = this.props;
    const { data, loading } = this.state;
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h1">Data</Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="Card-container"
            style={{
              maxWidth:
                window.innerWidth > 600
                  ? window.innerWidth * 0.7
                  : window.innerWidth * 0.9,
            }}
          >
            {loading ? (
              <Typography variant="h6">Loading text ...</Typography>
            ) : (
              data.map((person) => (
                // Display each person data
                <PersonCard person={person} />
              ))
            )}
          </Grid>

          {/* Navigation button */}
          <Grid item>
            <ButtonGroup variant="outlined" color="primary">
              <Button
                onClick={() => {
                  this.props.history.push("/time");
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/currency");
                }}
              >
                Next
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(customCss)(DisplayData));

const PersonCard = ({person}) => {
  return (
    <Grid
      key={person.email}
      className="Card"
      item
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      xs={12}
    >
      <Grid item>
        <Typography variant="h5" align="left">
          {person.first + " " + person.last}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{person.email}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle2">
          {"Balance: " + person.balance}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2">{"Address: " + person.address}</Typography>
      </Grid>
    </Grid>
  );
};

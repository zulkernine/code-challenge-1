import React, { Component } from "react";

// import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import {
  Paper,
  Grid,
  ButtonGroup,
  Button,
  Typography,
} from "@material-ui/core";

class Time extends Component {
  state = { currentTime: Date().toLocaleUpperCase() };

  componentDidMount() {
    setInterval(() => {
      this.setState({ currentTime: Date().toString() });
    }, 1000); //Update time each second
  }

  render() {
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          {/* Display the full time */}
          <Grid item>
            <Paper elevation={3} style={{ padding: 10, margin: 10 }}>
              <Typography variant="h4">{this.state.currentTime}</Typography>
            </Paper>
          </Grid>

          {/* Navigate to other pages */}
          <Grid item>
            <ButtonGroup
              variant="outlined"
              color="primary"
            >
              <Button
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/data");
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

export default withRouter(Time);

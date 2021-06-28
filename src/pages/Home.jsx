import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import { Paper, Grid, Chip, Button, Typography } from "@material-ui/core";

//Define css classes
const customCss = (theme) => ({
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(5),
    alignItems: "center",
    justifyContent: "center",
    fontSize: 50,
  },
  chip: {
    fontSize: 50,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  },
});

class Home extends Component {
  state = { counter: 0 };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h2">
              Counter
            </Typography>
          </Grid>

          {/* Show the counter value  */}
          <Grid item>
            <Paper className={classes.paper} elevation={3}>
              {this.state.counter}
            </Paper>
          </Grid>

          {/* Buttons to increment/decrement counter */}
          <Grid item>
            <Chip
              label="-"
              color="primary"
              className={classes.chip}
              onClick={() => {
                this.setState({ counter: this.state.counter - 1 });
              }}
            />
            <Chip
              label="+"
              color="primary"
              className={classes.chip}
              onClick={() => {
                this.setState({ counter: this.state.counter + 1 });
              }}
            />
          </Grid>

          {/* Navigate to next page */}
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                    this.props.history.push("/time");
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(customCss)(Home));

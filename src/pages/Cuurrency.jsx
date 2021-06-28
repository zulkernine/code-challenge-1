import React, { Component } from "react";
import { withRouter } from "react-router";
import {
  Paper,
  Grid,
  ButtonGroup,
  Button,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FilledInput,
  InputAdornment,
  CircularProgress,
  Chip
} from "@material-ui/core";

const axios = require("axios");

const availableCurrencies = [
  { currency: "XCD", name: "East Caribbean dollar", symbol: "$" },
  { currency: "EUR", name: "European euro", symbol: "€" },
  { currency: "GEL", name: "Georgian lari", symbol: "₾" },
  { currency: "XCD", name: "East Caribbean dollar", symbol: "$" },
  { currency: "HTG", name: "Haitian gourde", symbol: "G" },
  { currency: "INR", name: "Indian rupee", symbol: "₹" },
  { currency: "ILS", name: "Israeli new sheqel", symbol: "₪" },
  { currency: "KZT", name: "Kazakhstani tenge", symbol: "лв" },
  { currency: "KWD", name: "Kuwaiti dinar", symbol: "د.ك" },
  { currency: "LSL", name: "Lesotho loti", symbol: "L" },
  { currency: "USD", name: "U.S. Dollar", symbol: "$" },
];

class Currency extends Component {
  state = {
    from: availableCurrencies[10],
    to: availableCurrencies[5],
    ratio: 1,
    isLoading: false,
    fromAmount: 0,
    toAmount: 0,
  };

  async componentDidMount() {
    // await this.getRatio("USD_INR");
  }

  getRatio = async (args) => {
    const { from, to } = this.state;
    if (from.length != 0 && to.length != 0) {
      this.setState({ isLoading: true });

      try {
        const response = await axios.get(
          `https://free.currconv.com/api/v7/convert?q=${args}&compact=ultra&apiKey=dd8e835c3d0a875afe5e`
        );
        const ratio = response.data[args];
        const { fromAmount } = this.state;
        this.setState({
          ratio,
          toAmount: fromAmount * ratio,
        });
        return ratio;

      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name !== "fromAmount") {
      let args = "";
      const { from, to } = this.state;

      if (event.target.name === "from")
        args = `${event.target.value.currency}_${to.currency}`;
      else args = `${from.currency}_${event.target.value.currency}`;

      await this.getRatio(args);
    } else {
      this.setState({ toAmount: event.target.value * this.state.ratio });
    }
  };

  render() {
    const { from, to, fromAmount, toAmount, ratio } = this.state;
    return (
      <Paper
        style={{
          padding: 10,
          margin: 10,
        }}
        elevation={3}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h2">Convert Currencies</Typography>
          </Grid>

          {/* Choose two currencies */}
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="choose-currency-from">From</InputLabel>
                <Select
                  id="choose-currency-from"
                  value={from}
                  name="from"
                  onChange={this.handleChange}
                >
                  {availableCurrencies.map((c) => (
                    <MenuItem value={c} key={c.currency}>
                      {c.symbol + " " + c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="filled" fullWidth>
                <InputLabel id="choose-currency-to">To</InputLabel>
                <Select
                  id="choose-currency-to"
                  value={to}
                  name="to"
                  onChange={this.handleChange}
                >
                  {availableCurrencies.map((c) => (
                    <MenuItem value={c} key={c.currency}>
                      {c.symbol + " " + c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item>
            <Chip label={`${from.currency} 1 ~ ${to.currency} ${ratio}`} color="primary" />
          </Grid>

          {/* Conversion result */}
          <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <FilledInput
                  id="outlined-adornment-amount"
                  value={fromAmount}
                  type="number"
                  onChange={this.handleChange}
                  name="fromAmount"
                  startAdornment={
                    <InputAdornment position="start">
                      {from.symbol}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              {this.state.isLoading ? (
                <CircularProgress />
              ) : (
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <FilledInput
                    id="outlined-adornment-amount"
                    value={toAmount}
                    name="toAmount"
                    disabled
                    startAdornment={
                      <InputAdornment position="start">
                        {to.symbol}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            </Grid>
          </Grid>

          {/* Navigation group */}
          <Grid item>
            <ButtonGroup variant="outlined" color="primary">
              <Button
                onClick={() => {
                  this.props.history.push("/data");
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Home
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withRouter(Currency);

import React from "react";
import ReactDOM from "react-dom";
import "./css/index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: "#f44336"
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

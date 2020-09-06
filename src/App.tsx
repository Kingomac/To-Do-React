import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";
import CustomLayout from "./components/CustomLayout";
import { Tasks, Home } from "./views/views";
import { Database } from "./database";

export const db = new Database();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export default function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <CustomLayout />
        <Container maxWidth="sm">
          <Switch>
            <Route path="/c/:id" component={Tasks} />
            <Route path="/" component={Home} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

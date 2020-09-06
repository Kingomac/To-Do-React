import React, { Fragment } from "react";
import {
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import { db } from "../App";
import ListItemLink from "./ListItemLink";

type State = {
  categories: string[];
  showcategdialog: boolean;
  newcategtext: string;
};

export default class CategoryList extends React.Component<{}, State> {
  categories: string[] = [];
  state: State;
  constructor(props = {}) {
    super(props);
    this.state = {
      categories: this.categories,
      showcategdialog: false,
      newcategtext: "",
    };
    this.openNewCategDialog = this.openNewCategDialog.bind(this);
    this.closeNewCategDialog = this.closeNewCategDialog.bind(this);
    this.addCategory = this.addCategory.bind(this);
    db.table("tasks")
      .each((t) => {
        if (!this.categories.includes(t.category))
          this.categories.push(t.category);
      })
      .then(() => this.setState({ categories: this.categories }));
  }
  componentDidMount() {}
  openNewCategDialog() {
    this.setState((state) => ({
      showcategdialog: true,
    }));
  }
  closeNewCategDialog() {
    this.setState((state) => ({
      showcategdialog: false,
    }));
  }
  handleNewCategChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newcategtext: e.target.value,
    });
  }
  addCategory() {
    this.categories.push(this.state.newcategtext);
    this.setState((state) => ({
      categories: this.categories,
      newcategtext: "",
      showcategdialog: false,
    }));
  }
  render() {
    return (
      <Fragment>
        {this.categories.map((c, index) => {
          return <ListItemLink key={index} primary={c} to={`/c/${c}`} />;
        })}
        <ListItem button onClick={this.openNewCategDialog}>
          <ListItemText>Add category</ListItemText>
        </ListItem>
        <Dialog
          open={this.state.showcategdialog}
          onClose={this.closeNewCategDialog}
        >
          <DialogTitle>Add a category</DialogTitle>
          <DialogContent>
            <TextField
              placeholder="Category name"
              value={this.state.newcategtext}
              onChange={this.handleNewCategChange.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.addCategory}>
              Add
            </Button>
            <Button
              color="secondary"
              onClick={this.closeNewCategDialog.bind(this)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

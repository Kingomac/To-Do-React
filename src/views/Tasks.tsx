import React, { Fragment } from "react";
import { db } from "../App";
import TaskAdd from "../components/TaskAdd";
import Task from "../components/Task";
import { List } from "@material-ui/core";

type TasksState = {
  tasks: any[];
  category: string;
  mounted: boolean;
  lastUrl: string;
};

export default class Tasks extends React.Component<{}, TasksState> {
  constructor(props = {}) {
    super(props);
    this.updateTasks = this.updateTasks.bind(this);
    this.state = {
      tasks: [],
      category: window.location.pathname.replace("/c/", ""),
      mounted: false,
      lastUrl: "",
    };
  }

  public get urlCateg(): string {
    return window.location.pathname.replace("/c/", "");
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      lastUrl: this.urlCateg,
    });
    this.updateTasks();
  }
  componentWillUnmount() {
    this.setState({ mounted: false });
  }
  componentDidUpdate() {
    if (this.state.lastUrl !== this.urlCateg) {
      this.updateTasks();
    }
  }
  updateTasks() {
    const id = this.urlCateg;
    db.table("tasks")
      .where({ category: `${id}` })
      .toArray()
      .then((t) => this.setState({ tasks: t, lastUrl: this.urlCateg }));
  }
  render() {
    return (
      <Fragment>
        <h1>Tasks - {this.urlCateg}</h1>
        <List>
          {this.state.tasks.map((t) => {
            return (
              <Task
                key={t.id}
                name={t.name}
                completed={t.completed}
                id={t.id}
                updateTasks={this.updateTasks}
              />
            );
          })}
        </List>
        <TaskAdd updateTasks={this.updateTasks} />
      </Fragment>
    );
  }
}

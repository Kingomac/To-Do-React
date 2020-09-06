import React, { Fragment } from "react";
import { db } from "../App";
import { List } from "@material-ui/core";
import { ITask } from "../database";
import Task from "./Task";

type LastTasksState = {
  tasks: ITask[];
};

export default class LastTasks extends React.Component<{}, LastTasksState> {
  constructor(props = {}) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.updateTasks = this.updateTasks.bind(this);
  }
  componentDidMount() {
    this.updateTasks();
  }
  updateTasks() {
    db.table("tasks")
      .orderBy("updated_at")
      .toArray()
      .then((tasks) => this.setState({ tasks }));
  }
  render() {
    return (
      <Fragment>
        <List>
          {this.state.tasks.map((t, i) => {
            return (
              <Task
                key={i}
                name={t.name}
                completed={t.completed}
                id={t.id || 0}
                updateTasks={this.updateTasks}
                category={t.category}
              />
            );
          })}
        </List>
      </Fragment>
    );
  }
}

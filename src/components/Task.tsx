import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import {
  RadioButtonUnchecked,
  CheckCircleOutline,
  Delete,
} from "@material-ui/icons";
import { db } from "../App";

type TaskProps = {
  id: number;
  name: string;
  completed: boolean;
  category?: string;
  updateTasks: () => void;
};

export default function Task(props: TaskProps) {
  const [completed, setCompleted] = useState<boolean>(props.completed);
  const [deleting, setDeleting] = useState<boolean>(false);
  const handleCheckClick = () => {
    db.table("tasks")
      .update(props.id, {
        updated_at: new Date(),
        completed: !completed,
      })
      .then(() => {
        setCompleted(!completed);
      });
  };
  const deleteTask = () => {
    setDeleting(true);
    db.table("tasks")
      .delete(props.id)
      .then(() => props.updateTasks())
      .then(() => setDeleting(false));
  };
  return (
    <ListItem button>
      <ListItemIcon onClick={handleCheckClick}>
        {completed ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
      </ListItemIcon>
      <ListItemText primary={props.name} secondary={props.category} />
      <ListItemSecondaryAction>
        <IconButton onClick={deleteTask} edge="end" aria-label="delete">
          {deleting ? <CircularProgress size="1rem" /> : <Delete />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

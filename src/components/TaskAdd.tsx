import React, { useState, Fragment } from "react";
import {
  Fab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  makeStyles,
  Theme,
  createStyles,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { db } from "../App";

type TaskAddProps = {
  updateTasks: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    floatbtn: {
      position: "absolute",
      top: "90%",
      left: "85%",
    },
    modalbtn: {
      width: "50%",
    },
  })
);

export default function TaskAdd(props: TaskAddProps) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleDialogClose = () => {
    setShowDialog(false);
  };
  const handleDialogOpen = () => {
    setShowDialog(true);
  };
  const add = () => {
    setLoading(true);
    setShowDialog(false);
    const id = window.location.pathname.replace("/c/", "");
    db.table("tasks")
      .add({
        name: taskName,
        completed: false,
        category: id,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .then((e) => {
        props.updateTasks();
        setTaskName("");
        setLoading(false);
      });
  };
  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };
  return (
    <Fragment>
      <Fab
        className={classes.floatbtn}
        onClick={handleDialogOpen}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Dialog open={showDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a task</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Task name"
            value={taskName}
            onChange={update}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.modalbtn} color="primary" onClick={add}>
            Add
          </Button>
          <Button
            className={classes.modalbtn}
            color="secondary"
            onClick={handleDialogClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}

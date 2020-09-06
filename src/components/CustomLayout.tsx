import React, { Fragment } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Theme,
  createStyles,
  Drawer,
  List,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import ListItemLink from "./ListItemLink";
import CategoryList from "./CategoryList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawerList: {
      width: "200px",
    },
  })
);

export default function CustomAppbar() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = React.useState<boolean>(false);
  const toggleDrawer = () => (e: React.MouseEvent) => {
    setDrawerState(!drawerState);
  };
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer()}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            To-do
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerState} onClose={toggleDrawer()}>
        <List className={classes.drawerList}>
          <ListItemLink primary="Inicio" to="/" />
          <CategoryList />
        </List>
      </Drawer>
    </Fragment>
  );
}

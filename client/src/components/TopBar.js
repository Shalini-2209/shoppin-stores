import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TitleContext } from "../screens/Post";
import { ProfileContext } from "../screens/Profile";
import { FeedContext } from "../screens/Content";
import purple from "@material-ui/core/colors/purple";

import { View } from "react-native";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const newPost = useContext(TitleContext);
  const createProfile = useContext(ProfileContext);
  const feed = useContext(FeedContext);
  const accent = purple.A200;

  return (
    <View>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            style={{ color: "#db7093" }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            style={{ color: "#e28ca8" }}
          >
            {newPost} {createProfile} {feed}
          </Typography>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>
    </View>
  );
}

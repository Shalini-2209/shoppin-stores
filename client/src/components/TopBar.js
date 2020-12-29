import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TitleContext } from "../screens/Post";
import { ProfileContext } from "../screens/Profile";
import NewProfile from "../screens/NewProfile";
import { FeedContext } from "../screens/Content";

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
  // const newProContext = useContext(CreateProContext);
  const feed = useContext(FeedContext);

  const [create, setCreate] = useState(false);

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
          <Text>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ color: "#e28ca8" }}
            >
              {feed} {newPost} {createProfile}
              {/* {newProContext} */}
            </Typography>
          </Text>
          <Button
            variant="outlined"
            style={{ color: "#e28ca8" }}
            onClick={() => setCreate(!create)}
          >
            Create Store
          </Button>
        </Toolbar>
      </AppBar>
      {create && <NewProfile />}
    </View>
  );
}

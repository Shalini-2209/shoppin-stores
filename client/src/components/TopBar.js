import React, { useContext, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TitleContext } from "../screens/Post";
import { ProfileContext } from "../screens/Profile";
import NewProfile from "../screens/NewProfile";
import { FeedContext } from "../screens/Content";
import { View } from "react-native";

export default function TopBar() {
  const newPost = useContext(TitleContext);
  const createProfile = useContext(ProfileContext);
  const feed = useContext(FeedContext);

  const [create, setCreate] = useState(false);
  let size = "auto";
  if (create) {
    size = "100%";
  }
  return (
    <View style={{ height: size }}>
      <View
        // position="static"
        style={{
          backgroundColor: "black",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          marginTop: "10%",
        }}
      >
        <MaterialCommunityIcons name="menu" size={26} color="#db7093" />

        <Text style={{ color: "#e28ca8", fontSize: 20 }}>
          {feed} {newPost} {createProfile}
        </Text>

        <TouchableOpacity
          style={{ position: "absolute", right: 15 }}
          onPress={() => setCreate(!create)}
        >
          <Text style={{ color: "#e28ca8" }}>CREATE STORE</Text>
        </TouchableOpacity>
      </View>
      {create && <NewProfile />}
    </View>
  );
}

import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewProfile from "../screens/NewProfile";
import { View } from "react-native";

export default function TopBar(props) {
  const [create, setCreate] = useState(false);
  let size = "auto";
  if (create) {
    size = "100%";
  }
  return (
    <View style={{ height: size }}>
      <View
        // position="static"
        style={styles.container}
      >
        <MaterialCommunityIcons name="menu" size={26} color="#db7093" />

        <Text style={styles.textInput}> {props.name}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setCreate(!create)}
        >
          <Text style={{ color: "#e28ca8" }}>CREATE STORE</Text>
        </TouchableOpacity>
      </View>
      {create && <NewProfile />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: "10%",
  },

  textInput: {
    color: "#e28ca8",
    fontSize: 20,
    padding: 10,
  },

  button: {
    position: "absolute",
    right: 15,
    padding: 5,
    borderWidth: 3,
    borderColor: "#e28ca8",
    // borderRadius: 40,
  },
});

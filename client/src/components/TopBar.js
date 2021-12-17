import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { LoginContext } from "../components/LoginContext";
import Main from "../screens/Main";

export default function TopBar(props) {
  const [login, setLogin] = React.useContext(LoginContext);

  const logMeOut = () => {
    AsyncStorage.clear();
    setLogin(false);
  };
  return (
    <View style={{ height: "auto" }}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="menu" size={26} color="#db7093" />

        <Text style={styles.textInput}> {props.name}</Text>

        <TouchableOpacity onPress={logMeOut} style={styles.button}>
          <MaterialCommunityIcons name="logout" size={20} color="#db7093" />
          <Text style={{ color: "#e28ca8" }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    // marginTop: "10%",
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
    flexDirection: "row",
  },
});

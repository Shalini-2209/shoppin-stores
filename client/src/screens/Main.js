import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import Register from "./Register";
import Login from "./Login";

export default function Main({ navigation }) {
  const [reg, setReg] = useState(false);
  const [log, setLog] = useState(true);
  // const [header, setHeader] = useState(true);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            setReg(!reg);
            setLog(false);
          }}
        >
          <Text style={styles.saveButtonText}>Join New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            setReg(false);
            setLog(!log);
          }}
        >
          <Text style={styles.saveButtonText}>Member !</Text>
        </TouchableOpacity>
      </View>

      {reg && <Register />}
      {log && <Login navigation={navigation} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 85,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    borderWidth: 3,
    // borderColor: "#bc8f8f",
    backgroundColor: "black",
    borderColor: "#db7093",
    borderWidth: 1,
    color: "#db7093",
    padding: 10,
    alignItems: "center",
    marginTop: 5,
    marginRight: 10,
  },

  saveButtonText: {
    color: "#db7093",
    fontSize: 20,
    textAlign: "center",
  },
});

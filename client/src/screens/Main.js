import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import Register from "./Register";

export default function Main() {
  const [reg, setReg] = useState(false);
  const [log, setLog] = useState(false);
  return (
    <View style={styles.container}>
      <View>
        <Header />
      </View>
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
      {log && "log"}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
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
    color: "#db7093",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    marginRight: 10,
  },

  saveButtonText: {
    color: "#db7093",
    fontSize: 20,
    textAlign: "center",
  },
});

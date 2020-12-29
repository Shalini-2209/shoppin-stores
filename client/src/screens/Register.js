import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Header from "../components/Header";

export default function Register() {
  const initialState = {
    userName: "",
    mobile: "",
    password: "",
  };
  const [register, setRegister] = useState(initialState);

  const handleSave = (e) => {
    e.preventDefault();

    const payload = {
      userName: register.userName,
      mobile: register.mobile,
      password: register.password,
    };

    axios({
      url: "http://localhost:3001/register/newUser",
      method: "POST",
      data: payload,
    })
      .then(() => {
        setRegister(initialState);
        console.log("Welcome new user!");
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <TextInput
        style={styles.textInput}
        maxLength={20}
        value={register.userName}
        placeholder="User Name"
        onChangeText={(text) => setRegister({ ...register, userName: text })}
      />

      <TextInput
        maxLength={20}
        style={styles.textInput}
        value={register.mobile}
        placeholder="Mobile"
        onChangeText={(text) => setRegister({ ...register, mobile: text })}
      />

      <TextInput
        maxLength={20}
        style={styles.textInput}
        value={register.password}
        placeholder="Password"
        onChangeText={(text) => setRegister({ ...register, password: text })}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Join Network</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
  },

  textInput: {
    margin: 15,
    borderBottomWidth: 1,
    borderColor: "grey",
  },

  saveButton: {
    borderWidth: 1,
    // borderColor: "#bc8f8f",
    backgroundColor: "black",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#db7093",
    fontSize: 20,
    textAlign: "center",
  },
});

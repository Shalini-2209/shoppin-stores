import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import config from "../../config";
export default function Register() {
  const initialState = {
    userName: "",
    mobile: "",
    password: "",
    cpass: "",
  };
  const [register, setRegister] = useState(initialState);

  const handleSave = (e) => {
    e.preventDefault();
    if (register.cpass != register.password) {
      alert("Passwords didn't match!");
      return;
    }

    const payload = {
      userName: register.userName,
      mobile: register.mobile,
      password: register.password,
    };

    axios({
      url: `${config.IP}/register/newUser`,
      method: "POST",
      data: payload,
    })
      .then(() => {
        setRegister(initialState);
        console.log("Welcome new user!");
      })
      .catch(() => {
        console.log("Internal server error");
        alert("Registration failed!");
      });
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
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
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={(text) => setRegister({ ...register, password: text })}
      />

      <TextInput
        maxLength={20}
        style={styles.textInput}
        value={register.cpass}
        secureTextEntry={true}
        placeholder="Confirm Password"
        onChangeText={(text) => {
          setRegister({ ...register, cpass: text });
        }}
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
    // paddingTop: 5,
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
    borderColor: "#db7093",
    borderWidth: 3,
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

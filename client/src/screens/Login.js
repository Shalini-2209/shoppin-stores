import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SwitchTabs from "../navigations/SwitchTabs";
import Header from "../components/Header";
export default function Login() {
  const initialState = {
    mobile: "",
    password: "",
  };
  const [log, setLog] = useState(initialState);
  const [getIn, setGetIn] = useState(false);
  const [form, setForm] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("credentials").then((res) => {
      if (res) {
        setGetIn(true);
        setForm(false);
      }
    });
  }, []);

  const handleSave = () => {
    // e.preventDefault();

    const payload = {
      mobile: log.mobile,
      password: log.password,
    };

    axios({
      method: "post",
      url: "http://localhost:3001/register/users",
      data: payload,
    })
      .then((msg) => {
        console.log(msg.data.length);
        if (msg.data.length == 1) {
          setGetIn(true);
          AsyncStorage.setItem("credentials", JSON.stringify(msg.data));
          console.log(msg.data);
          setForm(false);
        } else {
          alert("Invalid user!");
        }
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  return (
    <View style={styles.container}>
      {form && (
        <View>
          {/* <Header /> */}
          <TextInput
            style={styles.textInput}
            maxLength={20}
            value={log.mobile}
            placeholder="Mobile"
            onChangeText={(text) => setLog({ ...log, mobile: text })}
          />

          <TextInput
            maxLength={20}
            style={styles.textInput}
            value={log.password}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setLog({ ...log, password: text })}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              handleSave();
            }}
          >
            <Text style={styles.saveButtonText}>Log me in!</Text>
          </TouchableOpacity>
        </View>
      )}

      {getIn && <SwitchTabs />}
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

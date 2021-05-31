import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LoginContext } from "../components/LoginContext";
import config from "../../config";

export default function Login(props) {
  const initialState = {
    mobile: "",
    password: "",
  };
  const [log, setLog] = useState(initialState);
  const [form, setForm] = useState(true);
  const [load, setLoad] = useState(false);
  const [login, setLogin] = React.useContext(LoginContext);

  useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem("credentials").then((res) => {
      if (res) {
        setForm(false);
      }
    });
  }, []);

  const handleSave = () => {
    const payload = {
      mobile: log.mobile,
      password: log.password,
    };
    setForm(false);
    setLoad(true);

    axios({
      method: "post",
      url: `${config.URI}/register/users`,
      data: payload,
    })
      .then((msg) => {
        if (msg.data.length == 1) {
          AsyncStorage.setItem("credentials", JSON.stringify(msg.data));

          setLogin(true);
          props.navigation.navigate("SwitchTabs");
        } else {
          alert("Invalid user!");
        }
      })
      .catch((error) => {
        console.log("Internal server error" + error);
      });
  };

  return (
    <View style={styles.container}>
      {form && (
        <View>
          <TextInput
            style={styles.textInput}
            maxLength={20}
            value={log.mobile}
            keyboardType="numeric"
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

      {load && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#db7093" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#db7093",
    fontSize: 20,
    textAlign: "center",
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductImg from "../components/ChoosePic";

// export const CreateProContext = React.createContext();

export default function NewProfile() {
  const initialState = {
    name: "",
    slogan: "",
    category: "",
    logo: "",
    appLink: "",
  };
  const [details, setDetails] = useState(initialState);

  const handleSave = (e) => {
    e.preventDefault();

    const payload = {
      companyName: details.name,
      slogan: details.slogan,
      category: details.category,
      logo: details.logo,
      appLink: details.appLink,
    };

    axios({
      url: "http://localhost:3001/profile/create",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("New company added!");
        setDetails(initialState);
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  const onImgAdded = (url) => {
    setDetails({ ...details, logo: url });
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name="account-group" size={35} color="black" />
      </View>

      <TextInput
        style={styles.textInput}
        maxLength={20}
        defaultValue={details.name}
        placeholder="Company Name"
        onChangeText={(text) => setDetails({ ...details, name: text })}
      />

      <TextInput
        maxLength={20}
        style={styles.textInput}
        defaultValue={details.slogan}
        placeholder="Tagline"
        onChangeText={(text) => setDetails({ ...details, slogan: text })}
      />

      <TextInput
        maxLength={20}
        style={styles.textInput}
        placeholder="Choose Category"
        defaultValue={details.category}
        onChangeText={(text) => setDetails({ ...details, category: text })}
      />

      <TextInput
        placeholder="Enter App Link"
        style={styles.textInput}
        defaultValue={details.appLink}
        onChangeText={(text) => setDetails({ ...details, appLink: text })}
      />

      {/* <ProductImg onImgAdded={onImgAdded} /> */}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Create Store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "#F5FCFF",
  },

  textInput: {
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },

  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    // marginTop: "10%",
    marginBottom: "10%",
  },

  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },

  saveButton: {
    borderWidth: 1,
    borderColor: "#bc8f8f",
    backgroundColor: "#db7093",
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});

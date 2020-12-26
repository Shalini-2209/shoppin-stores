import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextField, InputLabel, MenuItem, Select } from "@material-ui/core";
import ProductImg from "../components/ChoosePic";
import TopBar from "../components/TopBar";
export const ProfileContext = React.createContext();

export default function ProfileScreen() {
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
    <>
      <View>
        <ProfileContext.Provider value={"Create Profile"}>
          <TopBar />
        </ProfileContext.Provider>
      </View>

      <View style={styles.container}>
        <MaterialCommunityIcons name="account-group" size={35} color="black" />
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextField
              id="standard"
              label="Company Name"
              maxLength={20}
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />

            <TextField
              id="standard-basic"
              label="Tag Line"
              maxLength={20}
              value={details.slogan}
              style={styles.nextLabel}
              onChange={(e) =>
                setDetails({ ...details, slogan: e.target.value })
              }
            />
            <View style={styles.inputContainer}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={details.category}
                onChange={(e) =>
                  setDetails({ ...details, category: e.target.value })
                }
              >
                <MenuItem value="Books">Book Store</MenuItem>
                <MenuItem value="Clothing">Clothing and Cosmetics</MenuItem>
                <MenuItem value="Shoes">Shoe Mart</MenuItem>
              </Select>
            </View>
          </View>

          <View>
            <ProductImg onImgAdded={onImgAdded} />
          </View>

          <TextField
            id="standard-basic"
            label="Application Link"
            fullWidth
            value={details.appLink}
            style={styles.nextLabel}
            onChange={(e) =>
              setDetails({ ...details, appLink: e.target.value })
            }
          />

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Create Company</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    paddingTop: 15,
    paddingBottom: 15,
  },

  saveButton: {
    borderWidth: 1,
    borderColor: "#bc8f8f",
    backgroundColor: "#db7093",
    padding: 15,
    alignItems: "center",
    margin: 5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});

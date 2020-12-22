import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function Post() {
  const [product, setProduct] = useState({ name: "", price: "" });

  const handleView = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:3001/posts/",
    })
      .then(() => {
        console.log("Check out data");
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      name: product.name,
      price: product.price,
    };

    axios({
      url: "http://localhost:3001/posts/upload",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        // this.resetUserInputs();
        // this.getBlogPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Create Post</Text>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Your product"
              maxLength={20}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Price"
              maxLength={20}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleView}>
          <Text style={styles.saveButtonText}>View </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
    padding: 15,
    margin: 5,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
});

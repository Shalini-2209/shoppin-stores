import React, { useEffect, useState, useContext } from "react";
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
import Content from "./Content";
import { TextField } from "@material-ui/core";
import ProductImg from "../components/ChoosePic";
import TopBar from "../components/TopBar";
export const TitleContext = React.createContext();
export default function Post() {
  const initialState = { name: "", price: "", image: "" };
  const [product, setProduct] = useState(initialState);
  const [flag, setFlag] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    const payload = {
      name: product.name,
      price: product.price,
      image: product.image,
    };

    axios({
      url: "http://localhost:3001/posts/upload",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Added a new product.");
        setProduct(initialState);
      })
      .catch((error) => {
        console.log("Internal server error", error);
      });
  };

  const onImgAdded = (url) => {
    setProduct({ ...product, image: url });
  };

  return (
    <>
      <View>
        <TitleContext.Provider value={"New Post"}>
          <TopBar />
        </TitleContext.Provider>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <TextField
              id="standard"
              label="Product"
              maxLength={20}
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Price"
              maxLength={20}
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </View>

          <View>
            <ProductImg onImgAdded={onImgAdded} />
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setFlag(!flag)}
            >
              <Text style={styles.saveButtonText}>View </Text>
            </TouchableOpacity>
          </View>

          {flag && <Content />}
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
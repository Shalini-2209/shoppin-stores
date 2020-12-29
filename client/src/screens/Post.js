import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Content from "./Content";
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
        console.log("Internal server error.", error);
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
          <View>
            <TextInput
              maxLength={20}
              placeholder="Enter Product Name"
              value={product.name}
              style={styles.inputContainer}
              onChangeText={(text) => setProduct({ ...product, name: text })}
            />
            <TextInput
              maxLength={20}
              placeholder="Enter price"
              value={product.price}
              style={styles.inputContainer}
              onChangeText={(text) => setProduct({ ...product, price: text })}
            />
          </View>

          <View>
            <ProductImg onImgAdded={onImgAdded} />
          </View>

          <View>
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
  },
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  inputContainer: {
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
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

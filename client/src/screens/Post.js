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
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";
import ProductImg from "../components/ChoosePic";
import TopBar from "../components/TopBar";

export default function Post({ navigation }) {
  const initialState = { name: "", price: "", image: "" };

  const [product, setProduct] = useState(initialState);
  const [phone, setPhone] = useState("");
  const [store, setStore] = useState("");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("credentials").then((res) => {
      res = JSON.parse(res);
      setPhone(res[0].mobile);
      getStore(res[0].mobile);
    });
  }, []);

  const getStore = (num) => {
    axios({
      url: `${config.URI}/profile/${num}`,
    })
      .then((res) => {
        console.log("Store retrieved!");
        const data = res.data;
        setStore(data[0].companyName);
      })
      .catch(() => {
        console.log("Error in retriving store..");
      });
  };

  const handleSave = () => {
    const payload = {
      name: product.name,
      price: product.price,
      image: product.image,
      mobile: phone,
      store: store,
    };
    axios({
      url: `${config.URI}/posts/upload`,
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Added a new product.");
        setProduct(initialState);
        setPosted(!posted);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.log("Internal server error.", error);
      });
  };

  const onImgAdded = (res) => {
    setProduct({ ...product, image: res });
  };

  return (
    <>
      <View>
        <TopBar name="New Post" />
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
            <ProductImg onImgAdded={onImgAdded} posted={posted} />
          </View>
          <View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
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
    borderWidth: 2,
    borderColor: "black",
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

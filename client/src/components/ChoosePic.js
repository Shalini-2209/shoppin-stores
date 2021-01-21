import React, { useState, useEffect, useContext } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "../database/Firebase";
import "firebase/storage";
import Constants from "expo-constants";

function ProductImg(props) {
  const dummyImg =
    "https://www.lankabangla.com/wp-content/uploads/2019/08/no_image_png_935227.png";
  const [image, setImage] = useState(dummyImg);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    setImage(dummyImg);
  }, [props.posted]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let fileName = new Date().getTime();
      uploadImg(result.uri, fileName).then(() => {
        firebase
          .storage()
          .ref()
          .child("images/" + fileName)
          .getDownloadURL()
          .then((url) => {
            setImage(url);
            console.log("url:" + url);
            props.onImgAdded(url);
          });
        console.log("Success");
      }).catch = (err) => {
        console.log("Error in uploading to firebase", err);
      };
    }
  };
  const uploadImg = async (uri, fileName) => {
    let response = await fetch(uri);
    let blob = await response.blob();
    let ref = firebase
      .storage()
      .ref()
      .child("images/" + fileName);
    return ref.put(blob);
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: image }}
            style={{ width: 200, height: 200 }}
            onClick={() => setImage(dummyImg)}
          />
          <MaterialCommunityIcons
            onPress={pickImage}
            name="plus-box"
            size={24}
            color="black"
            style={{ position: "absolute", bottom: 0 }}
          />
        </View>
      </View>
    </>
  );
}

export default ProductImg;

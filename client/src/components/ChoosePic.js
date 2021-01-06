import React, { useState, useEffect, useRef } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function ProductImg(props) {
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      if (result.uri != dummyImg) {
        props.onImgAdded(result.uri);
      } else props.onImgAdded(dummyImg);
    }
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

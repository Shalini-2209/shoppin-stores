import React, { useState, useEffect, useRef } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function ProductImg(props) {
  const [image, setImage] = useState(null);
  const imgInputRef = useRef(null);

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
      const imgChosen = imgInputRef.current.attributes.value.nodeValue;
      // console.log("Ref:", imgInputRef);
      // console.log("Id: ", imgInputRef.current.id);
      // console.log("Value: ", imgInputRef.current.attributes.value.nodeValue);
      if (imgChosen) {
        props.onImgAdded(imgChosen);
      }
    }
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {image && (
          <View>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
            <span ref={imgInputRef} value={image} id="idforSpan"></span>
          </View>
        )}

        <Button
          title="Pick an image from camera roll"
          color="#db7093"
          onPress={pickImage}
        />
        {/* {image && <Button title={image} />} */}
      </View>
    </>
  );
}

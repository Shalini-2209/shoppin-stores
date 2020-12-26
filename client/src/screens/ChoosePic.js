import React, { useState, useEffect, useRef } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { IconButton, Grid } from "@material-ui/core";
import Constants from "expo-constants";

export default function ProductImg(props) {
  const dummyImg =
    "https://www.lankabangla.com/wp-content/uploads/2019/08/no_image_png_935227.png";
  const [image, setImage] = useState(dummyImg);
  const [duplicate, setDuplicate] = useState(true);
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
            <span ref={imgInputRef} value={image} id="idforSpan"></span>
          </View>
        )}

        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <IconButton
              aria-label="upload picture"
              component="span"
              onClick={pickImage}
            >
              <AddBoxIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                onClick={() => setImage(dummyImg)}
              />
              <span ref={imgInputRef} value={image} id="idforSpan"></span>
            </View>
          </Grid>

          {image && (
            <span ref={imgInputRef} value={image} id="idforSpan"></span>
          )}
        </Grid>
      </View>
    </>
  );
}

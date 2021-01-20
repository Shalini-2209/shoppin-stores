import React, { useState, useCallback } from "react";
import axios from "axios";
import { Card } from "react-native-paper";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import TopBar from "../components/TopBar";
import config from "../../config";
import Store from "./Store";

export const FeedContext = React.createContext();

export default function Content() {
  const [content, setContent] = useState([]);
  const [temp, setTemp] = useState("");
  const [open, setOpen] = useState(false);
  let load = false;

  if (content.length == 0 && !open) {
    load = true;
  }

  const getData = () => {
    axios({
      url: `${config.URI}/posts/`,
    })
      .then((res) => {
        console.log("Check out data");
        const data = res.data;
        setContent(data);
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  };

  const LeftContent = () => (
    <AntDesign name="rightcircle" size={26} color="black" />
  );

  const openProfile = (store) => {
    setOpen(true);
    setTemp(store);
    setContent([]);
  };

  const closeProfile = () => {
    setOpen(false);
    getData();
  };

  useFocusEffect(
    useCallback(() => {
      closeProfile();
      getData();

      return () => console.log("Stopped Fetching");
    }, [])
  );

  return (
    <>
      <View>
        <TopBar name="Feed" />
      </View>

      {load && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#db7093" />
        </View>
      )}

      {open && (
        <>
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              marginRight: 5,
              paddingTop: 5,
            }}
            onPress={closeProfile}
          >
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Store companyName={temp} />
        </>
      )}
      <ScrollView>
        {content.map((item) => (
          <Card key={item._id} onPress={() => openProfile(item.store)}>
            <Card.Title
              title={item.store}
              subtitle={item.name}
              left={LeftContent}
            />
            <Card.Cover source={{ uri: item.image }} />
          </Card>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

import React, { useState, useEffect, useCallback } from "react";
// import { ActivityIndicator,  Alert } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import config from "../../config";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  // Button,
} from "react-native";
import TopBar from "../components/TopBar";
import NewProfile from "./CreateStore";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);

  const copyProductId = (id) => {
    if (Clipboard.setString(id)) {
      alert("Product Id : " + id + " copied!");
    }
  };

  const getData = (num) => {
    axios({
      url: `${config.URI}/profile/${num}`,
    })
      .then((res) => {
        console.log("Profile Page has been loaded!");
        const data = res.data;
        setProfile(data);
      })
      .catch(() => {
        console.error("Error in retriving data..");
      });
  };

  const getPosts = (num) => {
    axios({
      url: `${config.URI}/posts/users${num}`,
    })
      .then((res) => {
        const data = res.data;
        setPosts(data);
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  };

  const deletePost = (id) => {
    axios({
      url: `${config.URI}/posts/delete${id}`,
    })
      .then((res) => {
        alert("Post deleted successfully");
        navigation.navigate("Feed");
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("credentials").then((res) => {
        res = JSON.parse(res);
        getData(res[0].mobile);
        getPosts(res[0].mobile);
      });

      return () => console.log("Stopped Fetching");
    }, [])
  );

  return (
    <>
      <TopBar name="Profile" />

      {profile.length ? (
        <ScrollView style={{ flexGrow: 1, backgroundColor: "white" }}>
          <View style={styles.containerOne}>
            {profile.map((item) => (
              <View key={item._id}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 25,
                  }}
                >
                  <Image source={{ uri: item.logo }} style={styles.proPic} />
                </View>

                {/* companyName */}
                <View style={styles.info}>
                  <MaterialCommunityIcons
                    name="store-outline"
                    size={24}
                    color="#db7093"
                  />

                  <Text style={{ paddingTop: 5 }}>
                    {" "}
                    {"  "}
                    {item.companyName}
                  </Text>
                </View>
                {/* slogan */}
                <View style={styles.info}>
                  <MaterialCommunityIcons
                    name="arrow-right-bold-box"
                    size={24}
                    color="#db7093"
                  />

                  <Text style={{ paddingTop: 5 }}>
                    {" "}
                    {"  "}
                    {item.slogan}
                  </Text>
                </View>

                {/* mobile */}
                <View style={styles.info}>
                  <MaterialCommunityIcons
                    name="whatsapp"
                    size={24}
                    color="#db7093"
                  />

                  <Text style={{ paddingTop: 5 }}>
                    {" "}
                    {"  "}
                    {item.mobile}
                  </Text>
                </View>

                {/* appLink */}
                <View style={styles.info}>
                  <MaterialCommunityIcons
                    name="shield-link-variant"
                    size={24}
                    color="#db7093"
                  />
                  <Text style={{ paddingTop: 5 }}>
                    {" "}
                    {"  "}
                    {item.appLink}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.containerTwo}>
            {posts.map((item) => (
              <View style={{ width: "50%" }} key={item}>
                <Card>
                  <Card.Cover source={{ uri: item.image }} />

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      margin: 2,
                    }}
                  >
                    <Paragraph style={{ width: "50%" }}>
                      {" "}
                      Rs. {item.price}
                    </Paragraph>

                    <MaterialCommunityIcons
                      name="content-copy"
                      size={24}
                      color="black"
                      onPress={() => copyProductId(`${item._id}`)}
                    />
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="black"
                      onPress={() => deletePost(item._id)}
                    />
                  </View>
                </Card>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <NewProfile />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  containerTwo: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },

  proPic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#db7093",
  },

  icon: {
    paddingLeft: 80,
    paddingTop: 5,
  },

  deleteIcon: {
    paddingTop: 5,
    paddingLeft: 5,
  },

  info: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  img: {
    // resizeMode: "contain",
    width: "50%",
    height: "70%",
    padding: 5,
  },
});

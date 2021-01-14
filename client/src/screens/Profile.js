import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Paragraph } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import config from "../../config";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import TopBar from "../components/TopBar";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [prdt, setPrdt] = useState("");
  let load = false;

  if (posts.length == 0 && profile.length == 0) {
    load = true;
  }

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
        console.log("Error in retriving data..");
      });
  };

  const getPosts = (num) => {
    axios({
      url: `${config.URI}/posts/users${num}`,
    })
      .then((res) => {
        console.log("Posts has been loaded!");
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
      <View>
        <TopBar name="Profile" />
      </View>
      {load && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#db7093" />
        </View>
      )}
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.containerOne}>
          {profile.map((item) => (
            <View key={item._id}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
            <Card key={item._id} onPress={() => setLarge(true)}>
              <Card.Cover source={{ uri: item.image }} style={styles.img} />
              <Card.Content style={{ flexDirection: "row" }}>
                <Paragraph style={{ paddingTop: 5 }}>
                  Rs. {item.price}
                </Paragraph>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() =>
                    alert("Product Id to be noted: " + `${item._id}`)
                  }
                >
                  <MaterialCommunityIcons
                    name="eye-plus"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => deletePost(item._id)}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerOne: {
    flex: 1,
    paddingTop: 45,
  },
  containerTwo: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 45,
    paddingLeft: 3,
    flexWrap: "wrap",
  },

  proPic: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderRadius: 50,
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
    backgroundColor: "white",
  },

  img: {
    width: 200,
    height: 150,
  },
});

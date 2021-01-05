import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Paragraph } from "react-native-paper";
import { Clipboard } from "react-native";
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

export default function ProfileScreen() {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("credentials").then((res) => {
      res = JSON.parse(res);
      setUser(res[0].mobile);
      getData(res[0].mobile);
      getPosts(res[0].mobile);
    });
  }, []);

  const getData = (num) => {
    axios({
      url: `${config.IP}/profile/${num}`,
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
      url: `${config.IP}/posts/users${num}`,
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

  return (
    <>
      <View>
        <TopBar name="Profile" />
      </View>

      <ScrollView>
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
            <Card key={item._id}>
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
    backgroundColor: "#F5FCFF",
  },
  containerTwo: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 45,
    paddingLeft: 5,
    flexWrap: "wrap",
    backgroundColor: "#F5FCFF",
  },

  proPic: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderRadius: 50,
  },

  icon: {
    paddingLeft: 105,
    paddingTop: 5,
  },

  info: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 5,
  },

  img: {
    width: 200,
    borderWidth: 2,
    height: 150,
  },
});

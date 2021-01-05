import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, Card, Paragraph } from "react-native-paper";
import config from "../../config";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
      console.log("Response", res[0].mobile);
      getData(res[0].mobile);
      getPosts(res[0].mobile);
    });

    // setTimeout(getData());
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
            <View key={item.companyName}>
              <Image
                source={{ uri: item.logo }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text>{user.userName}</Text>
              <Text>
                {item.companyName} {item.appLink}
              </Text>
              <Text>{item.slogan} </Text>
            </View>
          ))}
        </View>

        <View style={styles.container}>
          {posts.map((item) => (
            <Card key={item._id}>
              <Card.Cover source={{ uri: item.image }} style={styles.img} />
              <Card.Content>
                <Paragraph style={styles.data}>
                  Rs. {item.price}
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete"
                      size={22}
                      color="black"
                    />
                  </TouchableOpacity>
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 65,
    backgroundColor: "#F5FCFF",
  },

  img: {
    width: 200,
    borderWidth: 2,
  },

  containerOne: {
    flex: 1,
    paddingTop: 65,
    // paddingBottom: 65,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

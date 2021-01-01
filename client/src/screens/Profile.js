import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { View, Image, ScrollView, StyleSheet, Text } from "react-native";
import TopBar from "../components/TopBar";

export default function ProfileScreen() {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("credentials").then((res) => {
      res = JSON.parse(res);
      setUser(res[0].mobile);
      console.log("Response", res[0].mobile);
      getData(res[0].mobile);
    });

    // setTimeout(getData());
  }, []);

  const getData = (num) => {
    axios({
      url: `http://localhost:3001/profile/${num}`,
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

  return (
    <>
      <View>
        <TopBar name="Profile" />
      </View>

      <ScrollView>
        <View style={styles.container}>
          <Text>{user.userName}</Text>
          {profile.map((item) => (
            <View key={item.companyName}>
              <Text>
                {" "}
                {item.companyName} {item.slogan} {item.category} {item.appLink}
              </Text>
              {/* {item.logo && ( */}
              <Image
                source={{ uri: item.logo }}
                style={{ width: 200, height: 200 }}
              />
              {/* )} */}
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

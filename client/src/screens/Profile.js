import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, ScrollView, StyleSheet, Text } from "react-native";
import TopBar from "../components/TopBar";

export default function ProfileScreen() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getData();
    // setTimeout(getData());
  }, []);

  const getData = () => {
    axios({
      url: "http://localhost:3001/profile/",
    })
      .then((res) => {
        console.log("Profile Page has been loaded!");
        const data = res.data;
        console.log(data);
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
          {profile.map((item) => (
            <View key={item.companyName}>
              <Text>
                {item.companyName} {item.slogan} {item.category} {item.appLink}
              </Text>
              {item.logo && (
                <Image
                  source={{ uri: item.logo }}
                  style={{ width: 200, height: 200 }}
                />
              )}
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

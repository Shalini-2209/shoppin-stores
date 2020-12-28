import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";
export const ProfileContext = React.createContext();

export default function ProfileScreen() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getData();
    setTimeout(getData());
  }, []);

  const getData = () => {
    axios({
      url: "http://localhost:3001/profile/",
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
        <ProfileContext.Provider value={"Feed"}>
          <TopBar />
        </ProfileContext.Provider>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <ul>
            {profile.map((item) => (
              <li key={item.name}>
                {item.companyName} {item.slogan} {item.category} {item.appLink}
                {item.logo && (
                  <Image
                    source={{ uri: item.logo }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </li>
            ))}
          </ul>
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

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, Paragraph } from "react-native-paper";
import config from "../../config";

export default function Store(props) {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getInfo();
    getPosts();
  }, []);

  const initializeWhatsApp = (id) => {
    let mobileNumber = profile[0].mobile;
    let url =
      "whatsapp://send?text=" +
      "I am interested in buying product id: " +
      id +
      "&phone=91" +
      mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };

  const getInfo = () => {
    axios({
      url: `${config.URI}/profile/stores${props.companyName}`,
    })
      .then((res) => {
        console.log("Check out data");
        const data = res.data;
        if (data.length > 0) {
          setProfile(data);
        }
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  };

  const getPosts = () => {
    axios({
      url: `${config.URI}/posts/store${props.companyName}`,
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
                  onPress={() => initializeWhatsApp(`${item._id}`)}
                >
                  <MaterialCommunityIcons
                    name="cart-arrow-down"
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
    backgroundColor: "white",
  },
  containerTwo: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 45,
    paddingLeft: 5,
    flexWrap: "wrap",
    backgroundColor: "white",
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

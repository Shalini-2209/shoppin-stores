import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { View, Image, ScrollView, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import TopBar from "../components/TopBar";
import config from "../../config";

export const FeedContext = React.createContext();

export default function Content() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      url: `${config.IP}/posts/`,
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

  return (
    <>
      <View>
        <TopBar name="Feed" />
      </View>
      <ScrollView>
        {content.map((item) => (
          <Card key={item._id}>
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
    backgroundColor: "#F5FCFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

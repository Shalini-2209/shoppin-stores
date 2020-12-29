import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, ScrollView, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";

export const FeedContext = React.createContext();

export default function Content() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getData();
    setTimeout(getData(), 5000);
  }, []);

  const getData = () => {
    axios({
      url: "http://localhost:3001/posts/",
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

  return (
    <>
      <View>
        <FeedContext.Provider value={"Feed"}>
          <TopBar />
        </FeedContext.Provider>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {content.map((item) => (
            <View key={item.name}>
              <Text>
                {" "}
                {item.name} {item.price} {item.date}
              </Text>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
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

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import axios from "axios";
import config from "../../config";
import TopBar from "../components/TopBar";
import Content from "./Content";

const Item = ({ title, setShowFeed, setLocality }) => (
  <View style={styles.item}>
    <Text
      style={styles.title}
      onPress={() => {
        setShowFeed(true);
        setLocality(title);
      }}
    >
      {title}
    </Text>
  </View>
);

const List = () => {
  // list of available locality
  const [list, setList] = useState([]);

  const [showFeed, setShowFeed] = useState(false);

  const handleShowFeed = () => {
    console.log("Back");
    setShowFeed(false);
  };

  // filter by locality chosen
  const [locality, setLocality] = useState("");

  useEffect(() => {
    const fetchLocalities = () => {
      axios({
        url: `${config.URI}/profile/stores`,
      })
        .then((res) => {
          const data = res.data;
          setList(data);
        })
        .catch((e) => {
          throw new error(e);
        });
    };

    fetchLocalities();
  }, []);

  const renderItem = ({ item }) => (
    <Item
      title={item.locality}
      setShowFeed={setShowFeed}
      setLocality={setLocality}
    />
  );
  return (
    <>
      {!showFeed ? (
        <>
          <TopBar name="Available localities" />
          <SafeAreaView style={styles.container}>
            {list && (
              <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />
            )}
          </SafeAreaView>
        </>
      ) : (
        <Content handleShowFeed={handleShowFeed} locality={locality} />
      )}
    </>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 5,
  },
  item: {
    backgroundColor: "#db7093",
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
});

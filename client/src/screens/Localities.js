import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import TopBar from "../components/TopBar";
import Content from "./Content";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

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
  const [showFeed, setShowFeed] = useState(false);
  const [locality, setLocality] = useState("");
  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      setShowFeed={setShowFeed}
      setLocality={setLocality}
    />
  );
  return (
    <>
      {!showFeed ? (
        <SafeAreaView style={styles.container}>
          <TopBar name="Available localities" />
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      ) : (
        <Content locality={locality} />
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

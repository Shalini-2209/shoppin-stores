import * as React from "react";
import { Searchbar } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <View>
        <TopBar name="Feed" />
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.explore}
      />
    </>
  );
}

const styles = StyleSheet.create({
  explore: {
    marginTop: 5,
  },
});

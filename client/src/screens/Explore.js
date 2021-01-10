import * as React from "react";
import { Searchbar } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import TopBar from "../components/TopBar";
import config from "../../config";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import axios from "axios";

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [storesList, setStoresList] = React.useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const fetchStores = () => {
    axios({
      url: `${config.URI}/profile/stores${searchQuery}`,
    })
      .then((res) => {
        console.log("Check out data");
        const data = res.data;
        if (data.length > 0) {
          setStoresList(data);
        }
        setSearchQuery("");
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  };

  const LeftContent = () => (
    <AntDesign name="profile" size={24} color="black" />
  );

  const openProfile = () => {
    navigation.navigate("Store");
  };

  return (
    <>
      <View>
        <TopBar name="Feed" />
      </View>
      <Searchbar
        placeholder="Search"
        onIconPress={fetchStores}
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.explore}
      />

      {storesList && (
        <ScrollView>
          {storesList.map((item) => (
            <Card key={item._id} onPress={openProfile}>
              <Card.Title
                title={item.companyName}
                subtitle={item.slogan}
                left={LeftContent}
              />
            </Card>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  explore: {
    marginTop: 5,
  },
});

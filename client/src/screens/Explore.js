import * as React from "react";
import { Searchbar } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import TopBar from "../components/TopBar";
import config from "../../config";
import { Card } from "react-native-paper";
import axios from "axios";

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [storesList, setStoresList] = React.useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const fetchStores = () => {
    const val = searchQuery;
    axios({
      url: `${config.URI}/profile/stores${searchQuery}`,
    })
      .then((res) => {
        console.log("Check out data");
        const data = res.data;
        if (data.length > 0) {
          setStoresList(data);
        }
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
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
            <Card key={item._id} style={styles.card}>
              <Card.Title
                title={item.companyName}
                subtitle={item.slogan}
                // left={LeftContent}
              />
              <Card.Cover source={{ uri: item.logo }} style={styles.img} />
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
  img: {
    width: 150,
    height: 100,
  },
  card: {
    width: 200,
    marginTop: 20,
    marginLeft: 5,
  },
});

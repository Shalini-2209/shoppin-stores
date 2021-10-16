import * as React from "react";
import { Searchbar } from "react-native-paper";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import TopBar from "../components/TopBar";
import Store from "./Store";
import config from "../../config";
import { AntDesign } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import axios from "axios";

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [storesList, setStoresList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [temp, setTemp] = React.useState("");

  const onChangeSearch = (query) => {
    setOpen(false);
    setSearchQuery(query);
    setStoresList([]);
  };

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
        setTemp(searchQuery);
        setSearchQuery("");
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  };

  const LeftContent = () => (
    <AntDesign name="profile" size={24} color="black" />
  );
  const RightContent = () => (
    <TouchableOpacity
      onPress={() => setStoresList([])}
      style={{ paddingRight: 20 }}
    >
      <AntDesign name="close" size={24} color="grey" />
    </TouchableOpacity>
  );

  const openProfile = () => {
    setOpen(true);
    setStoresList([]);
  };

  return (
    <>
      <View>
        <TopBar name="Explore" />
      </View>
      <Searchbar
        placeholder="Search"
        onIconPress={fetchStores}
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.explore}
      />

      {open && <Store companyName={temp} />}

      {storesList && (
        <ScrollView>
          {storesList.map((item) => (
            <Card key={item._id} onPress={openProfile}>
              <Card.Title
                title={item.companyName}
                subtitle={item.slogan}
                left={LeftContent}
                right={RightContent}
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

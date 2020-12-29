import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.icon}>
      <AntDesign name="instagram" size={30} color="black" />
      <Text style={styles.header}>
        {" "}
        Insta<Text style={{ color: "#db7093" }}> Stores </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    // marginTop: "10%",
    marginBottom: "10%",
  },
});

export default Header;
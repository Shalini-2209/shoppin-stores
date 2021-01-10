import React from "react";
import { View, Text } from "react-native";
import MyTabs from "../navigations/SwitchTabs";
import TopBar from "../components/TopBar";

export default function Store() {
  return (
    <>
      <View>
        <View>
          <TopBar name="Store" />
        </View>
        <Text>OPen store</Text>
      </View>
      <MyTabs />
    </>
  );
}

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SwitchTabs from "./src/navigations/SwitchTabs";
import ProductImg from "./src/screens/ChoosePic";

export default function App() {
  return <SwitchTabs />;
}

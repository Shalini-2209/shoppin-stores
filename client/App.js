import { StatusBar } from "expo-status-bar";
import React from "react";
// import ProductImg from "./src/components/ChoosePic";
// import TopBar from "./src/components/TopBar";
import SwitchTabs from "./src/navigations/SwitchTabs";
import NewProfile from "./src/screens/NewProfile";
import Post from "./src/screens/Post";
import ProfileScreen from "./src/screens/Profile";

export default function App() {
  return <SwitchTabs />;
  // return <NewProfile />;
}

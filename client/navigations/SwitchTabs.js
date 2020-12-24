import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Post from "../screens/Post";

const Tab = createBottomTabNavigator();

export default function SwitchTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Post} />
      <Tab.Screen name="Settings" component={Post} />
    </Tab.Navigator>
  );
}

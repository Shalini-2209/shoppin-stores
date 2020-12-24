import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Content from "../screens/Content";
import Post from "../screens/Post";
import { BottomNavigation } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#db7093"
      barStyle={{ backgroundColor: "black" }}
      labelStyle={{ fontSize: 12 }}
    >
      <Tab.Screen
        name="Feed"
        component={Content}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Content}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Post}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Post}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function SwitchTabs() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

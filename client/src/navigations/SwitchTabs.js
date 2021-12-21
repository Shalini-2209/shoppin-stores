import * as React from "react";
import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Content from "../screens/Content";
import Post from "../screens/Post";
import ProfileScreen from "../screens/Profile";
import ExploreScreen from "../screens/Explore";
import List from "../screens/Localities";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#db7093"
      barStyle={{ backgroundColor: "black" }}
      labelStyle={{ fontSize: 12 }}
    >
      {/* <Tab.Screen
        name="Feed"
        component={Content}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={ExploreScreen}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-search"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add New Product"
        component={Post}
        options={{
          tabBarLabel: "New Post",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
  return <MyTabs />;
}

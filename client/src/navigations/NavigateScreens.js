import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SwitchTabs from "../navigations/SwitchTabs";
import Main from "../screens/Main";

export default function NavigateScreens() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="SwitchTabs" component={SwitchTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

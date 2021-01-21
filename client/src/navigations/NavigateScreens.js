import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SwitchTabs from "../navigations/SwitchTabs";
import Main from "../screens/Main";
import { LoginContext } from "../components/LoginContext";
import ProfileScreen from "../screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Content from "../screens/Content";

export default function NavigateScreens() {
  const Stack = createStackNavigator();
  const [login, setLogin] = React.useContext(LoginContext);

  React.useEffect(() => {
    AsyncStorage.getItem("credentials").then((res) => {
      if (res) {
        setLogin(true);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {login ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SwitchTabs" component={SwitchTabs} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Feed" component={Content} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

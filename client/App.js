import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { LoginContext } from "./src/components/LoginContext";
import NavigateScreens from "./src/navigations/NavigateScreens";

export default function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      <LoginContext.Provider value={[login, setLogin]}>
        <NavigateScreens />
      </LoginContext.Provider>
    </>
  );
}

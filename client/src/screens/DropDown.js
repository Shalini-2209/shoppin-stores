import React, { Component, useState } from "react";
import { Container, Form, Picker } from "native-base";
export default function DropDown() {
  const [name, setName] = useState("New name");
  return (
    <View>
      {/* <Form> */}
      <Picker
        mode="dropdown"
        //   icon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        // placeholder="Select your SIM"
        // placeholderStyle={{ color: "#bfc6ea" }}
        // placeholderIconColor="#007aff"
        selectedValue={name}
        onValueChange={(value) => {
          setName(value);
          alert("value");
        }}
      >
        <Picker.Item label="Wallet" value="key0" />
        <Picker.Item label="ATM Card" value="key1" />
      </Picker>
      {/* </Form> */}
    </View>
  );
}

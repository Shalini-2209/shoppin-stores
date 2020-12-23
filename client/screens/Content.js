import React, { useState, useEffect } from "react";
import axios from "axios";
import { View } from "react-native";
import PostList from "./PostList";

export default function Content() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:3001/posts/",
    })
      .then((res) => {
        console.log("Check out data");
        const data = res.data;
        setContent(data);
      })
      .catch(() => {
        console.log("Error in retriving data..");
      });
  }, []);

  return (
    <>
      <View>
        <ul>
          {content.map((item) => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      </View>
    </>
  );
}

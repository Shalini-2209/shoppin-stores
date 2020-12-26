import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Image, ScrollView } from "react-native";

export default function Content() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    getData();
    setTimeout(getData(), 5000);
  }, []);

  const getData = () => {
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
  };

  return (
    <>
      <ScrollView>
        <View>
          <ul>
            {content.map((item) => (
              <li key={item.name}>
                {item.name} {item.price} {item.date}
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </View>
      </ScrollView>
    </>
  );
}

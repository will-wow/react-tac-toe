import React from "react";
import { View } from "react-vr";

import Title from "./Title";
import Button from "./Button";

const MainMenu = ({ onStart }) => (
  <View
    style={{
      flex: 1,
      width: 5,
      flexDirection: "column",
      alignItems: "stretch",
      layoutOrigin: [0.5, 0.5],
      transform: [{ translate: [0, 0, -5] }]
    }}
  >
    <Title />
    <Button onClick={onStart} text="Play!" />
  </View>
);

export default MainMenu;

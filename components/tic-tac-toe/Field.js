import React from "react";
import { View } from "react-vr";

import Line from "./Line";

const line = (long, short, color) => (location, isHorizontal) => (
  <Line
    location={location}
    long={long}
    short={short}
    isHorizontal={isHorizontal}
    color={color}
  />
);

const Field = () => {
  const ticTacToeLine = line(5.5, 0.25, "#eeeeee");

  return (
    <View style={{ height: 5, width: 5 }}>
      {ticTacToeLine([-1, 0, -5], true)}
      {ticTacToeLine([1, 0, -5], true)}
      {ticTacToeLine([0, -1, -5], false)}
      {ticTacToeLine([0, 1, -5], false)}
    </View>
  );
};

export default Field;

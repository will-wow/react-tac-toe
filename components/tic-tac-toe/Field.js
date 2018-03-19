import React from "react";
import { View, VrButton } from "react-vr";

import { mapIndexed, indexToCoordinates } from "./engine";

import Line from "./Line";
import Mark from "./Mark";

const Field = ({ game, onMove }) => {
  const ticTacToeLine = line(5.5, 0.25, "#eeeeee");

  return (
    <View style={{ height: 5, width: 5 }}>
      {ticTacToeLine([-1, 0, -5], true)}
      {ticTacToeLine([1, 0, -5], true)}
      {ticTacToeLine([0, -1, -5], false)}
      {ticTacToeLine([0, 1, -5], false)}

      {tiles(onMove)(game)}
    </View>
  );
};

export default Field;

const line = (long, short, color) => (location, isHorizontal) => (
  <Line
    location={location}
    long={long}
    short={short}
    isHorizontal={isHorizontal}
    color={color}
  />
);

const tiles = onMove =>
  mapIndexed((tile, index) => {
    let [x, y] = indexToCoordinates(index);

    x = x * 2 - 2;
    y = y * 2 - 2;

    const translate = [x, y, -5];

    switch (tile) {
      case "x": {
        return <Mark key={index} x translate={translate} />;
      }
      case "o": {
        return <Mark key={index} o translate={translate} />;
      }
      default: {
        return (
          <VrButton
            key={index}
            onClick={() => onMove(index)}
            style={{
              position: "absolute",
              height: 2,
              width: 2,
              layoutOrigin: [0.5, 0.5],
              transform: [{ translate }]
            }}
          />
        );
      }
    }
  });

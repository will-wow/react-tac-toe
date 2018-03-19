import React from "react";
import { Box } from "react-vr";

const Line = ({ location, rotateZ, long, short, isHorizontal, color }) => {
  const height = isHorizontal ? long : short;
  const width = isHorizontal ? short : long;

  return (
    <Box
      dimWidth={width}
      dimHeight={height}
      dimDepth={short}
      style={{
        color,
        // layoutOrigin: [0.5, 0.5],
        transform: [{ translate: location }, { rotateZ }]
      }}
    />
  );
};

Line.defaultProps = {
  location: [0, 0, 0],
  isHorizontal: true,
  rotateZ: 0
};

export default Line;

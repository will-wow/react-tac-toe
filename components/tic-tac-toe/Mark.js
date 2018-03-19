import React from "react";
import { asset, View, Cylinder, Sound } from "react-vr";

import Line from "./Line";

const MarkX = () => (
  <View>
    <Sound source={{ mp3: asset("chalk_1.mp3") }} />

    <Line rotateZ={45} long={1} short={0.1} color="#eeeeee" />
    <Line rotateZ={-45} long={1} short={0.1} color="#eeeeee" />
  </View>
);

const MarkO = () => (
  <Cylinder
    dimHeight={0.1}
    radiusBottom={0.5}
    radiusTop={0.5}
    style={{
      transform: [{ rotateX: 45 }]
    }}
  >
    <Sound source={{ mp3: asset("chalk_2.mp3") }} />
  </Cylinder>
);

const Mark = ({ x, o, translate }) => (
  <View style={{ transform: [{ translate }] }}>
    {x && <MarkX />}
    {o && <MarkO />}
  </View>
);

export default Mark;

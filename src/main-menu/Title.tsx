import * as React from "react";
import { View, Text } from "react-vr";

const Title = () => (
  <View style={{ margin: 0.1, height: 0.5 }}>
    <Text
      style={{
        fontSize: 0.5,
        fontWeight: "400",
        textAlign: "center",
        textAlignVertical: "center"
      }}
    >
      React Tac Toe
    </Text>
  </View>
);

export default Title;

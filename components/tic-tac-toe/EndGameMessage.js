import React from "react";
import { VrButton, Text, View } from "react-vr";

const EndGameMessage = ({ player, onClick }) => (
  <VrButton onClick={onClick}>
    <View
      style={{
        position: "absolute",
        layoutOrigin: [0.5, 0.5],
        transform: [{ translate: [0, 0, -3] }],
        padding: 0.1,
        backgroundColor: "black",
        opacity: 0.5,
        borderRadius: 0.1
      }}
    >
      <Text
        style={{
          fontSize: 0.5,
          fontWeight: "400",
          textAlign: "center",
          textAlignVertical: "center",
          color: "white"
        }}
      >
        {endGameText(player)}
      </Text>
      <Text
        style={{
          fontSize: 0.25,
          fontWeight: "400",
          textAlign: "center",
          textAlignVertical: "center",
          color: "white"
        }}
      >
        Again?
      </Text>
    </View>
  </VrButton>
);

export default EndGameMessage;

const endGameText = player =>
  player === "cats" ? "Cat's Game!" : winnerText(player);
const winnerText = player => `${player.toUpperCase()} Wins!`;

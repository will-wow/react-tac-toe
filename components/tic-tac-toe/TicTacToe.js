import React, { Component } from "react";
import { asset, View, Sound } from "react-vr";
import * as R from "ramda";

// import {View} from 'react-vr';
import Field from "./Field";

import { nextPlayer, findWinner } from "./engine";
import { nextMove } from "./ai";
import EndGameMessage from "./EndGameMessage";

const defaultState = {
  game: R.repeat("", 9),
  currentPlayer: "x",
  winner: undefined
};

class TicTacToe extends Component {
  constructor() {
    super();

    this.state = defaultState;
  }

  onMove = index => {
    const { winner, game, currentPlayer } = this.state;
    if (winner) {
      return;
    }

    const updatedGame = R.update(index, currentPlayer, game);

    const result = findWinner(updatedGame);

    if (!result.player) {
      this.setState({
        game: updatedGame,
        currentPlayer: nextPlayer(currentPlayer)
      });

      setTimeout(this.aiMove);
    } else {
      this.setState({
        game: updatedGame,
        winner: result
      });
    }
  };

  onReset = () => this.setState(defaultState);

  aiMove = () => {
    const { game, currentPlayer } = this.state;

    if (currentPlayer === "x") {
      return;
    }

    R.pipe(nextMove(currentPlayer), this.onMove)(game);
  };

  render() {
    const { game, winner } = this.state;

    return (
      <View>
        <Sound
          loop
          source={{
            mp3: asset("tetris.mp3")
          }}
        />
        {winner && (
          <EndGameMessage player={winner.player} onClick={this.onReset} />
        )}
        <Field game={game} onMove={this.onMove} winner={winner} />
      </View>
    );
  }
}

export default TicTacToe;

import React from "react";
import { AppRegistry, asset, Pano, View } from "react-vr";

import MainMenu from "./components/main-menu/MainMenu";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";

class ReactTacToe extends React.Component {
  constructor() {
    super();

    this.state = {
      playing: false
    };
  }

  startGame = () => this.setState({ playing: true });
  endGame = () => this.setState({ playing: false });

  render() {
    const { playing } = this.state;
    return (
      <View>
        <Pano source={asset("fort-night.jpg")} />
        {!playing ? (
          <MainMenu onStart={this.startGame}  />
        ) : (
          <TicTacToe onDone={this.endGame} />
        )}
      </View>
    );
  }
}

export default ReactTacToe;

AppRegistry.registerComponent("ReactTacToe", () => ReactTacToe);

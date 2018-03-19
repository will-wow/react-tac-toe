import * as R from "ramda";

import { findWinner, indexesMatching, nextPlayer } from "./engine";

import { maxOf } from "../utils";

const WIN_SCORE = 10;

/* eslint-disable import/prefer-default-export */
export const nextMove = aiPlayer => game => {
  const { moveIndex } = bestScore(aiPlayer, aiPlayer, game, 0);

  return moveIndex;
};

const recurseNextMove = (aiPlayer, currentPlayer, game, depth, moveIndex) => {
  const winner = findWinner(game);

  if (winner.player) {
    return {
      player: currentPlayer,
      score: winnerScore(aiPlayer, winner) * (WIN_SCORE - depth),
      moveIndex
    };
  }
  
  if (depth > 3) {
     return {
      player: currentPlayer,
      score: 0,
      moveIndex
    };
  }

  return bestScore(aiPlayer, currentPlayer, game, depth + 1);
};

const winnerScore = (player, winner) => {
  switch (winner.player) {
    case "cats": {
      return 0;
    }
    case player: {
      return 1;
    }
    default: {
      return -1;
    }
  }
};

const indexesOfEmptyTiles = indexesMatching(R.isEmpty);

const bestScore = (aiPlayer, currentPlayer, game, depth) =>
  R.pipe(
    indexesOfEmptyTiles,
    R.map(scoreMove(aiPlayer, nextPlayer(currentPlayer), game, depth)),
    maxOf(sortScore(aiPlayer))
  )(game);

const scoreMove = (aiPlayer, currentPlayer, game, depth) => moveIndex => {
  return recurseNextMove(
    aiPlayer,
    currentPlayer,
    putPlayerOnTile(game, currentPlayer)(moveIndex),
    depth,
    moveIndex
  );
};

const putPlayerOnTile = (game, currentPlayer) => index =>
  R.update(index, currentPlayer, game);

const sortScore = aiPlayer => ({ score, player }) =>
  aiPlayer === player ? score : -score;

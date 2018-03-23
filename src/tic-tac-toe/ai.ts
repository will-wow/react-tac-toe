import * as R from "ramda";

import { findWinner, indexesMatching, nextPlayer } from "./engine";

import { maxOf } from "../utils";

const WIN_SCORE = 10;

/* eslint-disable import/prefer-default-export */
export const nextMove = aiPlayer => game => {
  const { moveIndex } = bestPossibleMove(aiPlayer, game, 0);

  return moveIndex;
};

const bestPossibleMove = R.memoize((currentPlayer, game, depth) =>
  R.pipe(
    indexesOfEmptyTiles,
    R.map(scoreMove(currentPlayer, game, depth)),
    maxScore
  )(game)
);

const scoreMove = (currentPlayer, game, depth) => moveIndex => {
  const score = calculateMoveScore(
    currentPlayer,
    putPlayerOnTile(currentPlayer, game, moveIndex),
    depth
  );

  return {
    moveIndex,
    score
  };
};

const calculateMoveScore = (currentPlayer, game, depth) => {
  const winner = findWinner(game);

  if (winner.player) {
    return winnerScore(currentPlayer, winner.player) * (WIN_SCORE - depth);
  }

  if (depth > 4) {
    return 0;
  }

  const { score } = bestPossibleMove(
    nextPlayer(currentPlayer),
    game,
    depth + 1
  );

  return -score;
};

const winnerScore = (currentPlayer, winnerPlayer) => {
  switch (winnerPlayer) {
    case "cats": {
      return 0;
    }
    case currentPlayer: {
      return 1;
    }
    default: {
      return -1;
    }
  }
};

const indexesOfEmptyTiles = indexesMatching(R.isEmpty);

const putPlayerOnTile = (currentPlayer, game, moveIndex) =>
  R.update(moveIndex, currentPlayer, game);

const getScore = R.prop("score");

const maxScore = maxOf(getScore);

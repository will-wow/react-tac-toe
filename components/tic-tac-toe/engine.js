import * as R from "ramda";

import { mapIndexed, intersects, maxOf } from "../utils";

export const nextPlayer = player => {
  switch (player) {
    case "x": {
      return "o";
    }
    case "o": {
      return "x";
    }
    default: {
      throw new Error(`player can only be x or o, not ${player}`);
    }
  }
};

export const indexToCoordinates = index => {
  const x = indexToX(index);
  const y = indexToY(index);

  return [x, y];
};

export const findWinner = indexes => {
  if (filterEmpties(indexes).length === 9) {
    return { player: "cats" };
  }

  const xResult = hasWinner("x")(indexes);
  const oResult = hasWinner("o")(indexes);

  if (xResult.line) {
    const { direction, position } = xResult;
    return { player: "x", direction, position };
  }

  if (oResult.line) {
    const { direction, position } = xResult;
    return { player: "o", direction, position };
  }

  return { player: undefined };
};

/**
 * @param predicate
 * @param game
 */
export const indexesMatching = predicate =>
  R.pipe(
    mapIndexed((tile, index) => [index, tile]),
    R.filter(([, tile]) => predicate(tile)),
    R.map(R.head)
  );

const hasWinner = type => R.pipe(game => indexesOfType(game)(type), hasLine);

const hasLine = indexes => {
  if (indexes.length === 0) {
    return { line: false };
  }
  const [x, maxX] = maxCountByCoordinate("x")(indexes);
  const [y, maxY] = maxCountByCoordinate("y")(indexes);

  if (maxX === 3) {
    return { line: true, direction: "x", position: x };
  }

  if (maxY === 3) {
    return { line: true, direction: "y", position: y };
  }

  if (intersects([0, 4, 8], indexes)) {
    return { line: true, direction: "d", position: 0 };
  }

  if (intersects([2, 4, 6], indexes)) {
    return { line: true, direction: "d", position: 2 };
  }

  return { line: false };
};

const filterEmpties = R.reject(R.isEmpty);

const indexToX = index => index % 3;
const indexToY = index => Math.floor(index / 3);

const indexToCoordinate = type => index =>
  type === "x" ? indexToX(index) : indexToY(index);

const maxCountByCoordinate = type =>
  R.pipe(
    R.map(indexToCoordinate(type)),
    R.countBy(R.identity),
    R.toPairs,
    maxOf(R.last),
    ([count, position]) => [parseInt(count, 10), position]
  );

const indexesOfType = game => type =>
  indexesMatching(tile => tile === type)(game);

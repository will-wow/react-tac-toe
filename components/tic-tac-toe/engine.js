import * as R from "ramda";

export const log = (...args) => data => {
  console.log.apply(null, args.concat([data]));
  return data;
};

export const mapIndexed = R.addIndex(R.map);

export const nextPlayer = player => (player === "x" ? "o" : "x");

export const indexToCoordinates = index => {
  const x = indexToX(index);
  const y = indexToY(index);

  return [x, y];
};

const filterEmpties = R.reject(R.isEmpty);

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

const hasWinner = type => R.pipe(game => indexesOfType(game)(type), hasLine);

const hasLine = indexes => {
  if (indexes.length === 0) {
    return { line: false };
  }
  const [x, maxX] = maxCountByCoordinate("x")(indexes);
  const [y, maxY] = maxCountByCoordinate("y")(indexes);

  if (maxX === 3) {
    return { line: true, direction: "x", position: x };
  } else if (maxY === 3) {
    return { line: true, direction: "y", position: y };
  }

  return { line: false };
};

const indexToX = index => index % 3;
const indexToY = index => Math.floor(index / 3);

const indexToCoordinate = type => index =>
  type === "x" ? indexToX(index) : indexToY(index);
const maxCountByCoordinate = type =>
  R.pipe(
    log("indexes"),
    R.map(indexToCoordinate(type)),
    R.countBy(R.identity),
    R.toPairs,
    log("pairs"),
    R.sortBy(R.last),
    R.last,
    log("max")
  );

const indexesOfType = game => type =>
  R.pipe(
    mapIndexed((tile, index) => [index, tile]),
    log("all index"),
    R.filter(([, tile]) => tile === type),
    R.map(R.head)
  )(game);

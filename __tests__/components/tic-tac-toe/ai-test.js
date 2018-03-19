import {
  nextMove,
  putPlayerOnTile,
  scoreMove,
  recurseNextMove
} from "../../../components/tic-tac-toe/ai";

describe("ai", () => {
  describe("nextMove", () => {
    it("minimizes losses", () => {
      // prettier-ignore
      const board = [
        'x', 'x', '',
        '', '', '',
        '', '', '',
      ];

      expect(nextMove("o", board)).toBe(2);
    });

    it("maximizes gains", () => {
      // prettier-ignore
      const board = [
        'x', 'x', '',
        '', '', '',
        '', '', '',
      ];

      expect(nextMove("x", board)).toBe(2);
    });
  });
});

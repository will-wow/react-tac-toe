import {
  nextPlayer,
  indexesMatching,
findWinner
} from "../../../components/tic-tac-toe/engine";

describe("ai", () => {
  describe("nextPlayer", () => {
    it("gets o from x", () => {
      expect(nextPlayer("x")).toBe("o");
    });

    it("gets x from o", () => {
      expect(nextPlayer("o")).toBe("x");
    });

    it("raises otherwise", () => {
      expect(() => nextPlayer("y")).toThrow();
    });
  });

  describe("indexesMatching", () => {
    it("finds indexes for matching tiles", () => {
      // prettier-ignore
      const game = [
        'x', 'x', 'x',
        'o', 'o', 'o',
        '', '', '',
      ];

      expect(indexesMatching(tile => tile === "x")(game)).toEqual([0, 1, 2]);
    });
  });

  describe('findWinner', () => {
    it('finds a horizontal winner', () => {
      // prettier-ignore
      const game = [
        'x', 'x', 'x',
        'o', '', 'o',
        '', '', '',
      ];

      expect(findWinner(game)).toEqual({
        player: 'x',
        direction: 'y',
        position: 0
      });
    })
  })
});

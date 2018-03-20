import { nextMove } from "../../../components/tic-tac-toe/ai";

describe("ai", () => {
  describe("nextMove", () => {
    it("minimizes losses", () => {
      // prettier-ignore
      const board = [
        'x', 'x', '',
        '', '', '',
        '', '', '',
      ];

      expect(nextMove("o")(board)).toBe(2);
    });

    it("minimizes losses", () => {
      // prettier-ignore
      const board = [
        '', '', '',
        '', '', '',
        '', '', 'x',
      ];

      expect(nextMove("o")(board)).toBe(4);
    });

    it("minimizes losses", () => {
      // prettier-ignore
      const board = [
        '', '', 'x',
        '', '', '',
        '', '', '',
      ];

      expect(nextMove("o")(board)).toBe(4);
    });

    it("minimizes losses", () => {
      // prettier-ignore
      const board = [
        'x', 'o', '',
        '', 'o', '',
        '', 'x', 'x',
      ];

      expect(nextMove("o")(board)).toBe(6);
    });

    it('minimizes losses', () => {
      // prettier-ignore
      const board = [
        '', '', '',
        '', '', '',
        'x', 'o', 'x',
      ];

      expect(nextMove("o")(board)).toBe(4);
    })

    it("maximizes gains", () => {
      // prettier-ignore
      const board = [
        'x', 'x', '',
        '', '', '',
        '', '', '',
      ];

      expect(nextMove("x")(board)).toBe(2);
    });

    it("maximizes gains", () => {
      // prettier-ignore
      const board = [
        '', 'x', 'x',
        'x', 'x', 'o',
        'o', 'o', '',
      ];

      expect(nextMove("o")(board)).toBe(8);
    });
  });
});

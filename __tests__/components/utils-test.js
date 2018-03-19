import { intersects } from "../../components/utils";

describe("utils", () => {
  describe("intersects", () => {
    it("finds an intersection", () => {
      expect(intersects([1, 3], [3, 4, 1])).toBeTruthy();
    });

     it("finds when there isn't an intersection", () => {
      expect(intersects([1, 3], [5, 4, 1])).toBeFalsy();
    });   
  });
});


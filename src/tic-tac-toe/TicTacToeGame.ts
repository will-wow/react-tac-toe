export type Player = "x" | "o";
export type Tile = Player | "";
export type Direction = "x" | "y";
export type Game = Tile[];
export type Winner = {
  player: Player;
};

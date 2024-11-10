export interface EnemyType {
  name: string;
  hp: number;
  position: { x: number, y: number };
  speed: number;
  attackValue: number;
}

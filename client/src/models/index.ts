export interface Pokemon {
  id: string | number;
  name: string;
  hp: number;
  strength: number;
  defense: number;
  speed: number;
  height: number;
  weight: number;
  img: string;
  createInDb: boolean;
  createdAt: string;
  updatedAt: string;
  types: string[];
}

export interface Type {
  id: number;
  name: string;
  createdAt: string;
}

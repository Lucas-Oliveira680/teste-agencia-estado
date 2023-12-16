import {Card} from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

export interface Deck {
  id: string;
  name: string;
  cards:Card[]
}

import {Card} from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

export interface ISearchByQueryReturn {
  data: Card[];
  page: number,
  pageSize: number,
  count: number,
  totalCount: number
}

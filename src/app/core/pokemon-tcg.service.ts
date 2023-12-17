import {Injectable} from '@angular/core';
import {PokemonTCG} from "pokemon-tcg-sdk-typescript";
import {from, map, Observable} from "rxjs";
import {ISearchByQueryReturn} from "@core/interfaces/searchByQueryReturn";
import {HttpClient, HttpParams} from "@angular/common/http";

const API_URL = 'https://api.pokemontcg.io/v2';

@Injectable({
    providedIn: 'root'
})
export class PokemonTcgService {

    constructor(private _http: HttpClient) {
    }

    getSuperTypes(): Observable<PokemonTCG.Supertype[]> {
        return from(PokemonTCG.getSupertypes());
    }

  searchByName(str: string, page: number = 1, pageSize: number = 8): Observable<ISearchByQueryReturn> {
    let params = new HttpParams()
      .set('q', `name:${str}`)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this._http.get<ISearchByQueryReturn>(`${API_URL}/cards`, { params }).pipe(
      map(response => {
        return {
          data: response.data,
          page: response.page,
          pageSize: response.pageSize,
          count: response.count,
          totalCount: response.totalCount
        };
      })
    );

}

}

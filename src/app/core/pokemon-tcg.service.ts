import {Injectable} from '@angular/core';
import {PokemonTCG} from "pokemon-tcg-sdk-typescript";
import {from, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PokemonTcgService {

    constructor() {
    }

    getSuperTypes(): Observable<PokemonTCG.Supertype[]> {
        return from(PokemonTCG.getSupertypes());
    }

    searchByName(str: string, page: number = 1, pageSize: number = 8): Observable<PokemonTCG.Card[]> {
      const param: PokemonTCG.Parameter = {q: `name:${str}`, page: page, pageSize: pageSize};

      return from(PokemonTCG.findCardsByQueries(param));
    }

}

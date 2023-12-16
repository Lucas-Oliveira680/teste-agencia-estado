import { ActivatedRouteSnapshot, RouterStateSnapshot, ResolveFn } from "@angular/router";
import { Deck } from "@features/decks/interfaces/deck.interface";
import { DeckService } from "@core/deck.service";
import {inject} from "@angular/core";

export const deckResolver: ResolveFn<Deck | undefined> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const deckService = inject(DeckService);
  const id = route.paramMap.get('id');
  if (id === null) {
    return undefined;
  }
  return deckService.getDeck(id);
};

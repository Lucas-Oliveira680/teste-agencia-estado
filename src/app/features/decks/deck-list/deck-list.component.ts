import {Component, OnInit} from '@angular/core';
import {PokemonTcgService} from "@core/pokemon-tcg.service";
import {Deck} from "@features/decks/interfaces/deck.interface";
import {DeckService} from "@core/deck.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {NzListModule} from "ng-zorro-antd/list";

@Component({
    selector: 'app-deck-list',
    standalone: true,
  imports: [
    NgForOf,
    NzListModule
  ],
    templateUrl: './deck-list.component.html',
    styleUrl: './deck-list.component.scss'
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];
  loading = true;

  constructor(private _deckService: DeckService, private _router: Router) { }

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks() {
    this.loading = true;
    this.decks = this._deckService.getDecks();
    this.loading = false;
  }

  createDeck() {
    this._router.navigate(['/deck-create']);
  }

  viewDeck(deckId: string) {
    this._router.navigate(['/deck-details', deckId]);
  }

  editDeck(deckId: string) {
    this._router.navigate(['/deck-edit', deckId]);
  }

  deleteDeck(deckId: string) {
    this._deckService.deleteDeck(deckId);
    this.loadDecks();
  }
  getDeckSummary(deck: Deck): string {
    return `Cartas: ${deck.cards.length}/60`;
  }

}

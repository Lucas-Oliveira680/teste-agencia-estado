import {Component, OnInit} from '@angular/core';
import {PokemonTcgService} from "@core/pokemon-tcg.service";
import {Deck} from "@features/decks/interfaces/deck.interface";
import {DeckService} from "@core/deck.service";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-deck-list',
    standalone: true,
  imports: [
    NgForOf
  ],
    templateUrl: './deck-list.component.html',
    styleUrl: './deck-list.component.scss'
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];

  constructor(private _deckService: DeckService, private _router: Router) { }

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks() {
    this.decks = this._deckService.getDecks();
    console.log(this.decks)
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
}

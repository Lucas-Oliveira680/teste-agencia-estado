import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTcgService } from '@core/pokemon-tcg.service';
import { DeckService } from '@core/deck.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/interfaces/card';
import { Deck } from '@features/decks/interfaces/deck.interface';
import { NgForOf, NgIf } from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
  selector: 'app-deck-edit',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf, NzButtonModule, NzIconModule, NzListModule, NzTabsModule, NzFormModule, NzInputModule],
  templateUrl: './deck-edit.component.html'
})
export class DeckEditComponent implements OnInit {
  deck: Deck | undefined;
  cards: Card[] = [];
  searchString: string = '';
  loading = false;

  constructor(private route: ActivatedRoute, private pokemonTcgService: PokemonTcgService, private deckService: DeckService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.deck = data['deck'];
    });
  }

  search() {
    this.loading = true;
    this.pokemonTcgService.searchByName(this.searchString, 1, 100).subscribe({
      next: (data) => {
        this.cards = data.data;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  selectCard(card: Card) {
    if (!this.deck) return;
    const count = this.getCardCount(card);
    if (count < 4) {
      this.deck.cards.push(card);
    }
  }

  removeCard(cardToRemove: Card) {
    if (!this.deck) return;
    const index = this.deck.cards.findIndex(card => card.id === cardToRemove.id);
    if (index > -1) {
      this.deck.cards.splice(index, 1);
    }
  }

  getCardCount(card: Card): number {
    return this.deck ? this.deck.cards.filter(c => c.id === card.id).length : 0;
  }

  saveChanges() {
    if (!this.deck) return;
    this.deckService.updateDeck(this.deck.id, this.deck);
  }
}

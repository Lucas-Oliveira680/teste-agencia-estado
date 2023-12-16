import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonTcgService } from '@core/pokemon-tcg.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/interfaces/card';
import { DeckService } from '@core/deck.service';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-deck-create',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './deck-create.component.html',
  styleUrls: ['./deck-create.component.scss']
})
export class DeckCreateComponent implements OnInit {
  cards: Card[] = [];
  selectedCards: Card[] = [];
  deckName: string = '';
  searchString: string = '';
  loading = false;

  constructor(private pokemonTcgService: PokemonTcgService, private deckService: DeckService) { }

  ngOnInit() {
  }

  search() {
    this.loading = true;
    this.pokemonTcgService.searchByName(this.searchString).subscribe({
      next: (data) => {
        this.cards = data;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  selectCard(card: Card) {
    const count = this.getCardCount(card);
    if (count < 4) {
      this.selectedCards.push(card);
    }
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCards.some(c => c.id === card.id);
  }

  removeCard(cardToRemove: Card) {
    const index = this.selectedCards.findIndex(card => card.id === cardToRemove.id);
    if (index > -1) {
      this.selectedCards.splice(index, 1);
    }
  }

  getCardCount(card: Card): number {
    return this.selectedCards.filter(c => c.id === card.id).length;
  }

  createDeck() {
    const result = this.deckService.createDeck(this.deckName, this.selectedCards);
    if (result === null) {
      alert('Deck created successfully!');
      this.resetForm();
    } else {
      alert(result);
    }
  }

  private resetForm() {
    this.deckName = '';
    this.selectedCards = [];
    this.searchString = '';
  }
}

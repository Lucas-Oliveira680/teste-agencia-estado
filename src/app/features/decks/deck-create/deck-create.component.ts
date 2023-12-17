import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonTcgService } from '@core/pokemon-tcg.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/interfaces/card';
import { DeckService } from '@core/deck.service';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-deck-create',
  standalone: true,
  imports: [NgForOf, NgIf, NzButtonModule, NzInputModule, FormsModule, NzListModule, NzTypographyModule, NzFormModule, NzTabsModule, NzPaginationModule, NzSpinModule, NzIconModule, SlicePipe],
  templateUrl: './deck-create.component.html',
  styleUrls: ['./deck-create.component.scss']
})
export class DeckCreateComponent implements OnInit {
  totalCount: number;
  page: number = 1;
  pageSize: number = 16;
  cards: Card[] = [];
  selectedCards: Card[] = [];
  deckName: string = '';
  searchString: string = '';
  loading: boolean = false;

  constructor(private pokemonTcgService: PokemonTcgService, private deckService: DeckService) { }

  ngOnInit() { }

  cannotAddMoreOfCard(card: Card): boolean {
    if (card.supertype === 'Energy') {
      return false;
    }
    return this.getCardCount(card) >= 4;
  }

  search() {
    this.loading = true;
    this.pokemonTcgService.searchByName(this.searchString, this.page, this.pageSize).subscribe({
      next: (data) => {
        this.cards = data.data;
        this.totalCount = data.totalCount;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  selectCard(card: Card): void {
    if (this.canAddCardToDeck(card)) {
      this.selectedCards.push(card);
    }
  }

  canAddCardToDeck(card: Card): boolean {
    const nonEnergyCards = this.selectedCards.filter(c => c.name === card.name && c.supertype !== 'Energy');
    return nonEnergyCards.length < 4;
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
      alert('Deck criado com sucesso!');
      this.resetForm();
    } else {
      alert(result);
    }
  }
  get uniqueSelectedCards(): Card[] {
    const uniqueCards = new Map<string, Card>();
    for (const card of this.selectedCards) {
      uniqueCards.set(card.id, card);
    }
    return Array.from(uniqueCards.values());
  }

  removeSingleCard(cardToRemove: Card): void {
    const index = this.selectedCards.lastIndexOf(cardToRemove);
    if (index > -1) {
      this.selectedCards.splice(index, 1);
    }
  }


   resetForm() {
    this.deckName = '';
    this.selectedCards = [];
    this.searchString = '';
  }
  onPageIndexChange(event: number) {
    this.page = event;
    this.search();
  }

}

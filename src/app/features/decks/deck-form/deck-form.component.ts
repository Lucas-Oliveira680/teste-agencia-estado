import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonTcgService } from '@core/pokemon-tcg.service';
import { DeckService } from '@core/deck.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/interfaces/card';
import { Deck } from '@features/decks/interfaces/deck.interface';
import { NgForOf, NgIf, SlicePipe } from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzListModule} from "ng-zorro-antd/list";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
  selector: 'app-deck-form',
  standalone: true,
  imports: [NgForOf, NgIf, NzButtonModule, NzInputModule, FormsModule, NzListModule, NzTabsModule, NzFormModule, NzPaginationModule, NzIconModule, SlicePipe, NzButtonModule, NzIconModule, NzPaginationModule, NzTabsModule, NzListModule, NzFormModule, NzInputModule],
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.scss']
})
export class DeckFormComponent implements OnInit {
  isEditMode: boolean;
  deck: Deck | undefined;
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 16;
  cards: Card[] = [];
  selectedCards: Card[] = [];
  deckName: string = '';
  searchString: string = '';
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonTcgService: PokemonTcgService,
    private deckService: DeckService
  ) {}

  ngOnInit() {
    this.isEditMode = this.route.snapshot.paramMap.has('id');
    if (this.isEditMode) {
      this.loadDeck();
    }
  }

  loadDeck() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deck = this.deckService.getDeck(id);
      this.selectedCards = this.deck ? this.deck.cards : [];
      this.deckName = this.deck ? this.deck.name : '';
    }
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

  selectCard(card: Card) {
    if (this.canAddCardToDeck(card)) {
      this.selectedCards.push(card);
    }
  }

  canAddCardToDeck(card: Card): boolean {
    const nonEnergyCards = this.selectedCards.filter(c => c.name === card.name && c.supertype !== 'Energy');
    return nonEnergyCards.length < 4;
  }

  removeSingleCard(cardToRemove: Card): void {
    const index = this.selectedCards.lastIndexOf(cardToRemove);
    if (index > -1) {
      this.selectedCards.splice(index, 1);
    }
  }

  saveChanges() {
    if (this.isEditMode && this.deck) {
      this.deck.cards = this.selectedCards;
      this.deck.name = this.deckName;
      const errorMessage = this.deckService.updateDeck(this.deck.id, this.deck);
      if (errorMessage) {
        alert(errorMessage);
      } else {
        alert('Deck atualizado com sucesso!');
        this.router.navigate(['/deck-list']);
      }
    } else {
      const errorMessage = this.deckService.createDeck(this.deckName, this.selectedCards);
      if (errorMessage) {
        alert(errorMessage);
      } else {
        alert('Deck criado com sucesso!');
        this.router.navigate(['/deck-list']);
      }
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

  getCardCount(card: Card): number {
    return this.selectedCards.filter(c => c.id === card.id).length;
  }

  get uniqueSelectedCards(): Card[] {
    const uniqueCards = new Map<string, Card>();
    for (const card of this.selectedCards) {
      uniqueCards.set(card.id, card);
    }
    return Array.from(uniqueCards.values());
  }

  cannotAddMoreOfCard(card: Card): boolean {
    if (card.supertype === 'Energy') {
      return false;
    }
    return this.getCardCount(card) >= 4;
  }
}

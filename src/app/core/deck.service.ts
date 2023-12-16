import { Injectable } from '@angular/core';
import {Deck} from "@features/decks/interfaces/deck.interface";
import { v4 as uuidv4 } from 'uuid';
import {Card} from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private decks: Deck[] = [];
  private localStorageKey = 'pokemonDecks';

  constructor() {
    this.loadDecks();
  }

  private loadDecks(): void {
    const storedDecks = localStorage.getItem(this.localStorageKey);
    if (storedDecks) {
      this.decks = JSON.parse(storedDecks);
    }
  }

  getDecks(): Deck[] {
    return this.decks;
  }

  getDeck(id: string): Deck | undefined {
    return this.decks.find(deck => deck.id === id);
  }

  createDeck(name: string, cards: Card[]): string | null {
    if (cards.length < 24 || cards.length > 60) {
      return 'A deck must contain between 24 and 60 cards.';
    }

    const cardNameCounts = new Map<string, number>();
    for (const card of cards) {
      const currentCount = (cardNameCounts.get(card.name) || 0) + 1;
      cardNameCounts.set(card.name, currentCount);
      if (currentCount > 4) {
        return `Cannot have more than 4 copies of ${card.name}`;
      }
    }

    const newDeck: Deck = {
      id: uuidv4(),
      name,
      cards
    };

    this.decks.push(newDeck);
    this.saveDecks();
    return null;
  }

  updateDeck(id: string, updatedDeck: Deck): string | null {
    const deckIndex = this.decks.findIndex(deck => deck.id === id);
    if (deckIndex === -1) {
      return 'Deck not found.';
    }

    this.decks[deckIndex] = updatedDeck;
    this.saveDecks();
    return null;
  }

  deleteDeck(id: string): void {
    this.decks = this.decks.filter(deck => deck.id !== id);
    this.saveDecks();
  }

  private saveDecks(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.decks));
  }


}

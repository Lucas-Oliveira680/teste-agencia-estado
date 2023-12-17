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
      return 'O deck deve conter entre 24 e 60 cartas.';
    }

    const cardNameCounts = new Map<string, number>();
    for (const card of cards) {
      const cardName = card.name;
      if (card.supertype !== 'Energy' || (card.supertype === 'Energy' && !cardName.endsWith('Energy'))) {
        const count = (cardNameCounts.get(cardName) || 0) + 1;
        if (count > 4) {
          return `Você não pode ter mais de 4 cartas com o nome "${cardName}" no deck, exceto para energias básicas.`;
        }
        cardNameCounts.set(cardName, count);
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
    if (updatedDeck.cards.length < 24) {
      return 'O deck deve conter pelo menos 24 cartas.';
    }

    const deckIndex = this.decks.findIndex(deck => deck.id === id);
    if (deckIndex === -1) {
      return 'Deck não encontrado.';
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

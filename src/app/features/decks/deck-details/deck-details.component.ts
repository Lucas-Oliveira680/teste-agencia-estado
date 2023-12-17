
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { Deck } from '@features/decks/interfaces/deck.interface';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/interfaces/card';
import {Supertype} from "pokemon-tcg-sdk-typescript/dist/enums/supertype";
import {Type} from "pokemon-tcg-sdk-typescript/dist/enums/type";
import {NzListModule} from "ng-zorro-antd/list";
import {NgForOf, NgIf} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzFormModule} from "ng-zorro-antd/form";

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.scss'],
  imports: [
    NzListModule,
    NgIf,
    NzCardModule,
    NgForOf,
    NzButtonModule,
    RouterModule,
    NzStatisticModule,
    NzFormModule
  ],
  standalone: true
})
export class DeckDetailsComponent implements OnInit {
  deck: Deck | undefined;
  pokemonCount = 0;
  trainerCount = 0;
  uniqueTypes = new Set<Type>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.deck = data['deck']
      this.analyzeDeck();
    });
  }

  analyzeDeck() {
    if (!this.deck) return;

    this.deck.cards.forEach((card: Card) => {
      if (card.supertype === Supertype.Pokemon) {
        this.pokemonCount++;
        card.types?.forEach(type => this.uniqueTypes.add(type));
      } else if (card.supertype === Supertype.Trainer) {
        this.trainerCount++;
      }
    });
  }
}

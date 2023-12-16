import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Deck} from "@features/decks/interfaces/deck.interface";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-deck-details',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss'
})
export class DeckDetailsComponent implements OnInit{
  deck: Deck | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.deck = data['deck'];
      console.log(data)
    });
  }
}

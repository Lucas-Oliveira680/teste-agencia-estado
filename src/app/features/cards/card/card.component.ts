import {Component, Input} from '@angular/core';
import {Card} from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card: Card
}

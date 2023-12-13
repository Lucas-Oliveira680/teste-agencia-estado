import {Routes} from '@angular/router';
import {DeckListComponent} from "@features/decks/deck-list/deck-list.component";
import {DeckCreateComponent} from "@features/decks/deck-create/deck-create.component";
import {DeckDetailsComponent} from "@features/decks/deck-details/deck-details.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'deck-list',
    pathMatch: 'full'
  },
  {
    path: 'deck-list',
    component: DeckListComponent
  },
  {
    path: 'deck-create',
    component: DeckCreateComponent,
  },
  {
    path: 'deck-details',
    component: DeckDetailsComponent
  }
];

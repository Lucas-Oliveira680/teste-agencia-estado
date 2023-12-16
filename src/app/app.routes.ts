import {Routes} from '@angular/router';
import {DeckListComponent} from "@features/decks/deck-list/deck-list.component";
import {DeckCreateComponent} from "@features/decks/deck-create/deck-create.component";
import {DeckDetailsComponent} from "@features/decks/deck-details/deck-details.component";
import {DeckEditComponent} from "@features/decks/deck-edit/deck-edit.component";
import {deckResolver} from "@features/decks/deck-details/services/deck-resolver.service";


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
    path: 'deck-details/:id',
    component: DeckDetailsComponent,
    resolve: { deck: deckResolver }
  },
  {
    path: 'deck-edit/:id',
    component: DeckEditComponent,
    resolve: { deck: deckResolver }

  }
];

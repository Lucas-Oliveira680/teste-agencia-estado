import {Routes} from '@angular/router';
import {DeckListComponent} from "@features/decks/deck-list/deck-list.component";
import {DeckDetailsComponent} from "@features/decks/deck-details/deck-details.component";
import {deckResolver} from "@features/decks/deck-details/services/deck-resolver.service";
import {AboutComponent} from "@features/about/about.component";
import {DeckFormComponent} from "@features/decks/deck-form/deck-form.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'deck-list',
    component: DeckListComponent,
    data: { breadcrumb: 'Listar decks' }
  },
  {
    path: 'deck-create',
    component: DeckFormComponent,
    data: { breadcrumb: 'Criar Deck' }
  },
  {
    path: 'deck-details/:id',
    component: DeckDetailsComponent,
    resolve: { deck: deckResolver },
    data: { breadcrumb: 'Detalhes do deck' }
  },
  {
    path: 'deck-edit/:id',
    component: DeckFormComponent,
    resolve: { deck: deckResolver },
    data: { breadcrumb: 'Editar Deck' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { breadcrumb: 'Sobre' }
  }
];

import { Routes } from '@angular/router';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonCreateComponent } from './components/person-create/person-create.component';
import { PersonEditComponent } from './components/person-edit/person-edit.component';
import { PersonDeleteComponent } from './components/person-delete/person-delete.component';

export const routes: Routes = [
  { path: '', redirectTo: '/persons', pathMatch: 'full' },
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/create', component: PersonCreateComponent },
  { path: 'persons/edit/:id', component: PersonEditComponent },
  { path: 'persons/delete/:id', component: PersonDeleteComponent },
  { path: '**', redirectTo: '/persons' } // Handle 404
];

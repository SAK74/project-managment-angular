import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotFoundComponent,
  SignupComponent,
  LoginComponent,
  HomePageComponent,
  UsersComponent,
  BoardsComponent,
} from './components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: 'users', component: UsersComponent },
  {
    path: 'boards',
    component: BoardsComponent,
  },
  {
    path: '',
    // pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

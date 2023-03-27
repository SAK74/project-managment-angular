import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotFoundComponent,
  SignupComponent,
  LoginComponent,
  HomePageComponent,
  BoardsComponent,
  SingleBoard,
  UserProfileComponent,
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
  {
    path: 'boards/:id',
    component: SingleBoard,
  },
  {
    path: 'boards',
    component: BoardsComponent,
  },
  { path: 'profile', component: UserProfileComponent },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NotFoundComponent,
  SignupComponent,
  LoginComponent,
  HomePageComponent,
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

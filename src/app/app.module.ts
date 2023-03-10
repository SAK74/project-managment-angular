import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  LoginComponent,
  TopPanelComponent,
  NotFoundComponent,
  FooterComponent,
  SignupComponent,
  HomePageComponent,
  FormComponent,
  UsersComponent,
  BoardsComponent,
} from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { interceptorsProviders } from './interceptors';
import { tokenReducer, userReducer } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TopPanelComponent,
    NotFoundComponent,
    FooterComponent,
    HomePageComponent,
    FormComponent,
    UsersComponent,
    BoardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    StoreModule.forRoot({ token: tokenReducer, user: userReducer }, {}),
    MatRippleModule,
  ],
  providers: [interceptorsProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

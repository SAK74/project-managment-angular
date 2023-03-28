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
  BoardsComponent,
  SingleBoard,
  TaskComponent,
  SpinnerComponent,
  ColumnComponent,
  TitleComponent,
  SpinnerService,
  ConfirmComponent,
  UserProfileComponent,
  FormCreateComponent,
  CreateBoardComponent,
  CreateCard,
} from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { interceptorsProviders } from './interceptors';
import { langReducer, tokenReducer, userReducer } from './store/reducers';
import { SnackBarService } from './services/snack-bar.service';
import { MaterialModule } from './material.module';

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
    BoardsComponent,
    SingleBoard,
    TaskComponent,
    SpinnerComponent,
    ColumnComponent,
    TitleComponent,
    ConfirmComponent,
    UserProfileComponent,
    FormCreateComponent,
    CreateBoardComponent,
    CreateCard,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(
      { token: tokenReducer, user: userReducer, lang: langReducer },
      {}
    ),
    MaterialModule,
  ],
  providers: [interceptorsProviders, SpinnerService, SnackBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}

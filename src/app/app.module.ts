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
  SingleBoard,
  TaskComponent,
  SpinnerComponent,
} from './components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
// import {MatSidenavModule} from '@angular/material/sidenav',
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { interceptorsProviders } from './interceptors';
import { tokenReducer, userReducer } from './store/reducers';
import { SpinnerService } from './services/spinner.service';

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
    SingleBoard,
    TaskComponent,
    SpinnerComponent,
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
    MatMenuModule,
    // MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [interceptorsProviders, SpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}

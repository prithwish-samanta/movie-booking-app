import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerComponent } from './shared/progress-spinner/progress-spinner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ManageMoviesComponent } from './components/admin-services/manage-movies/manage-movies.component';
import { ManageTicketComponent } from './components/admin-services/manage-ticket/manage-ticket.component';
import { AddMovieComponent } from './components/admin-services/add-movie/add-movie.component';
import { AuthInterceptorService } from './guards/auth-interceptor.service';
import { BookTicketComponent } from './components/book-ticket/book-ticket.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    UpdatePasswordComponent,
    HomeComponent,
    HeaderComponent,
    ProgressSpinnerComponent,
    ProfileComponent,
    MovieDetailsComponent,
    BookTicketComponent,
    ManageMoviesComponent,
    ManageTicketComponent,
    AddMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

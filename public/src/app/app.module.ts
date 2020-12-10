import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RsvpFormComponent } from './components/rsvp-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation.component';
import { ErrorComponent } from './components/error.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: '', component: RsvpFormComponent },
  { path: 'rsvpForm', component: RsvpFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'error', component: ErrorComponent },
  ];

@NgModule({
  declarations: [
    AppComponent,
    RsvpFormComponent,
    ConfirmationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

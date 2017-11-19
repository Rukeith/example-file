import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AirportsComponent } from './components/airports/airports.component';

import {AirportService} from './services/airport.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AirportsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AirportService],
  bootstrap: [AppComponent]
})
export class AppModule { }

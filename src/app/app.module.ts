import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//import * as PagSeguroDirectPayment from '../assets/js/pagseguro.directpayment.js';
import { AppComponent } from './app.component';
import { SessaoComponent } from './sessao/sessao.component';


@NgModule({
  declarations: [
    AppComponent,
    SessaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

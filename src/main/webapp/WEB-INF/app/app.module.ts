import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SiteFormComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import { LocalStorage } from './local.storage';

@NgModule({
    imports:      [ BrowserModule ,FormsModule],
    declarations: [ SiteFormComponent ],
    providers: [LocalStorage],
    bootstrap:    [ SiteFormComponent ]
})
export class AppModule { }
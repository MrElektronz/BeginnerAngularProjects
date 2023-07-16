import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LetterBoxComponent } from './letter-box/letter-box.component';
import { WordFieldComponent } from './word-field/word-field.component';

@NgModule({
  declarations: [
    AppComponent,
    LetterBoxComponent,
    WordFieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

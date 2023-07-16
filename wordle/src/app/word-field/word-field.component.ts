import { Component, HostListener, ViewChild } from '@angular/core';
import { LetterBoxComponent } from '../letter-box/letter-box.component';

@Component({
  selector: 'app-word-field',
  templateUrl: './word-field.component.html',
  styleUrls: ['./word-field.component.scss']
})
export class WordFieldComponent {

  letters: string = '';
  amountOfLetterBoxes: number[] = Array(30).fill(0);
  currentRow: number = 1;
  finished: boolean = false;

  MAX_LETTERS_IN_ROW: number = 5;
  WORD: string = "TODAY";

  @HostListener('window:keydown', ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.finished) {
      return;
    }
    if(event.key === "Enter") {
      this.loginCurrentRow();
    }
    if(event.key === "Backspace"){
      this.deleteLastLetter();
      return;
    }
    if(this.isLetter(event.key)) {
      this.writeNextLetter(event.key);
    }
  }


  public updateLetterBoxMode(id: number) {
    let mode = this.calculateLetterBoxMode(id);
    let box = document.getElementById("letter-box_"+id);
    box?.classList.remove("empty", "contains", "miss", "hit");
    box?.classList.add(mode ?? "empty");
  }

  public calculateLetterBoxMode(id: number) : "hit" | "miss" | "contains" | null {
    if(id > this.letters.length) {
      return null;
    }
    if(this.WORD.charAt(id%this.MAX_LETTERS_IN_ROW) == this.letters.at(id)){
      return "hit";
    }
    if(this.WORD.includes(this.letters.at(id) ?? " ")) {
      return "contains";
    }
    return "miss";
  }

  private loginCurrentRow() {
    if(this.letters.length < this.currentRow*this.MAX_LETTERS_IN_ROW) {
      return;
    }
    for(let i = this.currentRow*5-5; i<this.currentRow*5; i++){
      this.updateLetterBoxMode(i);
    }
    const currentWord = this.letters.substring(this.currentRow*5-5, this.currentRow*5);
    if(currentWord === this.WORD) {
      this.finished = true;
    }
    this.currentRow++;
  }

  private deleteLastLetter() {
    if(this.letters.length <= this.currentRow*this.MAX_LETTERS_IN_ROW && this.letters.length > this.currentRow*this.MAX_LETTERS_IN_ROW-this.MAX_LETTERS_IN_ROW){
      this.letters = this.letters.slice(0, -1);
    }
  }

  private writeNextLetter(letter: string) {
    if(this.letters.length >= this.currentRow*this.MAX_LETTERS_IN_ROW){
      return;
    }
    this.letters+=letter.toUpperCase();
  }


  isLetter(str: string): boolean {
    return (str.length === 1 && str.match(/[a-z]/i) != null);
  }
}

import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.scss']
})
export class LetterBoxComponent{
  
  @Input() letter: string | null = null;
  @Input() index: number = 0;

}

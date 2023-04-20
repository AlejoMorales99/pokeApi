import { Pokemon, LetterCount} from '../../models/index';
import { Component, Input , OnInit} from '@angular/core';
import { FiltroPipe } from '../../pipes/filtro.pipe';



@Component({
  selector: 'app-poke-alphabet',
  templateUrl: './poke-alphabet.component.html',
})
export class PokeAlphabetComponent implements OnInit {

  @Input() letterCounts: LetterCount[]=[];

  ngOnInit ():void { 
}

}





import { Component, Input,Output , EventEmitter} from '@angular/core';
import { PokemonDetails } from '../../models';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent {


  @Input() pokemonDetails!: PokemonDetails; 
  @Output() favoritePokeSelected = new EventEmitter<PokemonDetails>();
  isFavorite: boolean = false;

  chooseFavorite(){
    this.isFavorite= !this.isFavorite;
    if(this.isFavorite){
      this.favoritePokeSelected.emit(this.pokemonDetails);
    }else{
      this.favoritePokeSelected.emit();
    }
  }

}

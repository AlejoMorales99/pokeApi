import { Component, Input } from '@angular/core';
import { PokemonDetails } from '../../models';
@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent {


  @Input() pokemonDetails!: PokemonDetails; 
  isFavorite: boolean = false;

  chooseFavorite(){
    this.isFavorite= !this.isFavorite
  }

}

import { Component } from '@angular/core';
import { PokemonDetails } from '../../models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  favoritePokemon: PokemonDetails | null = null;

  openFavoriteModal( pokemon: PokemonDetails){
    this.favoritePokemon = pokemon; 
  }

  closeFavoriteModal(){
    this.favoritePokemon= null; 
  }
}

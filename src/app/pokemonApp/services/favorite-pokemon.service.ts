import { Injectable } from '@angular/core';
import { PokemonDetails } from '../models';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {

  private favoritePokemon: PokemonDetails | null = null;
  private favoritePokemonIds: string[] = [];
  private resetFavorites = new Subject<void>();

  constructor() { }

  getFavoritePokemonIds(): string[] {
    return this.favoritePokemonIds;
  }

  getFavoritePokemon(): PokemonDetails | null {
    return this.favoritePokemon;
}

  setFavoritePokemon(pokemon: PokemonDetails): void {
    this.favoritePokemon = pokemon;
    this.favoritePokemonIds.push(pokemon.id.toString());
    console.log('Favorite Pokemon Ids:', this.favoritePokemonIds);
  }

  removeFavoritePokemon(id:number) {
    console.log('ID del Pokemon a eliminar:', id);
    const index = this.favoritePokemonIds.indexOf(id.toString());
    if (index !== -1) {
      this.favoritePokemonIds.splice(index, 1);
      this.resetFavorites.next();
      console.log('Pokemon eliminado con éxito. Nueva matriz de IDs de Pokemon favoritos:', this.favoritePokemonIds);
    }
  }

  isFavoritePokemon(pokemonId: string): boolean {
    return this.favoritePokemonIds.includes(pokemonId);
  }

  getResetFavorites(): Observable<void> {
    return this.resetFavorites.asObservable();
    }
    
}
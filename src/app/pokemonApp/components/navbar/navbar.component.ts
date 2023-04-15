import { Component } from "@angular/core";
import { PokemonDetails } from "../../models";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  favoritePokemon: PokemonDetails | null = null;

  openFavoriteModal(pokemon: PokemonDetails | null) {
    if (pokemon) {
      this.favoritePokemon = pokemon;
    }
  }

  closeFavoriteModal() {
    this.favoritePokemon = null;
  }

  onFavoritePokeSelected(pokemon: PokemonDetails | null) {
    this.favoritePokemon = pokemon;
  }
}

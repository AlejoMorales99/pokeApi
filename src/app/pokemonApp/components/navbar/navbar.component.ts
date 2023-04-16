import { Component, ViewChild } from "@angular/core";
import { PokemonDetails } from "../../models";
import { PokeDetailsComponent } from '../poke-details/poke-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {

  @ViewChild('pokeDetails') pokeDetailsComponent : PokeDetailsComponent | undefined;

  constructor(private modalService : NgbModal){}

  public favoritePokemon: PokemonDetails  = {} as PokemonDetails;

  openFavoriteModal(content: any, pokemon: PokemonDetails | null) {
    this.favoritePokemon = pokemon || {} as PokemonDetails;
    if (this.pokeDetailsComponent) {
      this.pokeDetailsComponent.chooseFavorite();
    }
    this.modalService.open(content, {centered: true}).result.then((result) => {
      console.log(`Modal result: ${result}`);
    }, (reason) => {
      console.log(`Modal dismissed with reason: ${reason}`);
    }); 
  }

  closeFavoriteModal() {
    this.favoritePokemon = {} as PokemonDetails;
    console.log(this.favoritePokemon);
  }

  onFavoritePokeSelected(pokemon: PokemonDetails | null) {
    this.favoritePokemon = pokemon || {} as PokemonDetails;
    console.log(this.favoritePokemon);
  }
}

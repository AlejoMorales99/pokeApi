import { Component, ViewChild, OnInit } from "@angular/core";
import { PokemonDetails } from "../../models";
import { PokeDetailsComponent } from "../poke-details/poke-details.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FavoritePokemonService } from "../../services";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  public favoritePokemon: PokemonDetails = {} as PokemonDetails;
  public favoritePokemonIds: string[] = [];
  public favoritePokemonName: string = "";
  public isFavorite: boolean = false;
  public isPokemonDeleted: boolean = false;

  @ViewChild("pokeDetails") pokeDetailsComponent?: PokeDetailsComponent;

  @ViewChild("favoriteModal") favoriteModal: any;

  constructor(
    private modalService: NgbModal,
    private favoritePokemonService: FavoritePokemonService
  ) {}

  ngOnInit() {
    this.getFavoritePokemon();
    this.favoritePokemonIds = this.favoritePokemonService.getFavoritePokemonIds();
    this.pokeDetailsComponent?.favoritePokeSelected.subscribe(
      (pokemon: PokemonDetails) => {
        this.onFavoritePokeSelected(pokemon);
      }
      );
    }
    
    updateFavoritePokemonName(pokemonName: string) {
      this.favoritePokemonName = pokemonName;
  }

  openFavoriteModal(content: any, pokemon: PokemonDetails | null) {
    if (pokemon && pokemon.name && pokemon.height && pokemon.weight) {
      this.favoritePokemon = pokemon;
    } else {
      this.getFavoritePokemon();
      
    }
    if (this.pokeDetailsComponent) {
      this.pokeDetailsComponent.chooseFavorite();
    }

    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        if (this.isPokemonDeleted) {
          // Si se eliminó el Pokemon favorito, establecer como objeto vacío
          this.favoritePokemon = {} as PokemonDetails;
          this.isPokemonDeleted = false;
        }
        this.favoriteModal.componentInstance.pokeDetailsComponent.resetFavorite();
      },
      (reason) => {
        if (this.isPokemonDeleted) {
          // Si se eliminó el Pokemon favorito, establecer como objeto vacío
          this.favoritePokemon = {} as PokemonDetails;
          this.isPokemonDeleted = false;
        }
        this.favoriteModal.componentInstance.pokeDetailsComponent.resetFavorite();
      }
    );
  }

  closeFavoriteModal() {
    this.favoritePokemon = {} as PokemonDetails;
  }

  onFavoritePokeSelected(pokemon: PokemonDetails | null) {
    this.favoritePokemon = pokemon || ({} as PokemonDetails);
    const favoriteButton = document.getElementById("favorite-button");
    if (favoriteButton) {
      favoriteButton.innerHTML = `Pokemon Favorito <span class="fs-5">${
        this.favoritePokemon.name
          ? this.favoritePokemon.name.toUpperCase()
          : "No hay favoritos"
      }</span>`;
    }
  }

  resetFavoriteModal() {
    this.favoritePokemon = {} as PokemonDetails;
    if (this.pokeDetailsComponent) {
      this.pokeDetailsComponent.resetFavorite();
    }
  }

  removeFavoritePokemon(pokemonId: number) {
    const idStr = pokemonId.toString();
    this.favoritePokemonService.removeFavoritePokemon(parseInt(idStr));
    this.favoritePokemonIds = this.favoritePokemonService.getFavoritePokemonIds();
    if (this.favoritePokemon.id === pokemonId) {
      this.favoritePokemon = {} as PokemonDetails;
    }
    this.resetFavoriteModal();
  }

  private getFavoritePokemon() {
    const favoritePokemon = this.favoritePokemonService.getFavoritePokemon();
    if (favoritePokemon) {
      this.favoritePokemon = favoritePokemon;
    } else {
      this.favoritePokemon = {} as PokemonDetails;
    }
  }
}

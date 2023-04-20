import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges} from "@angular/core";
import { PokemonDetails } from "../../models";
import { FavoritePokemonService } from "../../services";

@Component({
  selector: "app-poke-details",
  templateUrl: "./poke-details.component.html",
})
export class PokeDetailsComponent {
  @Input() pokemonDetails?: PokemonDetails;
  @Output() favoritePokeSelected = new EventEmitter<PokemonDetails>();
  public isFavorite: boolean = false;
  public isAddFavoriteDisabled: boolean = false;
  public favoriteRemoved: boolean = false;
  

  constructor(private elementRef:ElementRef , 
    private favoritePokemonService : FavoritePokemonService){this.favoritePokemonService.getResetFavorites().subscribe(() => {
      this.resetFavorite();
      });}

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  
  ngOnChanges() {
    this.resetFavorite();
    this.isAddFavoriteDisabled = false;
  }
  
  ngOnInit() {
    if (this.pokemonDetails) {
      this.isFavorite = this.favoritePokemonService.isFavoritePokemon(this.pokemonDetails.id.toString());
      this.isAddFavoriteDisabled = this.isFavorite;
    }
  }
  
  chooseFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite && this.pokemonDetails) {
      this.favoritePokemonService.setFavoritePokemon(this.pokemonDetails);
      this.favoritePokeSelected.emit(this.pokemonDetails);
      this.isAddFavoriteDisabled = true;
    } else {
      this.favoritePokemonService.removeFavoritePokemon(
        parseInt(this.pokemonDetails?.id.toString() || "")
      );
      this.isAddFavoriteDisabled = false;
    }
  }


  onAddFavorite( ){
    if (this.pokemonDetails) {
      this.favoritePokemonService.setFavoritePokemon(this.pokemonDetails);
      this.isFavorite = true;
      this.isAddFavoriteDisabled = true;
  }
  }

  resetFavorite() {
    this.isFavorite = false;
    this.isAddFavoriteDisabled = false
  }
}


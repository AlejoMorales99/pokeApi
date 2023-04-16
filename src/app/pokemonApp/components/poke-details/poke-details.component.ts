import { Component, Input, Output, EventEmitter, ElementRef, ViewChild} from "@angular/core";
import { PokemonDetails } from "../../models";

@Component({
  selector: "app-poke-details",
  templateUrl: "./poke-details.component.html",
  styleUrls: ["./poke-details.component.css"],
})
export class PokeDetailsComponent {
  @Input() pokemonDetails?: PokemonDetails;
  @Output() favoritePokeSelected = new EventEmitter<PokemonDetails>();
  isFavorite: boolean = false;
  isDisable: boolean = false;

  constructor(private elementRef:ElementRef ){}

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  chooseFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favoritePokeSelected.emit(this.pokemonDetails);
      this.isDisable = true;
    }
    console.log(this.favoritePokeSelected);
  }
}

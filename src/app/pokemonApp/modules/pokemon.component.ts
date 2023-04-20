import { Component, OnInit } from "@angular/core";
import { Pokemon, LetterCount } from "../models/index";
import { FiltroPipe } from "../pipes/filtro.pipe";
import { PokemonService } from "../services/pokemon.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-pokemon",
  templateUrl: "./pokemon.component.html",
})
export class PokemonComponent implements OnInit {
  pokemons: Pokemon[] = [];
  letterCounts: LetterCount[] = [];

  constructor(
    private filtroPipe: FiltroPipe,
    private pokemonService: PokemonService
  ) {}

  async ngOnInit() {
    this.pokemons = await firstValueFrom(this.pokemonService.getPokemons());
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    for (const letter of alphabet) {
      const filteredPokemons = this.filtroPipe.transform(this.pokemons, 1, letter) as Pokemon[];
      this.letterCounts.push({
        letter:letter,
        count: filteredPokemons.length,
      });
    }
    console.log(this.letterCounts);
  }
}

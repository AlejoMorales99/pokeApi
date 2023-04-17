import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FecthPokemon, Pokemon, PokemonDetails } from "../models";


@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private url: string = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http
      .get<FecthPokemon>(`${this.url}/pokemon?limit=1500`)
      .pipe(map(this.showAPokemon));
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    const pokeUrl = `${this.url}/pokemon/${name}`;

    return this.http.get<PokemonDetails>(pokeUrl).pipe(
      map((data) => ({
        ...data,
        pic: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      }))
    );
  }

  private showAPokemon(resp: FecthPokemon): Pokemon[] {
    const pokemonList: Pokemon[] = resp.results.map((poke) => {
      const urlArr = poke.url.split("/");
      const id = urlArr[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

      console.log(urlArr);

      return {
        id,
        pic,
        name: poke.name,
      };
    });

    return pokemonList;
  }
}

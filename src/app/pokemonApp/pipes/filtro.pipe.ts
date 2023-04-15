import { Pipe, PipeTransform } from "@angular/core";
import { Pokemon, LetterCount } from "../models/index";

@Pipe({
  name: "filtro",
})
export class FiltroPipe implements PipeTransform {
  transform(
    pokemons: Pokemon[],
    page: number = 1,
    search: string = ""
  ): Pokemon[] {
    let filteredPokemons = pokemons;
    if (search.length > 0) {
      filteredPokemons = pokemons.filter((poke) =>{
      const searchLetters = search.toLowerCase().split('');
      let currentIndex = -1;
      for (const letter of searchLetters) {
        currentIndex = poke.name.toLowerCase().indexOf(letter, currentIndex + 1);
        if (currentIndex === -1) {
          return false;
        }
      }
      return true;
    }
      );
    }

    const counts: { [letter: string]: number } = {};
  for (const pokemon of filteredPokemons) {
    const letters = pokemon.name.split('');
    for (const letter of letters) {
      const uppercaseLetter = letter.toUpperCase();
      counts[uppercaseLetter] = counts[uppercaseLetter] ? counts[uppercaseLetter] + 1 : 1;
    }
  }

    const letterCounts: LetterCount[] = Object.keys(counts)
      .map((letter) => ({
        letter,
        count: counts[letter],
      }))
      .sort((a, b) => a.letter.localeCompare(b.letter));
      
    const paginatedPokemons = filteredPokemons.slice((page - 1) * 5, page * 5);

    return paginatedPokemons && filteredPokemons;
  }
}

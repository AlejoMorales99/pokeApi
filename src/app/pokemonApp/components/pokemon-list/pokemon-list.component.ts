import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PokemonService } from '../../services/pokemon.service';
import { FormControl } from '@angular/forms';
import { Pokemon, PokemonDetails } from '../../models/index';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent implements OnInit {
  public pokemons: Pokemon[] = [];
  public page: number = 0;
  public search: string = '';
  public pokemonNotFound: boolean = false;
  public isFirstPage: boolean = true;
  public isLastPage: boolean = false;
  public selectedPokemon: PokemonDetails[]=[]; 


  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  filteredPokemons: Pokemon[] =[];
  filteredPokemon: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filteredPokemon(value))
      );
      this.updateFilteredPokemons();
    });
  }

  private updateFilteredPokemons() {
    const filterValue = this.search.toLowerCase();
    this.filteredPokemons = this.pokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(filterValue))

      const startIndex = this.page * 5; 
      this.filteredPokemons = this.filteredPokemons
      .slice(startIndex, startIndex + 5);
    this.isLastPage = startIndex + 5 >= this.filteredPokemons.length;
  }
  
  onSearchPokemon(search: string) {
    this.page = 0;
    this.search = search;
    this.updateFilteredPokemons();
    this.pokemonNotFound = this.filteredPokemons.length === 0; 
  }

  
  nextPage() {
    const startIndex = (this.page + 1) * 5;
    this.filteredPokemons = this.pokemons
      .filter(pokemon => pokemon.name.toLowerCase().includes(this.search.toLowerCase()))
      .slice(startIndex, startIndex + 5);
  
    this.isFirstPage = false;
    this.isLastPage = startIndex + 5 >= this.pokemons.length;
    this.page += 1;
  }

  prevPage() {
    if (this.page > 0) {
      const startIndex = (this.page - 1) * 5;
      this.filteredPokemons = this.pokemons
        .filter(pokemon => pokemon.name.toLowerCase().includes(this.search.toLowerCase()))
        .slice(startIndex, startIndex + 5);
  
      this.isFirstPage = this.page === 1;
      this.isLastPage = false;
      this.page -= 1;
    }
  }


  onSelectPokemon(poke: Pokemon): void {
    this.selectedPokemon = [];
    this.pokemonService.getPokemonDetails(poke.name).subscribe(
      details => {
        const pokemonDetails: PokemonDetails = {
          pic:details.pic,
          base_experience: details.base_experience,
          height: details.height,
          id: details.id,
          name: details.name,
          order: details.order,
          weight: details.weight,
          species: details.species,
          stats: details.stats,
          types: details.types
        };

        this.selectedPokemon.push(pokemonDetails);
        console.log('pick', pokemonDetails);
      },
      err => {
        console.error(err);
      }
    );
  }
}

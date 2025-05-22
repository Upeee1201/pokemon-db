import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemonByNumber(@Query('number') number: string) {
    // * try to parse the number to an integer
    // * if it fails, return a 400 error
    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber)) {
      return {
        statusCode: 400,
        message: 'Invalid pokedex number',
      };
    }

    const pokemon = await this.pokemonService.findByPokedexNumber(parsedNumber);
    return pokemon;
  }

  @Get('type')
  async getPokemonByType(@Query('type') type: string) {
    // * if type is not provided, return a 400 error
    if (!type) {
      return {
        statusCode: 400,
        message: 'Type is required',
      };
    }

    const pokemons = await this.pokemonService.findByType(type);
    return pokemons;
  }

  @Get('name')
  async getPokemonByName(@Query('name') name: string) {
    if (!name) {
      return {
        statusCode: 400,
        message: 'Name is required',
      };
    }

    const pokemons = await this.pokemonService.findByName(name);
    return pokemons;
  }
}

import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class PokemonService {
  async findByPokedexNumber(pokedexNumber: number) {
    // * i have a file in a folder called db/pokemon-db.csv
    // * i want to read the file and return the data as an array of objects

    // * read file
    try {
      const filePath = join(__dirname, '..', 'db', 'pokemon-db.csv');
      const fileContent = readFileSync(filePath, 'utf-8');

      // Split by lines and get headers from first line
      const lines = fileContent.split('\n');
      const headers = lines[0].split(',').map((header) => header.trim());

      // Skip the header line
      const dataLines = lines.slice(1);

      // Convert each line to a Pokémon object
      const pokemons: Record<string, string>[] = [];
      for (const line of dataLines) {
        const values = line.split(',').map((v) => v.trim());
        const pokemon: Record<string, string> = {};
        for (let i = 0; i < headers.length; i++) {
          pokemon[headers[i]] = values[i];
        }
        pokemons.push(pokemon);
      }

      // Find the Pokémon with the matching Pokédex number
      const pokemon = pokemons.find((p) => p['#'] === pokedexNumber.toString());

      return pokemon || null;
    } catch (error) {
      console.error('Error reading Pokemon data:', error);
      return null;
    }
  }

  async findByType(type: string) {
    try {
      const filePath = join(__dirname, '..', 'db', 'pokemon-db.csv');
      const fileContent = readFileSync(filePath, 'utf-8');

      const lines = fileContent.split('\n');
      const headers = lines[0].split(',').map((header) => header.trim());
      const dataLines = lines.slice(1);

      const pokemons: Record<string, string>[] = [];
      for (const line of dataLines) {
        const values = line.split(',').map((v) => v.trim());
        const pokemon: Record<string, string> = {};
        for (let i = 0; i < headers.length; i++) {
          pokemon[headers[i]] = values[i];
        }
        pokemons.push(pokemon);
      }

      // Filter Pokémon by type1 or type2 (case-insensitive)
      const filtered = pokemons.filter(
        (p) =>
          p['Type 1']?.toLowerCase() === type.toLowerCase() ||
          p['Type 2']?.toLowerCase() === type.toLowerCase(),
      );

      return filtered;
    } catch (error) {
      console.error('Error reading Pokemon data:', error);
      return [];
    }
  }
}

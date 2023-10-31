import {useEffect, useState} from 'react';
import axios from 'axios';

type ItemType = {
  name: string;
  url: string;
  seen: boolean; // Agregar la propiedad "seen" al tipo ItemType
};

const usePokemonList = () => {
  const [pokemonlist, setPokemonList] = useState<ItemType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<ItemType[]>([]);

  // obtener la lista de pokemon
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      .then(response => {
        const data: ItemType[] = response.data.results.map(
          (item: ItemType) => ({
            ...item,
            seen: false,
          }),
        );

        setPokemonList(data);
      });
  }, []);

  // función para buscar pokemon
  const searchItem = (text: string) => {
    setSearchText(text);

    const query = text.toLowerCase();

    const filterData = pokemonlist.filter((item): item is ItemType => {
      const title = item.name.toLowerCase();
      return title.includes(query);
    });

    setFilteredData(filterData);
  };

  // función para marcar pokemon como visto
  const markPokemonAsSeen = (pokemon: ItemType) => {
    setPokemonList(prevList => {
      const updatedList = prevList.map(item => {
        if (item.name === pokemon.name) {
          return {...item, seen: true};
        }
        return item;
      });
      return updatedList;
    });
  };

  return {pokemonlist, searchText, filteredData, searchItem, markPokemonAsSeen};
};

export default usePokemonList;

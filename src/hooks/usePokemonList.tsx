import {useEffect, useState} from 'react';
import axios from 'axios';

type ItemType = {
  name: string;
  url: string;
};

const usePokemonList = () => {
  const [pokemonlist, setPokemonList] = useState<ItemType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<ItemType[]>([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      .then(response => {
        setPokemonList(response.data.results);
      });
  }, []);

  const searchItem = (text: string) => {
    setSearchText(text);

    const query = text.toLowerCase();

    const filterData = pokemonlist.filter((item): item is ItemType => {
      const title = item.name.toLowerCase();
      return title.includes(query);
    });

    setFilteredData(filterData);
  };

  return {pokemonlist, searchText, filteredData, searchItem};
};

export default usePokemonList;

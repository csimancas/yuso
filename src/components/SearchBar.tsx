import React from 'react';
import {Searchbar} from 'react-native-paper';

interface SearchBarProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
}

const SearchBar = ({searchQuery, onChangeSearch}: SearchBarProps) => {
  return (
    <Searchbar
      placeholder="Buscar"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBar;

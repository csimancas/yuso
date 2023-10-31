import React from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import SearchBar from './SearchBar';
import usePokemonList from '../hooks/usePokemonList';
import {useNavigation} from '@react-navigation/native';

const PokemonList = () => {
  const {pokemonlist, searchText, filteredData, searchItem} = usePokemonList();
  const navigation: any = useNavigation();

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ClientDetail', {item})}
        style={styles.renderItem}>
        <Text style={styles.item}>
          <Text style={styles.title}>{item.name.toUpperCase()}</Text>
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchBar
          searchQuery={searchText}
          onChangeSearch={text => searchItem(text)}
        />

        <FlatList
          style={styles.flatList}
          data={filteredData.length === 0 ? pokemonlist : filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.url}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  flatList: {
    marginTop: 10,
  },
  renderItem: {
    backgroundColor: '#f1f1f1',
    paddingBottom: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PokemonList;

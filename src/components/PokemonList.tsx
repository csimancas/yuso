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
import Arrow from '../assets/arrow';
import usePokemonList from '../hooks/usePokemonList';
import {useNavigation} from '@react-navigation/native';

const PokemonList = () => {
  // Obtener los datos del hook usePokemonList
  const {pokemonlist, searchText, filteredData, searchItem, markPokemonAsSeen} =
    usePokemonList();

  const navigation: any = useNavigation();

  // función para manejar el evento onPress de un item para navegar a la pantalla de detalle y marcar el pokemon como visto
  const handleItemPress = (item: any) => {
    markPokemonAsSeen(item);
    navigation.navigate('ClientDetail', {item});
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={[
          styles.renderItem,
          {
            backgroundColor: item.seen ? '#1f722b' : '#3355ff',
          },
        ]}>
        <Text style={styles.title}>{item.name.toUpperCase()}</Text>
        <Arrow />
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
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  flatList: {
    marginTop: 10,
  },
  renderItem: {
    height: 80,
    borderRadius: 10,
    // justifyContent: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
});

export default PokemonList;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import PokemonList from '../components/PokemonList';

const Home = () => {
  return (
    <View style={styles.container}>
      <PokemonList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
});

export default Home;

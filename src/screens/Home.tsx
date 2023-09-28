import React from 'react';
import {View, StyleSheet} from 'react-native';
import ClientList from '../components/ClientList';

const Home = () => {
  return (
    <View style={styles.container}>
      <ClientList />
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

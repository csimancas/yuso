import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';

import useClientList from '../hooks/useClientList';

import {useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ClientForm from './ClientForm';
import ContentItem from './ContentItem';
import FloatingButton from './FloatingButton';
import SearchBar from './SearchBar';

const ClientList = () => {
  const {data, searchText, searchItem} = useClientList();
  const navigation: any = useNavigation();

  const [visibleEntry, setVisibleEntry] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchBar
          searchQuery={searchText}
          onChangeSearch={text => searchItem(text)}
        />
        <ClientForm
          visible={visibleEntry}
          onClose={() => setVisibleEntry(false)}
        />
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <ContentItem
                data={item}
                action={() => {
                  navigation.navigate('ClientDetail', {item});
                }}
              />
            );
          }}
          keyExtractor={item => item.Oid}
        />
        <FloatingButton action={() => setVisibleEntry(true)} />
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
});

export default ClientList;

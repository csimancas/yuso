import React, {useState} from 'react';
import {Image, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import useClientList from '../hooks/useClientList';
import DetailModal from './DetailModal';
import EntryForm from './EntryForm';
import FloatingButton from './FloatingButton';
import SearchBar from './SearchBar';
import ContentItem from './ContentItem';

interface contentType {
  img: string;
  fullName: string;
  email: string;
  phone: string;
}

const ClientList = () => {
  const {
    data,
    searchText,
    searchItem,
    filteredData,
    selectedClient,
    setSelectedClient,
  } = useClientList();

  const [visible, setVisible] = useState(false);
  const [visibleEntry, setVisibleEntry] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        searchQuery={searchText}
        onChangeSearch={text => searchItem(text)}
      />
      <DetailModal
        visible={visible}
        item={selectedClient}
        onClose={() => setVisible(false)}
      />
      <EntryForm
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
                setVisible(true);
                setSelectedClient(item);
              }}
            />
          );
        }}
        keyExtractor={item => item._id}
      />
      <FloatingButton action={() => setVisibleEntry(true)} />
    </SafeAreaView>
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

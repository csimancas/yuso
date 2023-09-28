import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Header from './Header';

interface ContentType {
  item: {
    img: string;
    fullName: string;
    email: string;
    phone: string;
  };
  onClose: () => void;
}

const DetailModal = ({item, onClose}: ContentType) => {
  console.log(item.img);
  return (
    <>
      <Header
        isBack={true}
        title={'Detalle de cliente'}
        onBack={() => onClose()}
      />
      <SafeAreaProvider style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar.Image size={130} source={{uri: item?.img}} />
        </View>
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" />
        </Card>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  modalView: {
    height: 300,
    width: '100%',
  },
  item: {
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default DetailModal;

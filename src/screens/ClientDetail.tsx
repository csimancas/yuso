import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Card, Button} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';

interface ContentType {
  item: {
    Image: string;
    FullName: string;
    Email: string;
    Phone: string;
  };
}

const ClientDetail = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {item} = route.params as {item: ContentType['item']};

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar.Image
            size={130}
            source={
              item.Image
                ? {uri: item.Image}
                : require('../assets/noUserImage.png')
            }
          />
        </View>
        <Card>
          <Card.Title title={item.Email} subtitle={item.Phone} />
        </Card>
        <Card.Actions>
          <Button
            onPress={() => {
              navigation.goBack();
            }}>
            Regresar
          </Button>
        </Card.Actions>
      </View>
    </SafeAreaProvider>
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

export default ClientDetail;

import React from 'react';
import {View, Linking, StyleSheet} from 'react-native';
import {Avatar, Card, Button, Text, Chip} from 'react-native-paper';
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
            size={110}
            source={
              item.Image
                ? {uri: item.Image}
                : require('../assets/noUserImage.png')
            }
          />
        </View>
        <Card>
          <Card.Content>
            <View>
              <Text style={styles.title}>{item.FullName}</Text>
            </View>
            <View style={styles.chipContainer}>
              <Chip icon="email" style={styles.chip}>
                {item.Email ? item.Email : 'Sin informacion'}
              </Chip>
              <Chip
                icon="phone"
                style={styles.chip}
                onPress={() => Linking.openURL(`tel:${item.Phone}`)}>
                {item.Phone ? item.Phone : 'Sin informacion'}
              </Chip>
            </View>
          </Card.Content>
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
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    marginVertical: 5,
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
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ClientDetail;

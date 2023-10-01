import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getJWT} from '../utils';

const Splash = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      await getJWT().then(data => {
        const parsedData = JSON.parse(data);
        if (parsedData.status === 200) {
          setTimeout(() => {
            navigation.replace('Home');
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.navigate('LogIn');
          }, 2000);
        }
      });
    };
    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/genericLogo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>YusoApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Splash;

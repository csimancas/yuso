import React, {useState} from 'react';
import {Alert, View, StyleSheet, Image} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {storeJWT} from '../utils';
import axios from 'axios';

const LogIn = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('Admin');
  const [password, setPassword] = useState('secreto');

  const tryLoguin = async () => {
    await axios
      .post('https://api.yuso.mx:8443/api/Authentication/Authenticate', {
        userName: email,
        password: password,
      })
      .then(response => {
        if (response.status !== 200) {
          Alert.alert('Error', 'Usuario o contraseña incorrectos');
        } else {
          const obj = {
            token: response.data,
            status: response.status,
          };
          const jsonValue = JSON.stringify(obj);
          storeJWT(jsonValue);
          navigation.replace('Home');
        }
      })
      .catch(error => {
        if (error.response) {
          Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.styleTitle}>
        <Image
          source={require('../assets/genericLogo.png')}
          style={styles.img}
        />
        <Text variant="displaySmall">YusoApp</Text>

        <View style={styles.textInputs}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label="Contraseña"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            tryLoguin();
            // navigation.replace('Home');
          }}>
          Ingresar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  styleTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  input: {
    marginTop: 10,
  },
  textInputs: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
});

export default LogIn;

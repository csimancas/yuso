import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LogIn = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 50,
        }}>
        <Image
          source={{uri: 'https://picsum.photos/200/300'}}
          style={styles.img}
        />
        <Text
          variant="displaySmall"
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}>
          Bienvenido YusoApp
        </Text>

        <View
          style={{
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={{
              marginTop: 10,
            }}
            label="Contraseña"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <Button
          style={{
            width: '100%',
            marginTop: 20,
          }}
          mode="contained"
          onPress={() => navigation.replace('Home')}>
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
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
});

export default LogIn;

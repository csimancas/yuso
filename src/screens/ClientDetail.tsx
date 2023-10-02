import React, {useState, useContext} from 'react';
import {Context as ClientsContext} from '../context/clientsContext';
import {View, Linking, StyleSheet, Alert, ScrollView} from 'react-native';
import {Avatar, Card, Button, Text, Chip, TextInput} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

interface ContentType {
  item: {
    Photo: string;
    Oid: string;
    Image: string;
    FullName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
  };
}

const ClientDetail = () => {
  const navigation: any = useNavigation();
  const {editEntry, deleteEntry} = useContext(ClientsContext);
  const route = useRoute();
  const {item} = route.params as {item: ContentType['item']};
  const [showForm, setShowForm] = useState(false);

  console.log(item.Oid);
  return (
    <ScrollView>
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
          <Text style={styles.textInformation}>Información de contacto</Text>
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
            <Button onPress={() => setShowForm(!showForm)}>Editar</Button>
            <Button
              onPress={() =>
                Alert.alert(
                  '',
                  '¿Estas seguro que desea eliminar al usuario?',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Si, eliminar',
                      onPress: async () => {
                        await deleteEntry(item.Oid);
                        navigation.goBack();
                      },
                    },
                  ],
                )
              }>
              Eliminar
            </Button>
          </Card.Actions>
        </View>
        {showForm && (
          <View style={styles.modalView}>
            <Formik
              initialValues={{
                name: item.FirstName,
                lastName: item.LastName,
                birthDay: new Date(),
                email: item.Email,
                phone: item.Phone,
              }}
              onSubmit={async values => {
                await editEntry(
                  item.Image,
                  values.name,
                  values.lastName,
                  values.birthDay,
                  values.email,
                  values.phone,
                  item.Oid,
                );
                navigation.goBack();
              }}>
              {({handleChange, handleSubmit, values}) => (
                <View style={styles.inputsView}>
                  <TextInput
                    style={styles.input}
                    label="Nombre"
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  <TextInput
                    label="Apeido"
                    style={styles.input}
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                  />
                  <TextInput
                    label="Email"
                    style={styles.input}
                    value={values.email}
                    onChangeText={handleChange('email')}
                  />

                  <TextInput
                    style={styles.input}
                    label="Telefono"
                    value={values.phone}
                    maxLength={10}
                    onChangeText={handleChange('phone')}
                  />

                  <View style={styles.buttons}>
                    <Button
                      mode="contained"
                      onPress={() => {
                        setShowForm(false);
                      }}>
                      Cancelar
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => {
                        handleSubmit();
                      }}>
                      Editar Cliente
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        )}
      </SafeAreaProvider>
    </ScrollView>
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

  modalView: {},
  item: {
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
  },
  textInformation: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  styleButton: {
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsView: {
    marginVertical: 20,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ClientDetail;

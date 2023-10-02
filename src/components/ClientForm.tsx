import {Formik} from 'formik';
import React, {useContext} from 'react';
import {Alert, Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import {Context as EntriesContext} from '../context/clientsContext';
import Header from './Header';

interface EntryFormProps {
  visible: boolean;
  onClose: () => void;
}

const ClientForm = ({visible, onClose}: EntryFormProps) => {
  const {addEntry} = useContext(EntriesContext);
  const [selectedImage, setSelectedImage] = React.useState<string | null>();

  const openImagePicker = () => {
    type optionsType = {
      mediaType: 'photo';
      includeBase64: boolean;
      maxHeight: number;
      maxWidth: number;
    };
    const options: optionsType = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <Header
        isBack={true}
        onBack={() => onClose()}
        title="Agregar nuevo cliente"
      />
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.container}>
          <View>
            <Formik
              initialValues={{
                name: '',
                lastName: '',
                birthDay: new Date(),
                email: '',
                phone: '',
              }}
              onSubmit={values => {
                if (
                  values.name === '' ||
                  values.lastName === '' ||
                  values.email === '' ||
                  values.phone === ''
                ) {
                  Alert.alert('Error', 'Todos los campos son requeridos');
                } else {
                  addEntry(
                    selectedImage,
                    values.name,
                    values.lastName,
                    values.birthDay,
                    values.email,
                    values.phone,
                  );
                  onClose();
                }
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

                  {selectedImage && (
                    <Image source={{uri: selectedImage}} style={styles.image} />
                  )}

                  <View style={styles.buttons}>
                    <Button
                      style={styles.styleButton}
                      mode="contained"
                      onPress={() => openImagePicker()}>
                      Agregar imagen
                    </Button>
                    <Button
                      style={styles.styleButton}
                      mode="contained"
                      onPress={() => {
                        handleSubmit();
                      }}>
                      Agregar Cliente
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
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

export default ClientForm;

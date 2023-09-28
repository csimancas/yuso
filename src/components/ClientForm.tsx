import {Formik} from 'formik';
import React, {useContext} from 'react';
import {Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Text, TextInput} from 'react-native-paper';
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
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
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
          <Text variant="displaySmall" style={styles.header}>
            Agregar nuevo cliente
          </Text>
          <View>
            <Formik
              initialValues={{
                name: '',
                lastName: '',
                email: '',
                phone: '',
              }}
              onSubmit={values => {
                const fullName = `${values.name} ${values.lastName}}`;
                addEntry(fullName, values.email, values.phone, selectedImage);
                onClose();
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
                    multiline={true}
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
                    onChangeText={handleChange('phone')}
                  />
                  {selectedImage && (
                    <Image
                      source={{uri: selectedImage}}
                      style={{width: 100, height: 100, borderRadius: 15}}
                    />
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

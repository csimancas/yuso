import React, {useContext} from 'react';
import {ScrollView, Modal, View, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {Formik} from 'formik';
import {Context as EntriesContext} from '../context/clientsContext';

interface EntryFormProps {
  visible: boolean;
  onClose: () => void;
}

const EntryForm = ({visible, onClose}: EntryFormProps) => {
  const {addEntry} = useContext(EntriesContext);
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={styles.container}>
          <Text variant="displaySmall" style={styles.header}>
            Agrega una nueva entrada en el blog.
          </Text>
          <View>
            <Formik
              initialValues={{
                title: '',
                content: '',
                author: '',
                date: new Date().toLocaleString(),
              }}
              onSubmit={values => {
                addEntry(values.title, values.content, values.author);
                onClose();
              }}>
              {({handleChange, handleSubmit, values}) => (
                <View style={styles.inputsView}>
                  <TextInput
                    style={styles.input}
                    label="Titulo"
                    value={values.title}
                    onChangeText={handleChange('title')}
                  />
                  <TextInput
                    label="Contenido"
                    style={styles.input}
                    multiline={true}
                    value={values.content}
                    onChangeText={handleChange('content')}
                  />
                  <TextInput
                    label="Autor"
                    style={styles.input}
                    value={values.author}
                    onChangeText={handleChange('author')}
                  />
                  <TextInput
                    style={styles.input}
                    label="Fecha"
                    value={new Date().toLocaleString()}
                    disabled={true}
                  />

                  <View style={styles.buttons}>
                    <Button
                      style={styles.styleButton}
                      mode="contained"
                      onPress={() => onClose()}>
                      Regresar
                    </Button>
                    <Button
                      style={styles.styleButton}
                      mode="contained"
                      onPress={() => {
                        handleSubmit();
                      }}>
                      Agregar entrada
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

export default EntryForm;

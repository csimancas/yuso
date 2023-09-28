import React from 'react';
import {Divider, Text} from 'react-native-paper';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface contentType {
  data: {
    img: string;
    fullName: string;
    email: string;
    phone: string;
  };
  action: () => void;
}

const ContentItem = ({data, action}: contentType) => {
  return (
    <TouchableOpacity onPress={action}>
      <View key={data.fullName} style={styles.container}>
        <Image source={{uri: data.img}} style={styles.image} />
        <View style={styles.dataContent}>
          <Text style={styles.title}>{data.fullName}</Text>
          <Text>{data.email}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  dataContent: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#000',
    height: 1,
    width: '100%',
    marginTop: 5,
  },
});

export default ContentItem;

import React from 'react';
import {Divider, Text} from 'react-native-paper';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { readAndDecodeImage } from '../utils';

interface contentType {
  data: {
    Image: string;
    FullName: string;
    Email: string;
    Phone: string;
  };
  action: () => void;
}

const ContentItem = ({data, action}: contentType) => {
  return (
    <TouchableOpacity onPress={action}>
      <View key={data.FullName} style={styles.container}>
        <Image
          source={
            data?.Image
              ? {uri: data.Image}
              : require('../assets/noUserImage.png')
          }
          style={styles.image}
        />
        <View style={styles.dataContent}>
          <Text style={styles.title}>{data.FullName}</Text>
          <Text>{data.Email}</Text>
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

import React from 'react';
import {Divider, Text} from 'react-native-paper';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

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
      <View style={styles.container}>
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
          <Text>{data.Phone ? data.Phone : 'Sin informacion'}</Text>
        </View>

        <Text
          style={{
            marginLeft: 'auto',
          }}>
          {data.Email ? data.Email : 'Sin informacion'}
        </Text>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenlyP
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  dataContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    backgroundColor: '#b5b5b5',
    height: 1,
    width: '100%',
    marginTop: 5,
  },
});

export default ContentItem;

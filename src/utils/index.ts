import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const storeJWT = async (jwt: string) => {
  try {
    await AsyncStorage.setItem('jwt', jwt);
  } catch (error) {
    console.log(error);
  }
};

export const getJWT = async () => {
  try {
    const jwt = await AsyncStorage.getItem('jwt');
    return jwt;
  } catch (error) {
    console.log(error);
  }
};

export const convertImageToBase64 = async (imagePath: string) => {
  try {
    const imageContent = await RNFS.readFile(imagePath, 'base64');
    return imageContent;
  } catch (error) {
    console.error('Error al convertir la imagen a Base64:', error);
    throw error;
  }
};

export const readAndDecodeImage = async (imagePath: string) => {
  try {
    const imageData = await RNFS.readFile(imagePath, 'base64');

    return imageData;
  } catch (error) {
    throw error;
  }
};

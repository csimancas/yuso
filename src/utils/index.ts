import AsyncStorage from '@react-native-async-storage/async-storage';

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

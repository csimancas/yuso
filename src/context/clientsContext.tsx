import axios from 'axios';
import CreateDataContext from './createDataContext';
import {convertImageToBase64} from '../utils';
import {Alert} from 'react-native';

import {getJWT} from '../utils';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'get_entries':
      return {
        data: action.payload,
        isLoaded: true,
      };
    case 'add_entry':
      return {
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};

const getEntries = (dispatch: any) => {
  return async () => {
    await getJWT().then(data => {
      const parsedData = JSON.parse(data);
      const config = {
        headers: {
          Authorization: `Bearer ${parsedData.token}`,
        },
      };
      axios
        .get('https://api.yuso.mx:8443/api/odata/Customer', config)
        .then(response => {
          const isLoaded = true;
          dispatch({
            type: 'get_entries',
            payload: response.data.value,
            isLoaded,
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    });
  };
};

const addEntry = (dispatch: any) => {
  return async (
    img: any,
    firstName: string,
    lastName: string,
    birthDay: Date,
    email: string,
    phone: string,
  ) => {
    const jwt = await getJWT();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    convertImageToBase64(img).then(response => {
      axios
        .post(
          'https://api.yuso.mx:8443/api/odata/Customer',
          {
            Photo: response ? response : null,
            Birthday: '2023-09-29T17:28:36.793-06:00',
            FirstName: firstName,
            LastName: lastName,
            MiddleName: '',
            Email: email,
            Phone: phone,
          },
          config,
        )
        .then(
          res => {
            dispatch({type: 'add_entry', payload: res.data});
          },
          error => {
            console.log(error.message);
          },
        );
    });
  };
};

export const {Context, Provider} = CreateDataContext(
  reducer,
  {
    getEntries,
    addEntry,
  },
  {
    data: [],
    isLoaded: false,
  },
);

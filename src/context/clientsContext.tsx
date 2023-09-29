import CreateDataContext from './createDataContext';
import axios from 'axios';

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
    const jwt = await getJWT();

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    axios
      .get('https://api.yuso.mx:8443/api/odata/Customer', config)
      .then(response => {
        const isLoaded = true;
        dispatch({type: 'get_entries', payload: response.data, isLoaded});
      })
      .catch(error => {
        console.log(error);
      });
  };
};

const addEntry = (dispatch: any) => {
  return async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    img: any,
  ) => {
    const entryObj = {
      Photo: img,
      FirstName: firstName,
      LastName: lastName,
      BirthDay: '2021-05-05T00:00:00',
      Email: email,
      Phone: phone,
    };

    console.log(entryObj);
    // const jwt = await getJWT();
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // };
    // axios
    //   .post('https://api.yuso.mx:8443/api/odata/Customer', entryObj, config)
    //   .then(
    //     response => {
    //       console.log(response);
    //       dispatch({type: 'add_entry', payload: entryObj});
    //     },
    //     error => {
    //       console.log(error);
    //     },
    //   );
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

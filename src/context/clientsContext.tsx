import CreateDataContext from './createDataContext';
import axios from 'axios';
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

    case 'edit_entry':
      return {
        ...state,
        data: state.data.map(item => {
          if (item.Oid === action.payload.Oid) {
            return action.payload;
          }
          return item;
        }),
      };
    case 'delete_entry':
      return {
        ...state,
        data: state.data.filter((item: any) => item.Oid !== action.payload),
      };

    default:
      return state;
  }
};

const getEntries = (dispatch: any) => {
  return async () => {
    axios
      .get('pokemon?limit=100&offset=0')
      .then(response => {
        const isLoaded = true;
        console.log(response);
        // dispatch({
        //   type: 'get_entries',
        //   payload: response.data.results,
        //   isLoaded,
        // });
      })
      .catch(error => {
        console.log(error.message);
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
    const parsedData = JSON.parse(jwt || '{}');
    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.token}`,
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

const editEntry = (dispatch: any) => {
  return async (
    img: any,
    firstName: string,
    lastName: string,
    birthDay: Date,
    email: string,
    phone: string,
    Oid: string,
  ) => {
    const jwt = await getJWT();
    const parsedData = JSON.parse(jwt || '{}');
    const config = {
      headers: {
        Authorization: `Bearer ${parsedData.token}`,
      },
    };

    await axios
      .put(
        `https://api.yuso.mx:8443/api/odata/Customer(${Oid})`,
        {
          Photo: img ? img : null,
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
          const obj = {
            Phone: phone,
            Email: email,
            Photo: img,

            FirstName: firstName,
            LastName: lastName,
            Oid: Oid,
            FullName: `${firstName} ${lastName}`,
          };
          dispatch({
            type: 'edit_entry',
            payload: obj,
          });
        },
        error => {
          console.log(error);
        },
      );
  };
};

export const {Context, Provider} = CreateDataContext(
  reducer,
  {
    getEntries,
    addEntry,
    editEntry,
  },
  {
    data: [],
    isLoaded: false,
  },
);

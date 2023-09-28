import CreateDataContext from './createDataContext';
import axios from 'axios';
import {GET_ENTRIES, CREATE_ENTRY} from '../api';
import {clients} from '../api/index';

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
    console.log(clients);
    try {
      const isLoaded = true;
      dispatch({type: 'get_entries', payload: clients, isLoaded});
    } catch (error) {
      console.log(error);
    }
  };
};

const addEntry = (dispatch: any) => {
  return async (fullName: string, email: string, phone: string, img: any) => {
    const entryObj = {
      fullName,
      email,
      phone,
      img,
    };

    try {
      dispatch({type: 'add_entry', payload: entryObj});
    } catch (error) {
      console.log(error);
    }
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

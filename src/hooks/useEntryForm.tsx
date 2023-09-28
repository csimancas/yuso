import axios from 'axios';
import {CREATE_ENTRY} from '../api';

interface Entry {
  author: string;
  title: string;
  content: string;
  date: string;
}

const useEntryForm = () => {
  const createEntry = (entry: Entry) => {
    axios
      .post(CREATE_ENTRY, {
        title: entry.title,
        author: entry.author,
        content: entry.content,
        date: entry.date,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return {
    createEntry,
  };
};

export default useEntryForm;

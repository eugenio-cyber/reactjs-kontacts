import axios from 'axios';

export default axios.create({
  baseURL: 'https://contacts-api-cubos.herokuapp.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

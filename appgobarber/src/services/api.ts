import axios from 'axios';

const api = axios.create({
  baseURL: 'http://npinfo.ddns.net:3333',
});

export default api;

// adapted from https://gist.github.com/Descartess/6f1356428e0549df33950fb42a561ce9#file-axiosconfig-js

import axios from 'axios';
import { ROOT_URL } from '../../config'

// configure base url
const instance = axios.create({
  baseURL: ROOT_URL,
});

// intercept requests and add authorization token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

export default instance;
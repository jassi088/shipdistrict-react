import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';
import { Constants } from '@/constants';

const instance = axios.create({
  baseURL: Constants.HOST + Constants.API_VERSION,
  timeout: 20000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default setupInterceptorsTo(instance);

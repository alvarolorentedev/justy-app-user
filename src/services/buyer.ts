import axios from 'axios';
import Base64 from 'Base64';
import ENV from '../utils/constants';
import { SimpleResponse } from '../types/SimpleResponse';

const settings = {
  headers: {
    Authorization: `Basic ${Base64.btoa(
      `${ENV.SERVER_USERNAME}:${ENV.SERVER_PASSWORD}`
    )}`,
  },
};

export const createBuyer = async (email: string, password: string): Promise<SimpleResponse> => {
    throw Error("Not Implemented");
};

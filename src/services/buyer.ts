import axios from 'axios';
import Base64 from 'Base64';
import ENV from '../utils/constants';
import { SimpleResponse } from '../types/SimpleResponse';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import createBuyerMutation from './mutations/createBuyer.graphql';
/* eslint-enable @typescript-eslint/ban-ts-comment */
import { GraphQlResponse } from '../types/GraphQlResponse';
import { CreateBuyerResponse } from '../types/CreateBuyerResponse';

const settings = {
  headers: {
    Authorization: `Basic ${Base64.btoa(
      `${ENV.SERVER_USERNAME}:${ENV.SERVER_PASSWORD}`
    )}`,
  },
};

/* eslint-disable-next-line import/prefer-default-export */
export const createBuyer = async (
  email: string,
  password: string
): Promise<SimpleResponse> => {
  return (
    await axios.post<GraphQlResponse<CreateBuyerResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: createBuyerMutation,
        variables: {
          email,
          password,
        },
      },
      settings
    )
  ).data.data.createBuyer;
};

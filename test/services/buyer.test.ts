import fs from 'fs';
import * as faker from 'faker';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as BuyerService from '../../src/services/buyer';
import ENV from '../../src/utils/constants';

describe('Game Service', () => {
  describe('action to create new buyer', () => {
    const createBuyerMutation = fs.readFileSync(
      `${__dirname}/../../src/services/mutations/createBuyer.graphql`,
      'ascii'
    );

    it('should call the backend to create a new buyer', async () => {
      const mock = new MockAdapter(axios);
      const email = faker.random.uuid();
      const password = faker.random.uuid();
      mock
        .onPost(`${ENV.SERVER_URL}/graphql`, {
          query: createBuyerMutation,
          variables: {
            email,
            password,
          },
        })
        .replyOnce(200, { data: { createBuyer: { success: true } } });

      const result = await BuyerService.createBuyer(email, password);

      expect(result).toEqual({ success: true });
    });
  });
});

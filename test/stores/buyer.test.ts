import * as faker from 'faker';
import { createBuyer } from '../../src/services/buyer';
import BuyerStore from '../../src/stores/buyer';
import { SimpleResponse } from '../../src/types/simpleResponse';

jest.mock('../../src/services/buyer', () => ({
  __esModule: true,
  createBuyer: jest.fn(),
}));

describe('Buyer Store', () => {
  const buyer = new BuyerStore();

  beforeEach(() => {
    buyer.error = undefined;
  });

  describe('has action for create account', () => {

    const email: string = faker.random.uuid();
    const password: string = faker.random.uuid();

    it('should return if success creating accout', async () => {

      (createBuyer as jest.Mock<Promise<SimpleResponse>>).mockReturnValue(
        Promise.resolve({ success: true })
      );

      await buyer.create(email, password);

      expect(createBuyer).toHaveBeenCalledWith(email, password);
    });

    it('should have error if not success on creation', async () => {
      (createBuyer as jest.Mock<Promise<SimpleResponse>>).mockReturnValue(
        Promise.resolve({ success: false })
      );

      await buyer.create(email, password);

      expect(createBuyer).toHaveBeenCalledWith(email, password);
      expect(buyer.error).toEqual('Unable to create accout');
    });

    it('should have error if server error', async () => {
      (createBuyer as jest.Mock<Promise<SimpleResponse>>).mockReturnValue(
        Promise.reject(new Error('server failed'))
      );

      await buyer.create(email, password);

      expect(createBuyer).toHaveBeenCalledWith(email, password);
      expect(buyer.error).toEqual('server failed');
    });
  });
});

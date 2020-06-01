import * as React from 'react';
import { shallow } from 'enzyme';
import * as faker from 'faker';
import { Home } from '../../src/views/home';

const waitMiliseconds = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

const mockBuyerStore = {
  create: jest.fn(),
  error: undefined,
};

describe('<Home />', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const expectedPassword: string = faker.internet.password();
  const expectedEmail: string = faker.internet.email();

  beforeEach(() => {
    mockBuyerStore.error = undefined;
    navigation.navigate.mockClear();
    mockBuyerStore.create.mockClear();
  });

  describe('create user flow', () => {
    const wrapper = shallow(
      <Home navigation={navigation} buyerStore={mockBuyerStore} />
    );

    beforeAll(() => {
      const buyerEmailInput = wrapper.find('[data-testid="buyer-email-input"]');
      const buyerPasswordInput = wrapper.find(
        '[data-testid="buyer-password-input"]'
      );
      buyerEmailInput.prop('onChangeText')(expectedEmail);
      buyerPasswordInput.prop('onChangeText')(expectedPassword);
      wrapper.update();
    });

    test('should have button with create user text', () => {
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      expect(createButton.exists()).toBeTruthy();
      expect(createButton.contains('Create User')).toBeTruthy();
    });

    test('should create a user when clicked and navigate', async () => {
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      mockBuyerStore.error = undefined;
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(mockBuyerStore.create).toHaveBeenCalledWith(
        expectedEmail,
        expectedPassword
      );
      expect(navigation.navigate).toHaveBeenCalledWith('Search');
    });

    test('should not navigate if there is an error', async () => {
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      mockBuyerStore.error = faker.random.uuid();
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(navigation.navigate).not.toHaveBeenCalledWith('Search');
    });
  });

  describe.skip('button submit enable/disable state', () => {
    const wrapper = shallow(
      <Home navigation={navigation} buyerStore={mockBuyerStore} />
    );

    test('should be disable by default', () => {
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });

    test('should be enable when mandatory fields are set', async () => {
      const buyerEmailInput = wrapper.find('[data-testid="buyer-email-input"]');
      buyerEmailInput.prop('onChangeText')(expectedEmail);
      wrapper.update();
      const buyerPasswordInput = wrapper.find(
        '[data-testid="buyer-password-input"]'
      );
      buyerPasswordInput.prop('onChangeText')(expectedPassword);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      expect(createButton.prop('disabled')).toBeFalsy();
    });

    test('should be disable when email mandatory fields is unset', () => {
      const buyerEmailInput = wrapper.find('[data-testid="buyer-email-input"]');
      buyerEmailInput.prop('onChangeText')(undefined);
      wrapper.update();
      const buyerPasswordInput = wrapper.find(
        '[data-testid="buyer-password-input"]'
      );
      buyerPasswordInput.prop('onChangeText')(expectedPassword);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });

    test('should be disable when password mandatory fields is unset', () => {
      const buyerEmailInput = wrapper.find('[data-testid="buyer-email-input"]');
      buyerEmailInput.prop('onChangeText')(expectedEmail);
      wrapper.update();
      const buyerPasswordInput = wrapper.find(
        '[data-testid="buyer-password-input"]'
      );
      buyerPasswordInput.prop('onChangeText')(undefined);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="buyer-create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });
  });
});

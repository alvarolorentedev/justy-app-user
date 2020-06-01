import { observable, action } from 'mobx';
import { createBuyer } from '../services/buyer';

export default class BuyerStore {
  @observable
  public error: string;

  @action
  create = async (email: string, password: string): Promise<void> => {
    try {
      const result = await createBuyer(email, password);
      if (result.success) {
        this.error = undefined;
      } else throw new Error('Unable to create accout');
    } catch (error) {
      this.error = error.message;
    }
  };
}

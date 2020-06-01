import { observable, action } from 'mobx';

export default class BuyerStore {
  @observable
  public error: string;

  @action
  create = async (email: string, password: string): Promise<void> => {
    throw Error('Not Implemented');
  };
}

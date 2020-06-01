import React from 'react';
import BuyerStore from './buyer';

/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Store = {
  buyerStore: BuyerStore;
};

export const storesContext = React.createContext<Store>({
  buyerStore: new BuyerStore(),
});

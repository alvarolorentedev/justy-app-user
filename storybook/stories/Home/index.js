import React from 'react';

import { storiesOf } from '@storybook/react-native';
import NativeBaseWrapper from '../NativeBaseWrapper';

import Home from '../../../src/views/home';

const buyer = {
}

const baseBuyerStore = {create: () => {}, ...buyer } 
const basenavigation = { navigate: () => {} }

storiesOf('Home', module)
.addDecorator(getStory => <NativeBaseWrapper>{getStory()}</NativeBaseWrapper>)
.add('Home', () => <Home navigation={basenavigation} buyerStore={baseBuyerStore} />)
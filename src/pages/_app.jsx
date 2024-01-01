// _app.js
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import {store} from '@/store';
const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);

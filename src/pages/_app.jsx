// _app.js
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { store } from '@/store';

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
};

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);

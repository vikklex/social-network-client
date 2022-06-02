import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'redux/store/rootReducer';

const store = configureStore({
  reducer: rootReducer,

  devtools: composeWithDevTools(applyMiddleware(thunk)),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

import './index.scss';

import * as serviceWorker from './serviceWorker';

import {applyMiddleware, compose, createStore} from 'redux';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import {getFirestore, reduxFirestore} from 'redux-firestore';

import App from './App';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import firebaseConfig from './config/firebase/';
import rootReducer from './store/reducers';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {attachAuthIsReady: true})
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'));
  serviceWorker.unregister();
});
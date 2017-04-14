// 引用 babel-polyfill 避免瀏覽器不支援部分 ES6 用法
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import CounterContainer from '../common/containers/CounterContainer';

// 從 server 取得傳進來的 initialState。由於從字串轉回物件，又稱為 rehydration（覆水）
const initialState = window.__PRELOADED_STATE__;

// 由於我們使用 ImmutableJS，所以需要把在 server-side dehydration（脫水）
// 又在前端 rehydration（覆水）的 initialState 轉成 ImmutableJS 資料型態，並傳進 configureStore 建立 store
const store = configureStore(fromJS(initialState));

// 接下來就跟一般的 React App 一樣，把 store 透過 Provider 往下傳到 Component 中
ReactDOM.render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('app')
);

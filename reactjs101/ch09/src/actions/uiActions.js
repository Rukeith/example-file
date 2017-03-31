import { createAction } from 'redux-actions';
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
} from '../constants/actionTypes';

// 同步 actions 處理，回傳 action 物件
export const showSpinner = createAction(SHOW_SPINNER);
export const hideSpinner = createAction(HIDE_SPINNER);

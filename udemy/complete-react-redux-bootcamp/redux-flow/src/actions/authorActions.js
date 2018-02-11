import AuthorApi from "../api/mockAuthorApi";
import * as types from './actionTypes';

export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  }
}

export function loadAuthors() {
  return async dispatch => {
    try {
      const authors = await AuthorApi.getAllAuthors();
      dispatch(loadAuthorsSuccess(authors));
    } catch (error) {
      throw(error);
    }
  };
}
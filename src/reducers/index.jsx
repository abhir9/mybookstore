import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {
  ENTER_SEARCH_TEXT,
  FETCH_BOOK,
  FETCH_BOOK_FAILURE,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOKS,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
  SEARCH_BOOK,
  SEARCH_BOOK_FAILURE,
  SEARCH_BOOK_SUCCESS
} from '../actions'

const defaultStateList = {
  isFetching: false,
  items: [],
  error: {}
};

const bookList = (state = defaultStateList, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
    case SEARCH_BOOK:
      return {...state, isFetching: true};
    case FETCH_BOOKS_SUCCESS:
    case SEARCH_BOOK_SUCCESS:
      return {...state, isFetching: false, items: action.data};
    case FETCH_BOOKS_FAILURE:
    case SEARCH_BOOK_FAILURE:
      return {...state, isFetching: false, error: action.data};
    default:
      return state;
  }
};

const defaultState = {
  isFetching: false,
    items: {},
  error: {}
};

const bookDetail = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_BOOK:
      return Object.assign({}, state, {
        isFetching: true
      });
    case FETCH_BOOK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
          items: action.data
      });
    case FETCH_BOOK_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.data
      });
    default:
      return state;
  }
};


const input = (state = '', action) => {
  switch (action.type) {
    case ENTER_SEARCH_TEXT:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
};

const bookApp = combineReducers({
    bookDetail,
    bookList,
  routing: routerReducer
});

export default bookApp;

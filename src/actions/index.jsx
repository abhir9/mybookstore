import {NODE_HOST, NODE_SEARCH, NODE_SHOW} from '../const';
// action types
export const SEARCH_BOOK = 'SEARCH_BOOK';
export const SEARCH_BOOK_SUCCESS = 'SEARCH_BOOK_SUCCESS';
export const SEARCH_BOOK_FAILURE = 'SEARCH_BOOK_FAILURE';
export const FETCH_BOOKS = 'FETCH_BOOKS';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const RESET_BOOKS = 'RESET_BOOKS';
export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';

function searchBook(searchText) {
  return {
    type: SEARCH_BOOK,
    searchText
  };
}

function searchBookSuccess(data, keyword) {
  return {
    type: SEARCH_BOOK_SUCCESS,
    data,
    keyword
  };
}

function searchBookFail(error) {
  return {
    type: SEARCH_BOOK_FAILURE,
    error
  };
}

function fetchBooks() {
  return {
    type: FETCH_BOOKS
  };
}

function fetchBooksSuccess(data) {
  return {
    type: FETCH_BOOKS_SUCCESS,
    data
  };
}

function fetchBooksFail(error) {
  return {
    type: FETCH_BOOKS_FAILURE,
    error
  };
}

function fetchBook() {
  return {
    type: FETCH_BOOK
  };
}

function fetchBookSuccess(data) {
  return {
    type: FETCH_BOOK_SUCCESS,
    data
  };
}

function fetchBookFail(error) {
  return {
    type: FETCH_BOOK_FAILURE,
    error
  };
}

export function searchBookList(keyword) {
  let url = NODE_HOST + NODE_SEARCH + keyword;
  return function (dispatch) {
    dispatch(searchBook())
    return fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => dispatch(searchBookSuccess(data, keyword)))
        .catch(error => dispatch(searchBookFail(error)))
  }
}

export function fetchBookList(option) {
  let url = NODE_HOST + NODE_SEARCH + (option?option:Math.random().toString(36).substring(11));
  return function (dispatch) {
    dispatch(fetchBooks());
    return fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => dispatch(fetchBooksSuccess(data.work)))
        .catch(error => dispatch(fetchBooksFail(error)))
  }
}

export function fetchBookDetail(id) {
  const url = NODE_HOST + NODE_SHOW + id;
  return function (dispatch) {
    dispatch(fetchBook())
    return fetch(url)
        .then(response => response.json())
        .then(function(data){
          dispatch(fetchBookSuccess(data));
        })
        .catch(error => dispatch(fetchBookFail(error)))
  }
}




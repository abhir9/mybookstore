import React from 'react';
import {bookList} from './reducers/index'
import * as types from './actions/index'
import './index.css';
import {DisplayMsg} from './components';
import BookPoster from './components/BookPoster'
import {Image} from 'react-bootstrap'

import {App} from './App';
import {configure, shallow} from 'enzyme';


const EnzymeAdapter = require('enzyme-adapter-react-16');

configure({adapter: new EnzymeAdapter()});
describe("BookList Test Suit", () => {

  it('Componant: Render Display Msg and check type and class', () => {
    const wrapper = shallow(<DisplayMsg/>);
    expect(wrapper.type()).toEqual('div');
    expect(wrapper.find('.lds-css').length).toBe(1);
  });
  it('Componant: Render BookPoster and check child element shoulde be Image', () => {
    const wrapper = shallow(<BookPoster/>);
    expect(wrapper.find('Image').first().props().circle).toEqual(false)
    expect(wrapper.find('Image').children().length).toBe(0);
  });

  it('STATE & REDUCER: default behaviour test', () => {

    const state = bookList(undefined, {});
    expect(state.isFetching).toEqual(false);

  });

  it('ACTION & REDUCER:  Action FETCH_BOOKS fires & isFetching should go to true mode', () => {
    expect(
        bookList([], {type: types.FETCH_BOOKS})
    ).toEqual(
        {isFetching: true})
  });

  it('ACTION & REDUCER: Action FETCH_BOOKS_FAILURE fires and result should match', () => {
    expect(
        bookList({}, {type: types.FETCH_BOOKS_FAILURE})
    ).toEqual({"isFetching": false, "items": undefined})
  });

});
import React, {Component} from 'react';
import {DisplayMsg, BookList} from '../components';
import {connect} from 'react-redux';
import {fetchBookList, searchBookList} from '../actions';

class BookContainer extends Component {

  componentDidMount() {
    if (!this.props.params.keyword) {
      const {dispatch} = this.props;
      dispatch(fetchBookList());
    }
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch} = this.props;
    if (nextProps.params.keyword && this.props.params.keyword !== nextProps.params.keyword) {
      dispatch(searchBookList(nextProps.params.keyword));
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    return this.props.books !== nextProps.books;

  }

  render() {
    const {books} = this.props;
    if (books.length > 0) {
      return (
          <BookList  books={books}/>
      );
    } else {
      return (<DisplayMsg/>);
    }
  }
}


function mapStateToProps(state, ownProps) {
  const {bookList, bookDetail} = state;
  const { items: books, error_bookList} = bookList;
  const keyword = ownProps.params.keyword;
  return {books, keyword}
}

export default connect(mapStateToProps)(BookContainer);

import React from 'react';
import Poster from './BookPoster';
import {Col, Grid, Row} from 'react-bootstrap';
import {Modal,DisplayMsg} from '../components';
import {connect} from 'react-redux';
import {fetchBookDetail} from '../actions';

class BookList extends React.Component {
  constructor(props) {
    super(props);
    const {dispatch} = this.props;
    this.state = {show: false, data: undefined, fetching: false,bookid:undefined}
  }

  componentWillMount() {
      this.setState({
          books:this.props.books
      })
  }
  componentWillReceiveProps(nextProps) {
      const {dispatch,books, bookdata, isFetching} = nextProps;

    this.setState({
      data: bookdata,
      fetching: isFetching,
      books:books,
      show: this.state.books[0].best_book.id._ === books[0].best_book.id._,
      bookid:bookdata.id
    })
  }

  showModal = (bookid) => {
    const {dispatch} = this.props;
    this.setState({data: undefined, show: true, bookid: bookid});
    dispatch(fetchBookDetail(bookid));
  }

  hideModal = () => {
    this.setState({show: false,data:undefined,bookid:undefined});
  }

  render() {
    let that = this;
    const style = {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '36px'
    }
      let books = this.state.books.map(function (book) {
      return (
          <Col xs={6} sm={4} md={3} key={book.best_book.id._}>
            <div onClick={that.showModal.bind(that, book.best_book.id._)}><Poster info id={book.best_book.id._} path={book.best_book.image_url} title={book.best_book.title} responsive/>
            </div>
          </Col>
      );
    });
    return (
        <Grid fluid={false}>
          <Row style={style}>
            {books}
              {this.state.show && <Modal id={that.state.bookid} fetching={this.state.fetching} data={this.state.data} show={this.state.show} handleClose={this.hideModal}/>}
          </Row>
            {this.state.fetching && <DisplayMsg />}
        </Grid>
    );
  }
}


function mapStateToProps(state) {
  const {bookDetail,bookList} = state;
  const {isFetching, items:bookdata, error_book} = bookDetail;
  const {items:books}=bookList
  return {isFetching, books, error_book, bookdata}
}

export default connect(mapStateToProps)(BookList);


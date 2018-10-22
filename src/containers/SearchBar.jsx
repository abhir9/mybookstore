import React, {Component} from 'react'
import {Navbar} from 'react-bootstrap/lib'
import {connect} from 'react-redux'
import './search.css'
import Autosuggest from 'react-autosuggest'
import {NODE_HOST, NODE_SEARCH} from '../const';
import {fetchBookDetail, fetchBookList} from "../actions";
import DisplayMsg from "../components/DisplayMsg";


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {isFetching, bookList} = nextProps;
    this.setState({
      loading: isFetching & bookList.items & bookList.items.length > 0
    })
  }


  onChange = (event, {newValue, method}) => {
    this.setState({
      value: newValue
    });
  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      return this.handleSubmit(this.state.value);
    }
  }

  handleSubmit = (searchText) => {
    const {dispatch} = this.props;
    dispatch(fetchBookList(searchText));
    this.setState({value: '', suggestions: [], loading: true});

  }


  getSuggestionValue = (suggestion) => {
    return this.state.value;
  };

  onSuggestionsFetchRequested = ({value}) => {
    const trimmedValue = value.trim();
    this.setState({loading: true});
    if (trimmedValue.length > 0) {
      let url = NODE_HOST + NODE_SEARCH + trimmedValue;
      fetch(url)
          .then(response => response.json())
          .then(json => json.results)
          .then(data => {
            const results = data.work.map(book => {
              let temp = {}
              temp.id = book.best_book.id._
              temp.title = book.best_book.title
              temp.authorName = book.best_book.author.name
              temp.img = book.best_book.image_url
              return temp
            });
            this.setState({
              suggestions: results,
              loading: false
            });
          }).catch(error => console.log('Exception to get Suggestions'))
    }
    else {
      this.setState({
        suggestions: []
      })
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = (suggestion) => {
    return (
        <a>
          <img className="searchResult-image" src={suggestion.img} alt={suggestion.title}/>
          <div className="searchResult-text">
            <div className="searchResult-name">
              {suggestion.title}
            </div>
            {suggestion.authorName}
          </div>
        </a>
    );
  };

  onSuggestionSelected = (event, {suggestion, method}) => {
    const {dispatch} = this.props;
    dispatch(fetchBookDetail(suggestion.id));
    this.state = {
      value: '',
    };
  };

  render() {
    const brandStyle = {
      fontWeight: 'bold',
      textTransform: 'caplitalize',
      paddingLeft: 10,
      fontSize: '1.8em',
      color: '#3be8b0'
    };
    const {value, suggestions} = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyPress: this.handleKeyDown,
      placeholder: 'Search Book Name...'
    };

    return (
        <Navbar bsStyle='inverse'>
          <Navbar.Header>
            <Navbar.Brand style={{width: '30%'}}>
              <a href="#"><span style={brandStyle}>{this.props.brand}</span></a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Form pullRight style={{width: '75%'}}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}/>
          </Navbar.Form>
          <div>
            {this.state.loading && <DisplayMsg top={1}/>}
          </div>
        </Navbar>
    );

  }
}

function mapStateToProps(state) {
  const {bookList} = state;
  const {isFetching} = bookList;
  return {isFetching, bookList}
}

export default connect(mapStateToProps)(SearchBar);


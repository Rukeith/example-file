import React, { Component } from 'react';
import list from './list';
import { Grid, Row, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { 
  DEFAULT_QUERY, DEFAULT_PAGE , DEFAULT_HPP, PATH_BASE,
  PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP
} from './constants/index';


const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}
            &${PARAM_PAGE}&${PARAM_HPP}${DEFAULT_HPP}`;
console.log(url);

// filter the results by search
function isSearched(searchTerm){
  return function(item){
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {

  // setting up internal component state
  // ES6 class can use constructor to initialize internal state
  constructor(props){
    // super props sets this.props to the constructor
    super(props);

    // setting up state
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    }

    // bind the functions to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // check top stories search term
  checkTopStoriesSearchTerm(searchTerm){
    return !this.state.results[searchTerm];
  }

  // set top stories
  setTopStories(result){
    // get the hits ang page from result
    const { hits, page } = result;
    // meaning page is not 0, button has been clicked, page might be 1 or 2
    // old hits are already available in the state
    // const oldHits = page !== 0 ? this.state.result.hits : [];

    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({ results: { ...results, [searchKey]: {hits: updatedHits, page} } });
  }

  // fetch top stories
  fetchTopStories(searchTerm, page){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
      &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
      .catch(e => e);
  }

  // component did mount
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }

  // on search submit function
  onSubmit(event){
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.checkTopStoriesSearchTerm(searchTerm)) {
      this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

 
 // lets rewrite removeItem function in ES6
 removeItem(id){
  const { results, searchKey } = this.state;
  const { hits, page } = results[searchKey];
  // const isNotId = item => item.objectID !== id;
  const updatedList = hits.filter(item => item.objectID !== id);
  // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) });
  this.setState({ results: {...results, [searchKey]: {hits: updatedList, page}} });
 }

 // get input field value from search form
 searchValue(event){
  // console.log(event)
  this.setState({ searchTerm: event.target.value });
 }

  render() {

    const { results, searchTerm, searchKey } = this.state;

    // if (!result) { return null; }

    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    console.log(this);

    return (
      <div>

        <Grid fluid>
          <Row>
            <div className="jumbotron text-center">

            <Search
              onChange={ this.searchValue } 
              value={ searchTerm }
              onSubmit={ this.onSubmit }
            >NEWSAPP</Search>

            </div>
          </Row>
        </Grid>

        <Grid>
          <Row>
            <Table 
              list={ list }
              searchTerm={ searchTerm }
              removeItem={ this.removeItem }
            />
          

          <div className="text-center alert">
            <Button
              className="btn btn-success"
              onClick={ () => this.fetchTopStories(searchTerm, page + 1) }>
              Load more
            </Button>
          </div>
        </Row>
      </Grid>

      </div>
    );
  }
}


const Search = ({ onChange, value, children, onSubmit }) => {
  return(
      <form onSubmit={ onSubmit }>
      <FormGroup>

        <h1 style={{ fontWeight: 'bold' }}>{ children }</h1> 
        <hr style={{ border: '2px solid black', width: '100px' }} />

        <div className="input-group">

        <input
          className="form-control width100 searchForm" 
          type="text" 
          onChange={ onChange } 
          value={ value } 
        />

        <span className="input-group-btn">
          <Button
            className="btn btn-primary searchBtn"
            type="submit"
          >
            Search
          </Button>
        </span>

        </div>

        </FormGroup>
      </form>
    )
}


const Table = ({ list, searchTerm, removeItem }) => {
  return(
      <div className="col-sm-10 col-sm-offset-1">
        {
            // list.filter( isSearched(searchTerm) ).map(item =>
            list.map(item =>   
              <div key={ item.objectID }>
                <h1>
                  <a href={ item.url }>
                    { item.title }</a> 
                </h1>
                <h4>

                  { item.author } | { item.num_comments } Comments | { item.points } Points
                
                <Button
                  className="btn btn-xs"
                  type="button"
                  onClick={ () => removeItem(item.objectID) }>
                    Remove
                </Button>

                </h4> <hr />

              </div>
            )
          }
      </div>
    )
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number, 
    })
  ).isRequired,
  removeItem: PropTypes.func.isRequired,
}


const Button = ({ onClick, children, className='' }) => 
  <button
    className={ className }  
    onClick={ onClick } >
    { children }
  </button>

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  className: '',
}




export default App;






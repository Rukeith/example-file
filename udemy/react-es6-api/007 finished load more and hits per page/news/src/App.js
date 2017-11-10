import React, { Component } from 'react';
import list from './list';
import { Grid, Row, FormGroup } from 'react-bootstrap';

// default parameters to fetch data from the api
const DEFAULT_QUERY = 'react';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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
      result: null,
      searchTerm: DEFAULT_QUERY
    }

    // bind the functions to this (app component)
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // set top stories
  setTopStories(result){
    // get the hits ang page from result
    const { hits, page } = result;
    // meaning page is not 0, button has been clicked, page might be 1 or 2
    // old hits are already available in the state
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page } });
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
    this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
  }

  // on search submit function
  onSubmit(event){
    this.fetchTopStories(this.state.searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }

 
 // lets rewrite removeItem function in ES6
 removeItem(id){
  const { result } = this.state;
  // const isNotId = item => item.objectID !== id;
  const updatedList = result.hits.filter(item => item.objectID !== id);
  // this.setState({ result: Object.assign({}, this.state.result, {hits: updatedList}) });
  this.setState({ result: {...result, hits: updatedList} });
 }

 // get input field value from search form
 searchValue(event){
  // console.log(event)
  this.setState({ searchTerm: event.target.value });
 }

  render() {

    const { result, searchTerm } = this.state;

    // if (!result) { return null; }

    const page = (result && result.page) || 0;

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

        { result &&
        <Table 
          list={ result.hits }
          searchTerm={ searchTerm }
          removeItem={ this.removeItem }
        />
      }

      <div className="text-center alert">
        <Button
          className="btn btn-success"
          onClick={ () => this.fetchTopStories(searchTerm, page + 1) }>
          Load more
        </Button>
      </div>

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


const Button = ({ onClick, children, className='' }) => 
  <button
    className={ className }  
    onClick={ onClick } >
    { children }
  </button>




export default App;






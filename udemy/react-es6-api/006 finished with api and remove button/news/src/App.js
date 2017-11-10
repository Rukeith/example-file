import React, { Component } from 'react';
import list from './list';
import { Grid, Row, FormGroup } from 'react-bootstrap';

// default parameters to fetch data from the api
const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
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
  }

  // set top stories
  setTopStories(result){
    this.setState({ result: result });
  }

  // fetch top stories
  fetchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
      .catch(e => e);
  }

  // component did mount
  componentDidMount() {
    this.fetchTopStories(this.state.searchTerm);
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

    if (!result) { return null; }

    console.log(this);

    return (
      <div>

        <Grid fluid>
          <Row>
            <div className="jumbotron text-center">

            <Search
              onChange={ this.searchValue } 
              value={ searchTerm }
            >NEWSAPP</Search>

            </div>
          </Row>
        </Grid>

        <Table 
          list={ result.hits }
          searchTerm={ searchTerm }
          removeItem={ this.removeItem }
        />

      </div>
    );
  }
}


const Search = ({ onChange, value, children }) => {
  return(
      <form>
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
          <button
            className="btn btn-primary searchBtn"
            type="submit"
          >
            Search
          </button>
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
            list.filter( isSearched(searchTerm) ).map(item =>   
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






import React, { Component } from 'react';
import uniqid from 'uniqid';
import JSONP from 'jsonp';

import SearchBar from '../components/SearchBar';
import TermsRow from '../components/TermsRow';

// AutocompleteSearch
//
// Autocomplete search component written in a rush on a rainy Russian day,
// uses live data from google unoficial autocomplete API url,
// requires further optimisation and code refactoring.
//
// State:
// --------
// filterText   - search input text.
// searchTerms  - array of search terms for the autocomplete drop-down list.
// focusedItem  - integer index of the currently highlighted TermsRow.
//
// Methods:
// --------
// getGoogleTerms:
// Gets an array of results from google autocomplete url,
// uses JSONP since the url is not official and doesn't appear to support CORS.
//
// handleTermClick:
// Used as callback to handle clicks from TermsRow components.
//
// handleKeyDown:
// Used as callback to handle ArrowDown, ArrowUp and Enter events from SearchBar.
//

class AutocompleteSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      searchTerms: [],
      focusedItem: -1,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTermClick = this.handleTermClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getGoogleTerms = this.getGoogleTerms.bind(this);
  }

  // getGoogleTerms:
  // Gets an array of results from google autocomplete url,
  // uses JSONP since the url is not official and doesn't appear to support CORS.
  //
  getGoogleTerms(filterText) {
    const self = this;
    const url = `http://suggestqueries.google.com/complete/search?client=firefox&q=${filterText}`;

    if (filterText !== '') {
      JSONP(url, {}, (err, data) => {
        if (data[1].length > 0) {
          self.setState({
            searchTerms: data[1],
          });
        } else {
          self.setState({
            searchTerms: [],
          });
        }
      });
    } else {
      self.setState({
        searchTerms: [],
      });
    }
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText,
      focusedItem: -1,
    });

    this.getGoogleTerms(filterText);
  }

  // handleTermClick:
  // Used as callback to handle clicks from TermsRow components.
  //
  handleTermClick(filterText) {
    this.setState({
      filterText,
      searchTerms: [],
      focusedItem: -1,
    });
  }

  // handleKeyDown:
  // Used as callback to handle ArrowDown, ArrowUp and Enter events from SearchBar.
  //
  handleKeyDown(e) {
    const { focusedItem, searchTerms } = this.state;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextTerm = focusedItem + 1;
      if (nextTerm > searchTerms.length - 1) {
        this.setState({
          focusedItem: 0,
        });
      } else {
        this.setState({
          focusedItem: nextTerm,
        });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevTerm = focusedItem - 1;
      if (prevTerm < 0) {
        this.setState({
          focusedItem: searchTerms.length - 1,
        });
      } else {
        this.setState({
          focusedItem: prevTerm,
        });
      }
    } else if (e.key === 'Enter') {
      // Comment the following line to get the request actually sent to Google:
      e.preventDefault();
      this.handleTermClick(searchTerms[focusedItem]);
    }
  }

  render() {
    const { searchTerms, filterText, focusedItem } = this.state;

    return (
      <React.Fragment>
        <SearchBar
          filterText={filterText}
          onFilterTextChange={this.handleFilterTextChange}
          onKeyDown={this.handleKeyDown}
        />
        {
          searchTerms.length > 0 &&
            <ul className="ac-terms__list">
              {
                searchTerms.map((term, i) => (
                  <TermsRow
                    term={term}
                    key={uniqid()}
                    focused={focusedItem === i}
                    onTermClick={this.handleTermClick}
                  />
                ))
              }
            </ul>
        }
      </React.Fragment>
    );
  }
}

export default AutocompleteSearch;

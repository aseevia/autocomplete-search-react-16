## Autocomplete Search React Component

Autocomplete search component written in a rush on a rainy Russian day, uses live data from google's unoficial autocomplete API url, requires further optimisation and code refactoring.

#### State

```js
this.state = {
      filterText: '',  // search input text.
      searchTerms: [], // array of search terms for the autocomplete drop-down list.
      focusedItem: -1, // integer index of the currently highlighted TermsRow.
    };
```

#### Methods

```js
getGoogleTerms(filterText) 
// Gets an array of results from google autocomplete url,
// uses JSONP since the url is not official and doesn't appear to support CORS.

handleTermClick(filterText)
// Used as callback to handle clicks from TermsRow components.

handleKeyDown(event)
// Used as callback to handle ArrowDown, ArrowUp and Enter events from SearchBar.
```

## Running

```js
npm start
```

## Testing

```js
// Test file can be found in the "<rootDir>/containers/__tests__" folder.
// Just a few basic tests included.

npm test
```


import React from 'react';

import AutocompleteSearch from './AutocompleteSearch';
import logo from '../assets/svg/logo.svg';

const App = () => (
  <div className="app">
    <div className="app__logo" dangerouslySetInnerHTML={{ __html: logo }} />
    <div className="app__search">
      <AutocompleteSearch />
    </div>
  </div>
);

export default App;

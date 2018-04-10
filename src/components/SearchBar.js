import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ filterText, onFilterTextChange, onKeyDown }) => (
  <form action="https://www.google.com/search">
    <input
      type="text"
      name="q"
      placeholder="Autocomplete Search..."
      autoComplete="off"
      className="ac-input"
      value={filterText}
      onChange={(e) => { onFilterTextChange(e.target.value); }}
      onKeyDown={(e) => { onKeyDown(e); }}
    />
  </form>
);

SearchBar.defaultProps = {
  filterText: '',
};

SearchBar.propTypes = {
  filterText: PropTypes.string,
  onFilterTextChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default SearchBar;

import React from 'react';
import PropTypes from 'prop-types';

const TermsRow = ({ onTermClick, term, focused }) => {
  const iClasses = ['ac-terms__item'];

  if (focused) {
    iClasses.push('ac-terms__item--focused');
  }

  return (
    <li className={iClasses.join(' ')}>
      <button className="ac-terms__trigger" onClick={() => { onTermClick(term); }}>{term}</button>
    </li>
  );
};


TermsRow.defaultProps = {
  term: '',
  focused: false,
};

TermsRow.propTypes = {
  onTermClick: PropTypes.func.isRequired,
  term: PropTypes.string,
  focused: PropTypes.bool,
};

export default TermsRow;

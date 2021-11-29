import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RedirectButton extends React.Component {
  render() {
    const { path, testid, textContent } = this.props;
    return (
      <Link
        to={ path }
        data-testid={ testid }
      >
        <h3>{ textContent }</h3>
      </Link>
    );
  }
}

RedirectButton.propTypes = PropTypes.shape({
  path: PropTypes.string,
  testid: PropTypes.string,
  textContent: PropTypes.string,
}).isRequired;

export default RedirectButton;

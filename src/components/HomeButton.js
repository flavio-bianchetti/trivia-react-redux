import React from 'react';
import { Link } from 'react-router-dom';

class HomeButton extends React.Component {
  render() {
    return (
      <Link
        to="/"
        data-testid="btn-go-home"
      >
        <h3>Voltar ao Início</h3>
      </Link>
    );
  }
}

export default HomeButton;

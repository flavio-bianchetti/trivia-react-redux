import React from 'react';
import { connect } from 'react-redux';

class Configurations extends React.Component {
  render() {
    return (
      <h1 data-testid="settings-title">Olá Mundo</h1>
    );
  }
}

export default connect()(Configurations);

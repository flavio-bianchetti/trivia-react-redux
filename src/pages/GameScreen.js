import React from 'react';
import { connect } from 'react-redux';

class GameScreen extends React.Component {
  render() {
    return (
      <h1>GameScreen</h1>
    );
  }
}

export default connect()(GameScreen);

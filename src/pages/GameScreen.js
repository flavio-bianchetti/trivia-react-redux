import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class GameScreen extends React.Component {
  render() {
    return (
      <section>
        <h1>GameScreen</h1>
        <Header />
      </section>
    );
  }
}

export default connect()(GameScreen);

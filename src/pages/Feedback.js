import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const average = 3;
    const { playerInfo } = this.props;
    return (
      <section>
        <Header />
        <h1>
          { `Sua pontuação: ${playerInfo.score}` }
        </h1>
        <p
          data-testid="feedback-text"
        >
          {
            playerInfo.assertions < average
              ? 'Poderia ser melhor...'
              : 'Mandou bem!'
          }
        </p>
      </section>
    );
  }
}

Feedback.propTypes = ({
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
});

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

export default connect(mapStateToProps)(Feedback);

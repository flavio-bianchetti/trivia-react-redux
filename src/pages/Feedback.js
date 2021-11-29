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
        <h2
          data-testid="feedback-text"
        >
          {
            playerInfo.assertions < average
              ? 'Podia ser melhor...'
              : 'Mandou bem!'
          }
        </h2>
        <p
          data-testid="feedback-total-question"
        >
          { playerInfo.assertions || 0 }
        </p>
        <p
          data-testid="feedback-total-score"
        >
          { playerInfo.score || 0 }
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

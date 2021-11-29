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
              ? 'Poderia ser melhor...'
              : 'Mandou bem!'
          }
        </h2>
        <p
          data-testid="feedback-total-score"
        >
          { `Você acertou ${playerInfo.assertions} questões!`}
        </p>
        <p
          data-testid="feedback-total-question"
        >
          { `Um total de ${playerInfo.score} pontos` }
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

import React from 'react';
import { connect } from 'react-redux';
import RedirectButton from '../components/RedirectButton';

class Ranking extends React.Component {
  constructor() {
    super();

    this.randerRanking = this.renderRanking.bind(this);
    this.getRanking = this.getRanking.bind(this);
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    if (ranking.length > 0) {
      ranking.sort((a, b) => b.score - a.score);
    }
    return ranking;
  }

  renderRanking(ranking) {
    return ranking.map((player, index) => (
      <li key={ index }>
        <span>
          <img
            data-testid={ `player-image-${index}` }
            src={ player.picture }
            alt={ player.name }
          />
        </span>
        <span data-testid={ `player-name-${index}` }>
          {player.name}
        </span>
        <span data-testid={ `player-score-${index}` }>
          {player.score}
        </span>
      </li>
    ));
  }

  render() {
    // const { playerInfo } = this.props;
    this.setRankingToLocalStorage();
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { this.renderRanking(this.getRanking()) }
        </ul>
        <RedirectButton
          path="/"
          testid="btn-go-home"
          textContent="Voltar ao Início"
        />

      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   playerInfo: state.player,
// });

// Ranking.propTypes = ({
//   playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
// });

export default connect()(Ranking);

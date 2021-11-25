import React from 'react';
import { connect } from 'react-redux';
import HomeButton from '../components/HomeButton';

class Ranking extends React.Component {
  constructor() {
    super();

    this.randerRanking = this.renderRanking.bind(this);
    this.getRanking = this.getRanking.bind(this);
    this.setRankingToLocalStorage = this.setRankingToLocalStorage.bind(this);
  }

  setRankingToLocalStorage() {
    const imageURL = 'https://www.gravatar.com/avatar/00000000000000000000000000000000';
    const ranking = [
      { name: 'Lucas', score: 7, picture: imageURL },
      { name: 'Flavio', score: 9, picture: imageURL },
      { name: 'Sairo', score: 8, picture: imageURL },
      { name: 'Arthur', score: 10, picture: imageURL },
    ];
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    if (ranking.length > 0) {
      ranking.sort((a, b) => b.score - a.score);
    }
    return ranking;
  }

  renderRanking(ranking) {
    this.setRankingToLocalStorage();
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
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          { this.renderRanking(this.getRanking()) }
        </ul>
        <HomeButton />

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

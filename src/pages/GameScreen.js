import React from 'react';
import { connect } from 'react-redux';
import html from 'react-inner-html';
import { Redirect } from 'react-router-dom';
import fetchTrivia from '../services/fetchTrivia';
import randomAnswers from '../helpers/randomAnswers';
import Header from '../components/Header';
import '../styles/gameScreen.css';
import getGravatarImage from '../features/getGravatarImage';
import { setPlayerScore } from '../actions/index';
import PropTypes from 'prop-types';

const QUESTIONS_LENGTH = 4;
const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      answers: [],
      index: 0,
      isDisabled: false,
      seconds: 30,
      wasRenderized: false,
      player: {
        assertions: 0,
        score: 0,
      },
      difficulty:[]
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.incremetIndex = this.incremetIndex.bind(this);
    this.addAnswersClass = this.addAnswersClass.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
    this.getDifficulty = this.getDifficulty.bind(this);
    this.setPlayerInfo = this.setPlayerInfo.bind(this);
    this.setStatePlayerInfo = this.setStatePlayerInfo.bind(this);
    this.createStatePlayerInfo = this.createStatePlayerInfo.bind(this);
  }

  componentDidMount() {
    this.decrementCountdown();
    this.getQuestions();
    this.createStatePlayerInfo();
  }

  async getQuestions() {
    const token = JSON.parse(localStorage.getItem('token'))[0];
    const questions = await fetchTrivia(token);
    this.setState({ questions: questions.results });
  }

  decrementCountdown() {
    // console.log(seconds);
    this.timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState({
        seconds: seconds - 1,
      });
      if (seconds === TIME_LIMIT) {
        clearInterval(this.timer);
        this.disableButtons();
      }
    }, ONE_SECOND);
  }

  incremetIndex() {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      isDisabled: false,
    });
  }

  disableButtons() {
    this.setState({ isDisabled: true });
  }

  addAnswersClass(event) {
    event.preventDefault();
    const answers = document.querySelectorAll('.answer');
    const { seconds, player } = this.state;
    const { playerInfo, playerScore } = this.props;
    const secondOfTheClick = seconds;
    answers.forEach((answer) => {
      if (answer.name === 'correct-answer') {
        answer.classList.add('correct-answer');
      } else {
        answer.classList.add('incorrect-answer');
      }
    });

    const hasDifficulty = event.target.className.split(' ')[1];
    const newPlayer = {
      assertions: player.assertions,
      score: player.score,
    }
    if (hasDifficulty !== '-') {
      newPlayer.assertions = player.assertions + 1;
      newPlayer.score = player.score + (10 + (seconds * this.getDifficulty(hasDifficulty)));
    }

    clearInterval(this.timer);
    this.setState({
      isDisabled: true,
      seconds: secondOfTheClick,
      player: newPlayer,
    });
    playerScore({
      assertions: newPlayer.assertions,
      score: newPlayer.score,
    });
    this.setStatePlayerInfo({
      name: playerInfo.name,
      assertions: newPlayer.assertions,
      score: newPlayer.score,
      gravatarEmail: playerInfo.gravatarEmail,
    });
  }

  getDifficulty(difficulty) {
    switch(difficulty) {
      case 'hard':
        return 3;
      case 'medium':
        return 2;
      default:
        return 1;
    }
  }

  renderQuestions(question) {
    const { isDisabled, wasRenderized, answers } = this.state;

    if (!wasRenderized) {
      this.setState({ answers: randomAnswers(question), wasRenderized: true });
    }

    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text" { ...html(question.question) } />
        { answers.map((answer) => (
          <button
            data-testid={ answer.tesiId }
            name={ answer.tesiId }
            className={ `answer ${answer.difficulty}` }
            type="button"
            key={ answer.text }
            onClick={ (event) => this.addAnswersClass(event) }
            disabled={ isDisabled }
            { ...html(answer.text) }
          />
        ))}
        <button
          type="button"
          onClick={ () => {
            const { index } = this.state;
            clearInterval(this.timer);
            this.decrementCountdown();
            this.setState({
              index: index + 1,
              isDisabled: false,
              wasRenderized: false,
              seconds: 30,
            });
          } }
        >
          Próxima
        </button>
      </div>
    );
  }

  createStatePlayerInfo() {
    const player = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    };
    const state = {
      player,
    }
    localStorage.setItem('state', JSON.stringify(state));
  }

  setStatePlayerInfo({name, assertions, score, gravatarEmail}) {
    const player = {
      name,
      assertions,
      score,
      gravatarEmail,
    };
    const state = {
      player,
    }

    localStorage.setItem('state', JSON.stringify(state));
  }

  setPlayerInfo() {
    const { playerInfo } = this.props;
    const setPlayerInfo = [
      {
        name: playerInfo.name,
        score: playerInfo.score,
        picture: getGravatarImage(playerInfo.email) 
        || 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
      }
    ];
    let ranking = JSON.parse(localStorage.getItem('ranking') || '[]');
    if (ranking.length === 0) {
      ranking = setPlayerInfo;
    } else {
      // verificar se já existe e atualiza a pontuação.
      const oldRanking = ranking;
      ranking = [
        ...oldRanking,
        ...setPlayerInfo,
      ];
    }
    localStorage.setItem('ranking', JSON.stringify(ranking));
    return <Redirect to="/feedback" />
  }

  render() {
    const { questions, index, seconds, player } = this.state;
    console.log(player.assertions, player.score);
    return (
      <div>
        <Header />
        {index > QUESTIONS_LENGTH ? this.setPlayerInfo()
          : questions.length > 0 && this.renderQuestions(questions[index])}
        <section>
          {seconds < 0 ? false : <h2>{seconds}</h2> }
          <h3>
            Question
            { index + 1 }
          </h3>
        </section>
      </div>
    );
  }
}

GameScreen.propTypes = ({
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  playerScore: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
  playerScore: (payload) => dispatch(setPlayerScore(payload)), 
})

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);

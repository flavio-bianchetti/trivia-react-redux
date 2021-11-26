import React from 'react';
import { connect } from 'react-redux';
import html from 'react-inner-html';
import fetchTrivia from '../services/fetchTrivia';
import randomAnswers from '../helpers/randomAnswers';
import Header from '../components/Header';
import '../styles/gameScreen.css';

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
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.incremetIndex = this.incremetIndex.bind(this);
    this.addAnswersClass = this.addAnswersClass.bind(this);
    this.disableButtons = this.disableButtons.bind(this);
  }

  componentDidMount() {
    this.decrementCountdown();
    this.getQuestions();
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

  addAnswersClass() {
    const answers = document.querySelectorAll('.answer');
    const { seconds } = this.state;
    const secondOfTheClick = seconds;
    answers.forEach((answer) => {
      if (answer.name === 'correct-answer') {
        answer.classList.add('correct-answer');
      } else {
        answer.classList.add('incorrect-answer');
      }
    });
    clearInterval(this.timer);
    this.setState({
      isDisabled: true,
      seconds: secondOfTheClick,
    });
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
            className="answer"
            type="button"
            key={ answer.text }
            onClick={ () => this.addAnswersClass() }
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
          Next
        </button>
      </div>
    );
  }

  render() {
    const { questions, index, seconds } = this.state;
    return (
      <div>
        <Header />
        {index > QUESTIONS_LENGTH ? 'gameOver'
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

export default connect()(GameScreen);

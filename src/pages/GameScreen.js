import React from 'react';
import { connect } from 'react-redux';
import html from 'react-inner-html';
import fetchTrivia from '../services/fetchTrivia';

const RANDOM_SUBTRACT = 0.5;
const QUESTIONS_LENGTH = 4;

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = JSON.parse(localStorage.getItem('token'))[0];
    const questions = await fetchTrivia(token);
    this.setState({ questions: questions.results });
  }

  renderAnswers(question) {
    const result = [
      {
        text: question.correct_answer,
        tesiId: 'correct-answer',
      },
      {
        text: question.incorrect_answers[0],
        tesiId: 'wrong-answer-1',
      },
    ];

    if (question.incorrect_answers.length > 1) {
      return [
        ...result,
        {
          text: question.incorrect_answers[1],
          tesiId: 'wrong-answer-2',
        },
        {
          text: question.incorrect_answers[2],
          tesiId: 'wrong-answer-3',
        },
      ];
    }
    return result;
  }

  renderQuestions(question) {
    const answers = this.renderAnswers(question);
    const randomAnswers = answers.sort(() => Math.random() - RANDOM_SUBTRACT);
    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text" { ...html(question.question) } />
        { randomAnswers.map((answer) => (
          <button
            data-testid={ answer.tesiId }
            type="button"
            key={ answer.text }
            { ...html(answer.text) }
          />
        ))}
        <button
          type="button"
          onClick={ () => {
            const { index } = this.state;
            this.setState({ index: index + 1 });
          } }
        >
          Next
        </button>
      </div>
    );
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        {index > QUESTIONS_LENGTH ? 'gameOver'
          : questions.length > 0 && this.renderQuestions(questions[index])}
      </div>
    );
  }
}

export default connect()(GameScreen);

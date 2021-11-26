import React from 'react';
import { connect } from 'react-redux';
import html from 'react-inner-html';
import fetchTrivia from '../services/fetchTrivia';
import randomAnswers from '../helpers/randomAnswers';
import Header from '../components/Header';

const QUESTIONS_LENGTH = 4;

class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      index: 0,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.goToFeedback = this.goToFeedback.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const token = JSON.parse(localStorage.getItem('token'))[0];
    const questions = await fetchTrivia(token);
    this.setState({ questions: questions.results });
  }

  renderQuestions(question) {
    const answers = randomAnswers(question);

    return (
      <div>
        <h2 data-testid="question-category">{ question.category }</h2>
        <p data-testid="question-text" { ...html(question.question) } />
        { answers.map((answer) => (
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

  goToFeedback() {
    const { history } = this.props;
    history.push('./feedback');
  }

  render() {
    const { questions, index } = this.state;
    return (
      <div>
        <Header />
        {index > QUESTIONS_LENGTH ? this.goToFeedback()
          : questions.length > 0 && this.renderQuestions(questions[index])}
      </div>
    );
  }
}

export default connect()(GameScreen);

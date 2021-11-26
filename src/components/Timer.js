import React from 'react';
import PropTypes from 'prop-types';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

export default class Timer extends React.Component {
  constructor() {
    super();
    this.initialState = 30;
    this.state = {
      seconds: 30,
    };
    this.shotCounter = this.shotCounter.bind(this);
  }

  componentDidMount() {
    this.decrementCountdown();
  }

  componentDidUpdate(prevProps, prevState) {
    this.shotCounter(prevProps, prevState);
  }

  shotCounter(prevProps, prevState) {
    const { incremetIndex } = this.props;
    if (prevState.seconds === TIME_LIMIT) {
      incremetIndex();
      this.setState({
        seconds: 30,
      });
    }
  }

  decrementCountdown() {
    // const { seconds } = this.state;
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
      // if (prevState.seconds === TIME_LIMIT) { // ou eu clicar em 'Proximo'
      //   // rpassar pra proxima questao
      //   console.log('DEU CERTO');
      //   clearInterval(this.intervalId);
      //   this.setState({
      //     seconds: 30,
      //   });
      // }
    }, ONE_SECOND);
  }

  // decrementCountdown() {
  //   const { seconds } = this.state;
  //   this.intervalId = setInterval(() => {
  //     this.setState({
  //       seconds: seconds - 1,
  //     });
  //     if (seconds === TIME_LIMIT) { // ou eu clicar em 'Proximo'
  //       // rpassar pra proxima questao
  //       clearInterval(this.intervalId);
  //       this.setState({
  //         seconds: 30,
  //       });
  //     }
  //   }, ONE_SECOND);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.intervalId);
  // }

  render() {
    const { index } = this.props;
    const { seconds } = this.state;
    return (
      <section>
        <h2>{seconds}</h2>
        <h3>
          { index }
        </h3>
      </section>
    );
  }
}

Timer.propTypes = ({
  incremetIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
});

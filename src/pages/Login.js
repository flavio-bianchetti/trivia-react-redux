import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayerInfo } from '../actions';
import fetchToken from '../services/fetchToken';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
      assertions: 0,
      score: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.linkToConfig = this.linkToConfig.bind(this);
    this.renderConfigButton = this.renderConfigButton.bind(this);
    // this.getToken = this.getToken.bind(this);
    this.handleTokenSave = this.handleTokenSave.bind(this);
  }

  // async getToken() {
  //   const token = await fetchToken();
  //   console.log(token);
  // }

  async handleTokenSave() {
    const tokenReceived = await fetchToken();
    console.log(tokenReceived);
    let token = JSON.parse(localStorage.getItem('token') || '[]');
    if (token.length < 2) {
      token = [];
      token = [
        tokenReceived,
      ];
    }
    localStorage.setItem('token', JSON.stringify(token));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.handleTokenSave();
    const { playerInfo, history } = this.props;
    const { state } = this;
    playerInfo(state);
    history.push('./gamescreen');
  }

  linkToConfig(event) {
    event.preventDefault();
    const { history } = this.props;
    history.push('./configurations');
  }

  renderConfigButton() {
    return (
      <button
        type="submit"
        data-testid="btn-settings"
        onClick={ this.linkToConfig }
      >
        Configurações
      </button>
    );
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="player-input">
            <input
              type="player"
              value={ name }
              name="name"
              placeholder="Nome"
              data-testid="input-player-name"
              required
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email-input">
            <input
              type="email"
              value={ gravatarEmail }
              name="gravatarEmail"
              placeholder="Email"
              data-testid="input-gravatar-email"
              required
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
            disabled={
              !(name.length > 0 && gravatarEmail.length > 0)
            }
          >
            Jogar
          </button>

        </form>

        { this.renderConfigButton() }

      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerInfo: (payload) => dispatch(setPlayerInfo(payload)),
});

Login.propTypes = {
  playerInfo: PropTypes.func.isRequired,

  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

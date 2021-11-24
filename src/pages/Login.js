import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setPlayerInfo from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { playerInfo } = this.props;
    const { state } = this;
    playerInfo(state);
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
            disabled={
              !(name.length > 0 && gravatarEmail.length > 0)
            }
          >
            Entrar
          </button>

        </form>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerInfo: (payload) => dispatch(setPlayerInfo(payload)),
});

Login.propTypes = {
  playerInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

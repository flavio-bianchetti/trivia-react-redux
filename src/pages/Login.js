import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div>
        <form>
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

export default Login;

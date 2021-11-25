import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getGravatarImage from '../features/getGravatarImage';

class Header extends React.Component {
  render() {
    const { playerInfo } = this.props;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ getGravatarImage(playerInfo.email)
              || 'https://www.gravatar.com/avatar/00000000000000000000000000000000' }
            alt={ playerInfo.name || '' }
          />
          <p
            data-testid="header-player-name"
          >
            { playerInfo.name || '' }
          </p>
        </div>
        <div>
          <p
            data-testid="header-score"
          >
            { playerInfo.score || 0 }
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
});

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

export default connect(mapStateToProps)(Header);

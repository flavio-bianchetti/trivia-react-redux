import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { playerInfo } = this.props;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ }
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

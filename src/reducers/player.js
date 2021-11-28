import { PLAYER_INFO, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = ({
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
});

const playerReducer = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case PLAYER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  default: return state;
  }
};

export default playerReducer;

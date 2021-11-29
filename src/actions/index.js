export const PLAYER_INFO = 'PLAYER_INFO';
export const PLAYER_SCORE = 'PLAYER_SCORE';
// export const API_SUCCESS = 'API_SUCCESS';

export function setPlayerInfo(payload) {
  return {
    type: PLAYER_INFO,
    payload,
  };
}

export function setPlayerScore(payload) {
  return {
    type: PLAYER_SCORE,
    payload,
  };
}

// export function apiSuccess(payload) {

// }

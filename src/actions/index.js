export const PLAYER_INFO = 'PLAYER_INFO';
// export const API_SUCCESS = 'API_SUCCESS';

export default function setPlayerInfo(payload) {
  return {
    type: PLAYER_INFO,
    payload,
  };
}

// export function apiSuccess(payload) {

// }

export const PLAYER_INFO = 'PLAYER_INFO';

export default function setPlayerInfo(payload) {
  return {
    type: PLAYER_INFO,
    payload,
  };
}

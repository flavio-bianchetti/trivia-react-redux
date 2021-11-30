export default function createStatePlayerInfo() {
  const player = {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  };
  const state = { player };
  localStorage.setItem('state', JSON.stringify(state));
}

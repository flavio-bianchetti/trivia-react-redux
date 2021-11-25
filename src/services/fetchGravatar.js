function fetchGravatar(emailHash) {
  const API_URL = `https://br.gravatar.com/avatar/${emailHash}?S=100`;
  fetch(API_URL)
    .then((response) => response.json())
    .catch(() => console.log('Gravatar image not found!'));
}

export default fetchGravatar;

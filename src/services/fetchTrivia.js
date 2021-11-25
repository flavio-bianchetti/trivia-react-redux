const API_URL = 'https://opentdb.com/api.php?amount=5&token=';

const fetchTrivia = async (token) => {
  try {
    const response = await fetch(`${API_URL}${token}`);
    const apiResponse = await response.json();
    return apiResponse;
  } catch (err) {
    return console.error(err);
  }
};

export default fetchTrivia;

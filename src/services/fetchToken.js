const API_URL = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const response = await fetch(API_URL);
    const apiResponse = await response.json();
    return apiResponse.token;
  } catch (err) {
    return console.error(err);
  }
};

export default fetchToken;

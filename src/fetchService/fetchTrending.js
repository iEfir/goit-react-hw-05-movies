import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: '75d8b1353cef49a6219d2708694c471e',
};

export async function fetchTrending(signalController) {
  // const controller = new AbortController();
  try {
    const response = await axios.get('trending/movie/day', {
      signal: signalController,
    });
    return response;
  } catch (error) {}
}

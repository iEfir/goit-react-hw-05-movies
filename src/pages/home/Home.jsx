// import { fetchTrending } from 'fetchService/fetchTrending';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    axios.defaults.baseURL = 'https://api.themoviedb.org/3';
    axios.defaults.params = {
      api_key: '75d8b1353cef49a6219d2708694c471e',
    };

    async function fetchTrending() {
      try {
        const response = await axios.get('trending/movie/day', {
          signal: controller.signal,
        });

        setResponseData(response.data.results);
      } catch (error) {}
    }

    fetchTrending();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      <div>
        <ul>
          {responseData.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`}>{title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Home;
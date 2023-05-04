import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { movieId } = useParams();

  const [responseData, setResponseData] = useState();
  console.log('responseData:', responseData);

  useEffect(() => {
    const controller = new AbortController();

    axios.defaults.baseURL = 'https://api.themoviedb.org/3';
    axios.defaults.params = {
      api_key: '75d8b1353cef49a6219d2708694c471e',
    };

    async function fetchTrending() {
      try {
        const response = await axios.get(`/movie/${Number(movieId)}/reviews`, {
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
    <div>
      <ul>
        {responseData &&
          responseData.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <b>{author}</b>
                <p>{content}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Reviews;

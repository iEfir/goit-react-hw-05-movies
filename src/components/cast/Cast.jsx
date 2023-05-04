import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cast = () => {
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
        const response = await axios.get(`/movie/${Number(movieId)}/credits`, {
          signal: controller.signal,
        });

        setResponseData(response.data.cast);
      } catch (error) {}
    }

    fetchTrending();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <div>
      <ul>
        {responseData &&
          responseData.map(({ id, name, character, profile_path }) => {
            return (
              <li key={id}>
                {profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                    alt={name}
                  />
                )}
                <p>{name}</p>
                <p>{`Character: ${character}`}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Cast;

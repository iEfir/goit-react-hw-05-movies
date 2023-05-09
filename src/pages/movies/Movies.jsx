import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

const Movies = () => {
  const location = useLocation();
  const [responseData, setResponseData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchByFilmsName = searchParams.get('filmsname');

  useEffect(() => {
    if (!searchByFilmsName) return;

    const controller = new AbortController();

    axios.defaults.baseURL = 'https://api.themoviedb.org/3';
    axios.defaults.params = {
      api_key: '75d8b1353cef49a6219d2708694c471e',
      query: `${searchByFilmsName}`,
    };

    async function fetchTrending() {
      try {
        const response = await axios.get('/search/movie', {
          signal: controller.signal,
        });

        setResponseData(response.data.results);
      } catch (error) {}
    }

    fetchTrending();

    return () => {
      controller.abort();
    };
  }, [searchByFilmsName]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ filmsname: form.elements.filmsname.value });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="filmname" />
        <button type="submit">Search</button>
      </form>
      {responseData && (
        <ul>
          {responseData.map(({ id, title }) => {
            return (
              <li key={id}>
                <Link to={`/movies/${id}`} state={{ from: location }}>
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Movies;

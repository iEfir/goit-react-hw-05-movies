import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useParams } from 'react-router-dom';

const MoviesDetails = () => {
  const [responseData, setResponseData] = useState({});
  // console.log('responseData:', responseData);
  const { movieId } = useParams();
  // console.log('movieId:', movieId);
  const [castVisible, setCastVisible] = useState(false);
  console.log('castVisible:', castVisible);
  // const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    axios.defaults.baseURL = 'https://api.themoviedb.org/3';
    axios.defaults.params = {
      api_key: '75d8b1353cef49a6219d2708694c471e',
    };

    async function fetchTrending() {
      try {
        const response = await axios.get(`/movie/${Number(movieId)}`, {
          signal: controller.signal,
        });

        setResponseData(response.data);
      } catch (error) {}
    }

    fetchTrending();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  const toggleCastVisible = () => {
    setCastVisible(castVisible => !castVisible);
  };

  // useEffect(() => {
  //   toggleCastVisible();
  //   if (castVisible) {
  //     navigate('cast');
  //   }
  // }, [castVisible]);

  const { poster_path, title, vote_average, overview, genres } = responseData;
  console.log('genres:', genres);
  // const genresNames = genres.map(({ name }) => {
  //   return name;
  // });
  // console.log('genresNames:', genresNames);

  return (
    <main>
      <div>
        <div>
          <Link to={'/'}>Go back</Link>
          {poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={title}
            />
          )}
        </div>
        <div>
          <h1>{title}</h1>
          <p>Uesr score: {vote_average}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          {genres &&
            genres.map(({ name, id }) => {
              return <p key={id}>{name}</p>;
            })}
        </div>
        <div>
          <h3>Additioanal information</h3>
          <ul>
            <li>
              <Link to={'cast'} onClick={toggleCastVisible}>
                Cast
              </Link>
            </li>
            <li>
              <Link to={'reviews'} onClick={toggleCastVisible}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default MoviesDetails;

import { Suspense, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { Loader } from 'components/reactLoader/Loader';
import {
  AboutFilmContainer,
  CastReviewsContainer,
  DescriptionContainer,
  GoBackLink,
  TumbForBtnNImg,
} from 'components/movieDetailsStyled/MovieDetailsStyled';

const MoviesDetails = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/');
  const [responseData, setResponseData] = useState({});
  const { movieId } = useParams();
  const [castVisible, setCastVisible] = useState(false);
  console.log('castVisible:', castVisible);

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

  const { poster_path, title, vote_average, overview, genres } = responseData;

  return (
    <div>
      <DescriptionContainer>
        <TumbForBtnNImg>
          <GoBackLink to={backLinkLocationRef.current}>Go back</GoBackLink>
          {poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={title}
              width={240}
            />
          )}
        </TumbForBtnNImg>
        <AboutFilmContainer>
          <h2>{title}</h2>
          <p>Uesr score: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          {genres &&
            genres.map(({ name, id }) => {
              return <p key={id}>{name}</p>;
            })}
        </AboutFilmContainer>
      </DescriptionContainer>
      <CastReviewsContainer>
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
      </CastReviewsContainer>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MoviesDetails;

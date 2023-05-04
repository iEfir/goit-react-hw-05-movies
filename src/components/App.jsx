import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './sharedLayout/SharedLayout';
import Home from 'pages/home/Home';
import Movies from 'pages/movies/Movies';
import MoviesDetails from 'pages/movieId/MovieDetails';
import Cast from './cast/Cast';
import Reviews from './reviews/Reviews';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MoviesDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Route>
    </Routes>
  );
}

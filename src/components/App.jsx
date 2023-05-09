import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './sharedLayout/SharedLayout';
const Home = lazy(() => import('pages/home/Home'));
const Movies = lazy(() => import('pages/movies/Movies'));
const MoviesDetails = lazy(() => import('pages/movieId/MovieDetails'));
const Cast = lazy(() => import('./cast/Cast'));
const Reviews = lazy(() => import('./reviews/Reviews'));

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

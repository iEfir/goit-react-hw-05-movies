import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './sharedLayout/SharedLayout';
import Home from 'pages/home/Home';
import Movies from 'pages/movies/Movies';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
      </Route>
    </Routes>
  );
}

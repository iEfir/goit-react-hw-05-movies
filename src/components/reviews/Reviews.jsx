import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ReviewsList, ReviewsListItem } from './Reviews.styled';

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
  }, [movieId]);

  return (
    <div>
      <ReviewsList>
        {responseData && responseData.length > 0 ? (
          responseData.map(({ id, author, content }) => {
            return (
              <ReviewsListItem key={id}>
                <b>{author}</b>
                <p>{content}</p>
              </ReviewsListItem>
            );
          })
        ) : (
          <p>We don't have reviews for tihs movie.</p>
        )}
      </ReviewsList>
    </div>
  );
};

export default Reviews;

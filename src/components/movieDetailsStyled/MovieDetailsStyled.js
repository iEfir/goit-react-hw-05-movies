import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DescriptionContainer = styled.div`
  display: flex;
  gap: 16px;
  box-shadow: 0px 7px 5px -4px rgba(0, 0, 0, 0.38);
`;

export const TumbForBtnNImg = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const GoBackLink = styled(Link)`
  text-decoration: none;
  width: 90px;
  text-align: center;
  border: 2px solid darkgray;
`;
export const AboutFilmContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 8px;
`;

export const CastReviewsContainer = styled.div`
  padding: 16px;
  box-shadow: 0px 7px 5px -4px rgba(0, 0, 0, 0.38);
`;

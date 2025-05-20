import React from "react";
import styled from "styled-components";

const MovieComponent = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease; // 속성 변화 생길 때 0.2초 동안 애니메이션 처리
  cursor: pointer;

  &:hover {
    transform: translateY(-8px); //요소를 위로 이동시킴
  }

  img {
    width: 100%;
    height: auto;
  }

  h3 {
    font-size: 1.1rem;
    margin: 1rem;
    color: rgb(0, 0, 0);
    font-weight: bold;
  }

  p.info {
    margin: 0 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 900;
    color: #424242;
  }

  p {
    margin: 0 1rem 1rem;
    font-size: 0.9rem;
    color: #555;
  }
`;

const MovieCard = ({ movie }) => {
  return (
    <MovieComponent>
      <img src={movie.medium_cover_image} alt={movie.title} />
      <h3>{movie.title_long}</h3>
      <p>{movie.genres.join(", ")}</p>
      <p className="info">
        ⭐ {movie.rating} ⌛{movie.runtime}분
      </p>
    </MovieComponent>
  );
};

export default MovieCard;

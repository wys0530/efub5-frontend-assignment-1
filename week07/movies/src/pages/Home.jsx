import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Main from "../components/Main";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movieList, setMovieList] = useState(null);

  useEffect(() => {
    async function getMovieList() {
      try {
        setMovieList(null);
        const response = await axios.get(
          "https://yts.mx/api/v2/list_movies.json"
        );
        setMovieList(response.data.data.movies);
      } catch (error) {
        console.error(error);
      }
    }
    getMovieList();
  }, []);

  if (!movieList) return null;

  return (
    <>
      <Header />
      <Main>
        {movieList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Main>
    </>
  );
}

export default Home;

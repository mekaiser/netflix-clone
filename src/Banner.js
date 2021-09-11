import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./Requests";

function Banner({ firstTimeLoad, movieOrTvClicked }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let request;
      if (firstTimeLoad) {
        request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      }
      if (!firstTimeLoad) {
        if (
          movieOrTvClicked?.mediaType === "movie" ||
          movieOrTvClicked?.media_type === "movie"
        ) {
          request = await axios.get(
            requests.fetchMovieById(movieOrTvClicked?.id)
          );
          // console.log("REQ", request.data);
          setMovie(request.data);
        } else if (
          movieOrTvClicked?.mediaType === "tv" ||
          movieOrTvClicked?.media_type === "tv"
        ) {
          request = await axios.get(requests.fetchTvById(movieOrTvClicked?.id));
          // console.log("REQ", request.data);
          setMovie(request.data);
        }
      }
      return request;
    }
    fetchData();
  }, [
    firstTimeLoad,
    movieOrTvClicked?.id,
    movieOrTvClicked?.mediaType,
    movieOrTvClicked?.media_type,
    movieOrTvClicked,
  ]);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(
          45deg,
          rgba(0, 0, 0, 1) 25%,
          rgba(0, 0, 0, 0) 100%
        ), url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button banner__playButton">Play</button>
          <button className="banner__button banner__listButton">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

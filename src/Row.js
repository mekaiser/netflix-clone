import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from "react";
import axios from "./axios";
import "./Row.css";

function Row({ title, mediaType = false, fetchUrl, isLargeRow = false, handleSetMovieOrTvClicked}) {
  const [moviesOrTvs, setMoviesOrTvs] = useState([]);
  const rowScroll = useRef(null);
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMoviesOrTvs(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleRowScroll = (leftOrRight) => {
    if (leftOrRight === "left") {
      rowScroll.current.scrollTo({
        left: rowScroll.current.scrollLeft - 100,
        behavior: "smooth",
      });
    } else if (leftOrRight === "right") {
      rowScroll.current.scrollTo({
        left: rowScroll.current.scrollLeft + 100,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters__container">
        <div className="row__posters" ref={rowScroll}>
          {moviesOrTvs.map(
            (movieOrTv) =>
              ((isLargeRow && movieOrTv.poster_path) ||
                (!isLargeRow && movieOrTv.backdrop_path)) && (
                <div>
                  <img
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    key={movieOrTv.id}
                    src={`${base_url}${
                      isLargeRow ? movieOrTv.poster_path : movieOrTv.backdrop_path
                    }`}
                    alt={movieOrTv.name}
                    onClick={() => handleSetMovieOrTvClicked(movieOrTv, mediaType)}
                  ></img>
                  <p className="row__poster__name">
                    {movieOrTv.original_name || movieOrTv.original_title}
                  </p>
                </div>
              )
          )}
        </div>
        <div className="row__slider__right__div">
          <button
            onClick={() => handleRowScroll("left")}
            className="row__slider__right"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="row__slider__left__div">
          <button
            onClick={() => handleRowScroll("right")}
            className="row__slider__left"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Row;

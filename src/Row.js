import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from "react";
import axios from "./axios";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const rowScroll = useRef(null);
  const base_url = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleRowScroll = (leftOrRight) => {
    if (leftOrRight === "left") {
      // rowScroll.current.scrollLeft -= 150;

      rowScroll.current.scrollTo({
        left: rowScroll.current.scrollLeft - 100,
        behavior: "smooth",
      });
    } else if (leftOrRight === "right") {
      // rowScroll.current.scrollLeft += 150;

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
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <div>
                  <img
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    key={movie.id}
                    src={`${base_url}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  ></img>
                  <p className="row__poster__name">
                    {movie.original_name || movie.original_title}
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

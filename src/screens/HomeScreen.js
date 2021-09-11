import React, { useState } from "react";
import Banner from "../Banner";
import Footer from "../Footer";
import Nav from "../Nav";
import requests from "../Requests";
import Row from "../Row";
import "./HomeScreen.css";
// import YTFrameContainer from "./YTFrameContainer";

function HomeScreen() {
  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [movieOrTvClicked, setMovieOrTvClicked] = useState(null);

  const handleSetMovieOrTvClicked = (movieOrTvClicked, mediaType) => {
    const newMovieOrTvClicked = movieOrTvClicked;
    newMovieOrTvClicked.mediaType = mediaType;
    setFirstTimeLoad(false);
    setMovieOrTvClicked(movieOrTvClicked);
  };
  return (
    <div className="homeScreen">
      {/* <YTFrameContainer/> */}
      <Nav />
      <Banner
        firstTimeLoad={firstTimeLoad}
        movieOrTvClicked={movieOrTvClicked}
      />
      <Row
        title="NETFLIX ORIGINALS"
        mediaType="tv"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Trending Now"
        mediaType="movie"
        fetchUrl={requests.fetchTopRated}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Action Movies"
        mediaType="movie"
        fetchUrl={requests.fetchActionMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Comedy Movies"
        mediaType="movie"
        fetchUrl={requests.fetchComedyMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Horror Movies"
        mediaType="movie"
        fetchUrl={requests.fetchHorrorMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Romance Movies"
        mediaType="movie"
        fetchUrl={requests.fetchRomanceMovies}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <Row
        title="Documentaries"
        mediaType="movie"
        fetchUrl={requests.fetchDocumentaries}
        handleSetMovieOrTvClicked={handleSetMovieOrTvClicked}
      />
      <hr className="hr__before__footer" />
      <Footer />
    </div>
  );
}

export default HomeScreen;

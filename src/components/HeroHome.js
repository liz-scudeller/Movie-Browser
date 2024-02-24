import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMovieDetails from "./useMovieDetails";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'



const HeroHome = () => {
  const [topRated, setTopRated] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLoading, runtime: selectedMovieRuntime } = useMovieDetails(selectedMovie?.id);
  const { movieDetails } = useMovieDetails(selectedMovie?.id);


  useEffect(() => {
    if (selectedMovie?.id) {
      // Use movieDetails data as needed
      console.log(movieDetails);
    }
  }, [selectedMovie?.id, movieDetails]);
  
  const renderGenres = () => {
    if (isLoading) {
      return "Loading genres..."; // Handle loading state
    }
  
    if (movieDetails.genres && movieDetails.genres.length > 0) {
      const genreNames = movieDetails.genres.map((genre) => genre.name);
      return genreNames.join(", ");
    }
  
    return "Genres not available";
  };

  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=Canada";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGJkYjMyYTJlYjQ0NmVlY2UwYjMyZTgzMzk1MDE2MyIsInN1YiI6IjY1YmM2YmE3Y2ZmZWVkMDI1OWFjZjhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jURI0QKN2WPYYg7KH5nKg_FhhKvgWyEEMDnNQI41azI",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setTopRated(data.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [url]);

  useEffect(() => {
    if (topRated.length > 0 && !selectedMovie) {
      setSelectedMovie(topRated[0]);
    }
  }, [topRated, selectedMovie]);


  const getPrevIndices = () => {
    const currentIndex = topRated.findIndex(
      (movie) => movie.id === selectedMovie.id
    );
    const prevIndex1 = (currentIndex - 2 + topRated.length) % topRated.length;
    const prevIndex2 = (currentIndex - 1 + topRated.length) % topRated.length;
    return [prevIndex1, prevIndex2];
  };

  const getNextIndices = () => {
    const currentIndex = topRated.findIndex(
      (movie) => movie.id === selectedMovie.id
    );
    const nextIndex1 = (currentIndex + 2) % topRated.length;
    const nextIndex2 = (currentIndex + 1) % topRated.length;
    return [nextIndex1, nextIndex2];
  };


  const handleMovieClick = (movie) => {
    const newIndex = topRated.findIndex((m) => m.id === movie.id);
    setCurrentIndex(newIndex);
    setSelectedMovie(movie);
  };



  const renderTopRated = topRated.map((obj, i) => {
    var posterPath = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
    if (obj.poster_path === null) {
      posterPath = "NoImageAvailable";
    }
    return (
      <div
        key={i}
        className="rectangle-container"
        onClick={() => handleMovieClick(obj)}
      >
        <div className="card">
          <img src={posterPath} className="" alt={obj.original_title} />
        </div>
      </div>
    );
  });

  const backdropUrl =
    selectedMovie && selectedMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path}`
      : "";

  function DateDisplay() {
    const releaseDate = selectedMovie.release_date;

    if (releaseDate) {
      const dateString = new Date(releaseDate).getFullYear();
      return dateString;
    } else {
      return "N/A";
    }
  }

  return (
    <>
      {renderTopRated && (
        <div
          className={`container-lg home-hero`}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,1) 100%), url(${backdropUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            minHeight: "600px",
            position: "relative",

          }}
        >
          <div className="container">
            <div className="row content-60">
              <div className="home-hero-content">
                <div className="">
                  <h3>{selectedMovie ? selectedMovie.title : "Title Placeholder"}</h3>
                  <div className="hero-content-details">
                    <div className="flex-col">
                      <p>
                        {selectedMovie ? `${DateDisplay()} - ${selectedMovieRuntime} - ${renderGenres()}` : "Release date not available"}
                      </p>
                    <Link to={selectedMovie ? `/movies/${selectedMovie.id}` : "#"} className="btn">
                      <FontAwesomeIcon icon={faPlay} size="1x" className="mr-2" />Watch Now
                    </Link>
                    </div>

                  </div>
                </div>
              </div>
              <div className="arrows">

                {/* Previous Movie Arrows */}
                {selectedMovie && topRated.length > 1 && (
                  <>
                    {getPrevIndices().map((prevIndex, index) => (
                      <div
                        key={index}
                        className={`prev-movie-arrow-${index} prev-movie-arrow`}
                        onClick={() => handleMovieClick(topRated[prevIndex])}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${topRated[prevIndex].poster_path}`}
                          alt={`Previous Movie ${index + 1}`}
                        />
                      </div>
                    ))}
                  </>
                )}

                {/* Next Movie Arrows */}
                {selectedMovie && topRated.length > 1 && (
                  <>
                    {getNextIndices().map((nextIndex, index) => (
                      <div
                        key={index}
                        className={`next-movie-arrow-${index} next-movie-arrow`}
                        onClick={() => handleMovieClick(topRated[nextIndex])}

                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${topRated[nextIndex].poster_path}`}
                          alt={`Next Movie ${index + 1}`}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

};

export default HeroHome;
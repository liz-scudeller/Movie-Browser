import Hero from "./Hero";
import MovieCard from "./MovieCard"
import HeroHome from "./HeroHome"
import { useEffect, useState } from 'react';
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import useMovieDetails from './useMovieDetails';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
  const fetch = require('node-fetch');
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genIdName, setGenresIdName] = useState([])




  const urlGenIdName = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const urlNowPlaying = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const urlPopular = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const urlUpcoming = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGJkYjMyYTJlYjQ0NmVlY2UwYjMyZTgzMzk1MDE2MyIsInN1YiI6IjY1YmM2YmE3Y2ZmZWVkMDI1OWFjZjhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jURI0QKN2WPYYg7KH5nKg_FhhKvgWyEEMDnNQI41azI'
    }
  };

  

  useEffect(() => {
    Promise.all([
      fetch(urlNowPlaying, options),
      fetch(urlPopular, options),
      fetch(urlUpcoming, options),
      fetch(urlGenIdName, options)
    ])
      .then(([resNowPlaying, resPopular, resUpcoming, resGenIdName]) =>
        Promise.all([resNowPlaying.json(), resPopular.json(), resUpcoming.json(), resGenIdName.json()])
      )
      .then(([dataNowPlaying, dataPopular, dataUpcoming, dataGenIdName]) => {
        setNowPlaying(dataNowPlaying.results);
        setPopular(dataPopular.results);
        setUpcoming(dataUpcoming.results);
        setGenresIdName(dataGenIdName.genres);
      }).catch(err => console.error('error:' + err));

  }, []);

  const generateMovieResults = (movies, genIdName) => {
    return movies.map((obj, i) => {
      const genIds = obj.genre_ids;
      let genName = "Unknown Genre";

      if (Array.isArray(genIdName)) {
        const matchingGenre = genIdName.find((genre) => genIds.includes(genre.id));

        if (matchingGenre) {
          genName = matchingGenre.name;
        }
      }

      return <MovieCard genre={genName} movie={obj} key={i}></MovieCard>;
    });
  };

  const resultsNowPlaying = generateMovieResults(nowPlaying, genIdName);
  const resultsPopular = generateMovieResults(popular, genIdName);
  const resultsUpcoming = generateMovieResults(upcoming, genIdName);



  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{ ...style, right: "0", top: "0" }}
        onClick={onClick}
      >
        <div className="arrow-icon">
          <FontAwesomeIcon icon={faAngleRight} size="2x" />
        </div>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="slick-arrow"
        style={{ ...style, left: "0", top: "0" }}
        onClick={onClick}
      >
        <div className="arrow-icon">
          <FontAwesomeIcon icon={faAngleRight} size="2x" rotation={180} />
        </div>
      </div>
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>

      <div className="homepage_sections">
        <HeroHome />
        {resultsPopular &&
          <div className="container-lg">
            <div className="row">

              <h2>Popular</h2>
              <div className="slider-container ">
                <Slider {...settings}>
                  {resultsPopular}
                </Slider>
              </div>
            </div>
          </div>
        }
      </div>

      <div className="homepage_sections">
        {resultsNowPlaying &&
          <div className="container-lg">
            <div className="row">
              <h2>Playing Now</h2>
              <div className="slider-container ">
                <Slider {...settings}>
                  {resultsNowPlaying}
                </Slider>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="homepage_sections">
        {resultsUpcoming &&
          <div className="container-lg">
            <div className="row">
              <h2>Upcoming</h2>
              <div className="slider-container ">
                <Slider {...settings}>
                  {resultsUpcoming}
                </Slider>
              </div>
            </div>
          </div>
        }
      </div>
    </>

  )
}
export default Home;
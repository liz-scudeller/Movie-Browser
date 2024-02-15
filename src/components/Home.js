import Hero from "./Hero";
import MovieCard from "./MovieCard"
import {useEffect, useState} from 'react';
import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
    const fetch = require('node-fetch');
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [upcoming, setUpcoming] = useState([]);

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
        fetch(urlUpcoming, options)
    ])
    .then(([resNowPlaying, resPopular,resUpcoming])=>
    Promise.all([resNowPlaying.json(), resPopular.json(), resUpcoming.json()])
    )
    .then(([dataNowPlaying, dataPopular, dataUpcoming]) => {
        setNowPlaying(dataNowPlaying.results);
        setPopular(dataPopular.results);
        setUpcoming(dataUpcoming.results);
    });
}, []);

  
  const resultsNowPlaying = nowPlaying.map((obj, i) => {
    return (
            <MovieCard movie={obj} key={i}></MovieCard>
        )
})

const resultsPopular = popular.map((obj, i) => {
    return (
            <MovieCard movie={obj} key={i}></MovieCard>
        )
})

const resultsUpcoming = upcoming.map((obj, i) => {
    return (
            <MovieCard movie={obj} key={i}></MovieCard>
        )
})
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    adaptiveHeight: true,
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
return(
    <>


<div className="homepage_sections">
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
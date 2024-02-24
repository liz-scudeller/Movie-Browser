import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoImageAvailable from '../No_Image_Available.jpg'

const MovieTrailer = () => {
    const { id } = useParams()
    const [movieTrailer, setMovieTrailer] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [movieVideosList, setMovieVideosList] = useState([])

    const fetch = require('node-fetch');

    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGJkYjMyYTJlYjQ0NmVlY2UwYjMyZTgzMzk1MDE2MyIsInN1YiI6IjY1YmM2YmE3Y2ZmZWVkMDI1OWFjZjhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jURI0QKN2WPYYg7KH5nKg_FhhKvgWyEEMDnNQI41azI'
        }
    };
    useEffect(() => {
        fetch(url, options)
            .then(response => response.json()
                .then(data => {
                    setMovieTrailer(data)
                    setIsLoading(false)
                    console.log(data)
                })
            )
    }, [id])

    const resultsMovieVideosList = movieVideosList.map((obj, i) => {
        return (
            video = { obj }
        )
    })
    function renderMovieTrailers() {
        if (isLoading) {
            return <Hero text="Loading..." />
        }
        if (movieTrailer) {
            var trailerPath = `https://www.youtube.com/watch?v=${movieTrailer.key}`
            console.log(resultsMovieVideosList)
            if (movieTrailer.trailerPath === null) {
                trailerPath = NoImageAvailable
            }
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src={trailerPath} allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return renderMovieTrailers()
};

export default MovieTrailer;
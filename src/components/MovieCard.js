import { Link } from "react-router-dom";
import NoImageAvailable from '../No_Image_Available.jpg'
import { useState, useEffect } from "react";
import useMovieDetails from "./useMovieDetails";


const MovieCard = ({ movie, genre }) => {

    const { runtime } = useMovieDetails(movie.id);

    var posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    if (movie.poster_path === null) {
        posterUrl = NoImageAvailable
    }
    const detailUrl = `/movies/${movie.id}`

    function DateDisplay() {
        const releaseDate = movie.release_date;
      
        if (releaseDate) {
          const year = new Date(releaseDate).getFullYear();
          return year;
        } else {
          return "N/A";
        }
      }


    const rating = Math.ceil(movie.vote_average * 10) / 10;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0
        });
    };

    return (

        <Link onClick={scrollToTop()} className="movie-cards" to={detailUrl} >
            <div className="rectangle-container">
                <div className="card">
                    <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
                    <Link className="add-watchlist">Add to Watchlist</Link>
                    <div className="card-body">
                        <div>
                            <h5 className="card-title">{movie.original_title}</h5>
                            <p className="release-date">{DateDisplay()} - {runtime}</p>
                        </div>

                        <div className="card-flex">
                            <p className="rating">{rating}</p>
                            <p className="genre">{genre}</p>

                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default MovieCard;
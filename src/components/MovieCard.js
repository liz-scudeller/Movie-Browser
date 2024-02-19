import { Link } from "react-router-dom";
import NoImageAvailable from '../No_Image_Available.jpg'
import { useState, useEffect } from "react";

const MovieCard = ({ movie, genre }) => {
    var posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    if(movie.poster_path === null){
        posterUrl = NoImageAvailable
    }
    const detailUrl = `/movies/${movie.id}`  


    

const rating = Math.ceil(movie.vote_average *10) / 10;

const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0
    }); 
  }; 

        return(
        //  <div className="rectangle-container">
        //         <div className="card">
        //             <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
        //          <div className="card-body">
        //              <h5 className="card-title">{movie.original_title}</h5>
        //              <p>{movie.release_date}</p>
        //              <p>{movie.genres}</p>
        //              <Link to={detailUrl} className="btn btn-primary">Show Details</Link>
        //             </div>
        //         </div>
        //     </div>


<Link onClick={scrollToTop()} className="movie-cards" to={detailUrl} >
<div className="rectangle-container">
       <div className="card">
            <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
            <div className="card-body">
                <div>
            <h5 className="card-title">{movie.original_title}</h5>
            <p className="release-date">{movie.release_date}</p>
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
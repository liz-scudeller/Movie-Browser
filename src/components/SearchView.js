import { Link } from "react-router-dom";
import NoImageAvailable from '../No_Image_Available.jpg'
import { useState } from "react";


const MovieCard = ({ movie, onResultClick }) => {
    var posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    if (movie.poster_path === null) {
        posterUrl = NoImageAvailable
    }
    const detailUrl = `/movies/${movie.id}`

    return (

        <Link to={detailUrl} onClick={onResultClick}>
            <div className="result-cards">
                <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
                <div className="cards-info">
                    <h5 className="card-title">{movie.original_title}</h5>
                    <p className="card-text small">movie - {movie.release_date}</p>
                </div>
            </div>
        </Link>
    )
}


const SearchView = ({ keyword, searchResults, onResultClick }) => {
    const resultsHTML = searchResults.map((obj, i) => {
        return (
            <MovieCard 
            movie={obj} 
            key={i}
            onResultClick={onResultClick}
            ></MovieCard>
        )
    })



    if (resultsHTML != 0 || keyword === "") {
        return (
            <>
                {/* <Hero text={title}/> */}
                <div className="results-list">

                    {resultsHTML &&
                        <div className="container">
                            <div className="row">
                                {resultsHTML}
                            </div>
                        </div>
                    }
                </div>
            </>

        )

    } else {
        return (
            <>
                {/* <Hero text={title}/> */}
                <div className="results-list">
                    {resultsHTML &&
                        <div className="container">
                            <div className="row">
                                <p>NO RESULTS FOR {keyword}</p>
                            </div>
                        </div>
                    }
                </div>
            </>

        )
    }

}
export default SearchView;
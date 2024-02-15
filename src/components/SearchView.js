import Hero from "./Hero";
import React, {useState, useEffect} from 'react';

import { Link } from "react-router-dom";
import NoImageAvailable from '../No_Image_Available.jpg'


const MovieCard = ({ movie }) => {
    var posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    if(movie.poster_path === null){
        posterUrl = NoImageAvailable
    }
    const detailUrl = `/movies/${movie.id}`


    // const [isOpen, setIsOpen] = useState(false);

    // function toggle() {
    //   setIsOpen((isOpen) => !isOpen);
    // }


        return(
            // <div className="col-lg-3 col-md-3 col-2 my-4">
            //     <div className="card">
            //         <img src={posterUrl} className="card-img-top" alt={movie.original_title} />
            //         <div className="card-body">
            //             <h5 className="card-title">{movie.original_title}</h5>
            //             <Link to={detailUrl} className="btn btn-primary">Show Details</Link>
            //         </div>
            //     </div>
            // </div>
            <Link to={detailUrl} >
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
    

const SearchView = ({keyword, searchResults}) => {

    // var title = ``;

    // if(keyword === ''){
    //     title = `Please type something to search`;
    // }
    // else{
    //     title = `You are searching for ${keyword}`;

    // }

    const resultsHTML = searchResults.map((obj, i) => {
            return (
                    <MovieCard movie={obj} key={i}></MovieCard>
                )
    })


    if(resultsHTML != 0 || keyword === ""){
        return(
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
        
    }else{
        return(
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
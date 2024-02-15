import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoImageAvailable from '../No_Image_Available.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import YouTube from "react-youtube";



const MovieView = () => {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [recommended, setRecommended] = useState([])
    const [video, setVideo] = useState([])
    const [provider, setProvider] = useState([])

    const urlMovieDetails = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US'`;
    const urlRecommended = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
    const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const urlProvider = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGJkYjMyYTJlYjQ0NmVlY2UwYjMyZTgzMzk1MDE2MyIsInN1YiI6IjY1YmM2YmE3Y2ZmZWVkMDI1OWFjZjhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jURI0QKN2WPYYg7KH5nKg_FhhKvgWyEEMDnNQI41azI'
        },
      };
    
      useEffect(() => {
        Promise.all([
            fetch(urlMovieDetails, options),
            fetch(urlRecommended, options),
            fetch(urlVideos,options),
            fetch(urlProvider,options)
        ])
        .then(([resMovieDetails, resRecommended, resVideos, resProvider])=>
        Promise.all([resMovieDetails.json(), resRecommended.json(), resVideos.json(), resProvider.json()])
        )
        .then(([dataMovieDetails, dataRecommended, dataVideos, dataProvider]) => {
            setMovieDetails(dataMovieDetails);
            setIsLoading(false);
            setRecommended(dataRecommended.results);
            setVideo(dataVideos.results);
            setProvider(dataProvider);
            console.log(dataMovieDetails);
            console.log(dataProvider.results.CA);

        });
    }, [id]);

  const resultsRecommended = recommended.map((obj, i) => {
    return (
            <MovieCard movie={obj} key={i}></MovieCard>
        )
})

// const resultsProviders = provider.map((obj, i) => {
//   return (
//           <ul>
//             <li key={i}>{obj}</li>
//           </ul>
//       )
// })

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "grid", background: "rgba(0,0,0,0.9)", height: "100%", borderRadius:"0", alignItems:"center", position:"absolute" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "grid", background: "rgba(0,0,0,0.9)", height: "100%", borderRadius:"0", alignItems:"center" }}
      onClick={onClick}
    />
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
    nextArrow: <FontAwesomeIcon icon="fa-solid fa-chevron-right" />,
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

  function renderMovieDetails() {
   
     const renderTrailer = () => {
         var trailer = movieDetails.videos.results.findLast(vid=> vid.name === 'Official Trailer' || (vid.name).includes("trailer") || (vid.name).includes("Trailer") || (vid.name).includes("Official"))
         
         if(trailer === undefined){
          
        }
        else{
          var trailerKey = trailer.key
          return(
           <YouTube
           videoId={trailerKey}
           className={"youtube amru"}
           containerClassName={"youtube-container amru"}
           opts={
            {
            width:"100%",
            height:"100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              cc_load_policy: 0,
              fs: 0,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
           },
           
           }
          }
           />
             
          )
        }
     }


        if(isLoading){
            return <Hero text="Loading..." />
        }
        if(movieDetails){
            var posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
            if(movieDetails.poster_path === null){
                posterPath = NoImageAvailable
            }
            
            const backdropUrl = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`

            return(
            <>
            <Hero movie={movieDetails} trailer={renderTrailer()} posterUrl={posterPath} text={movieDetails.original_title} description={movieDetails.overview} backdrop={backdropUrl} />
            
            
            <div className="homepage_sections">
    <div className="container-lg">
        <div className="row">
            <h2>{movieDetails.original_title}</h2>
            {/* {resultsProviders} */}
        </div>
    </div>
</div>   
            
            <div className="homepage_sections">
        {resultsRecommended &&
    <div className="container-lg">
        <div className="row">
            <h2>You May Also Like</h2>
            <div className="slider-container ">
                <Slider {...settings}>
                    {resultsRecommended}
                </Slider>
            </div>
        </div>
    </div>
    }
</div>           
            </>
            ) 
        }
    }

    return renderMovieDetails()
};
export default MovieView;
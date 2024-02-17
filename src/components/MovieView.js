import Hero from "./Hero";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NoImageAvailable from '../No_Image_Available.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "./MovieCard";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'


const MovieView = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [recommended, setRecommended] = useState([])
    const [video, setVideo] = useState([])
    const [movieDetails, setMovieDetails] = useState({})
    const [provider, setProvider] = useState([])
    const [providerBuy, setProviderBuy] = useState([])
    const [providerRent, setProviderRent] = useState([])
    const [providerFlat, setProviderFlat] = useState([])
    const [gen, setGenres] = useState([])
    const [runtime, setRuntime] = useState('');
    const arrowLeft = <FontAwesomeIcon icon={faChevronLeft} />
    const arrowRight = <FontAwesomeIcon icon={faChevronRight} />

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
            setProvider(dataProvider.results.CA);
            setProviderBuy(dataProvider.results.CA.buy);
            setProviderRent(dataProvider.results.CA.rent);
            setProviderFlat(dataProvider.results.CA.flatrate);
            setGenres(dataMovieDetails.genres);

            const runtimeInMinutes = dataMovieDetails.runtime;
            const formattedRuntime = convertToHoursAndMinutes(runtimeInMinutes);
            setRuntime(formattedRuntime);

        })
        .catch(err => console.error('error:' + err));
    }, [id]);

    const convertToHoursAndMinutes = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    };
  

    const renderGenres = gen? (gen.map((gen, i) => {
       return (
               `${gen.name}, `
              )
               })
              ) : null;

              const resultsProvidersFlat = providerFlat ? (
                providerFlat.map((obj, i) => {
                  const pathProviderFlat = `https://media.themoviedb.org/t/p/original${obj.logo_path}`;
                  return (
                    <img key={i} src={pathProviderFlat} alt={`Provider ${i + 1}`} />
                  );
                })
              ) : null;

          const resultsProvidersBuy = providerBuy ? (
            providerBuy.map((obj, i) => {
              const pathProviderBuy = `https://media.themoviedb.org/t/p/original${obj.logo_path}`;
              return (
                <img key={i} src={pathProviderBuy} alt={`Provider ${i + 1}`} />
              );
            })
          ) : null;
          
 

          const resultsProvidersRent = providerRent ? (
            providerRent.map((obj, i) => {
              const pathProviderRent = `https://media.themoviedb.org/t/p/original${obj.logo_path}`;
              return (
                <img key={i} src={pathProviderRent} alt={`Provider ${i + 1}`} />
              );
            })
          ) : null;

 const resultsRecommended = recommended.map((obj, i) => {
  return (
          <MovieCard genre={obj.genre_ids} movie={obj} key={i}></MovieCard>
      )
})


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{ ...style, right:"0", top:"0" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{ ...style, left:"0", top:"0" }}
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
    adaptiveHeight: false,
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
  function DateDisplay(){
    const releaseDate = movieDetails.release_date
    const dateString = new Date().getFullYear(releaseDate);

    return dateString
  }
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
            
            
            <div className="sections">
    <div className="container-md">
        <div className="row">
          <div className="col-md-3">
            <div className="poster_img sections">
              <img src={posterPath} alt= "Poster" className="img-fluid shadow rounded" />
            </div>
            <div className="sections">
              <h4>Genres</h4>
              <p>{renderGenres}</p>
            </div>
            <div className="sections">
              <h4>Runtime</h4>
              <p>{runtime}</p>
            </div>
          </div>
          <div className="col-md-9">
            <div className="md-movie-info sections">
              <h2>{movieDetails.original_title}</h2>
              <p className="info-date">({ DateDisplay() })</p>
            </div>
            <div className="watch-now">
            {resultsProvidersBuy &&
              <div className="providers">
                <div className="provider-title">
                <h4>Buy</h4>
              </div>  
              {resultsProvidersBuy}
              </div>      
            }
            {resultsProvidersRent &&
              <div className="providers">
                <div className="provider-title">
                  <h4>Rent</h4>
                </div>
              {resultsProvidersRent}
              </div>
            }
            {resultsProvidersFlat &&
              <div className="providers">
                <div className="provider-title">
                <h4>Stream</h4>
                </div>
              {resultsProvidersFlat}
              </div>        
            }
            </div>

          </div>
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
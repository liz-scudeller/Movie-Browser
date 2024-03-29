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
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'


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
  const [genIdName, setGenresIdName] = useState([])
  const [cast, setCast] = useState([])
  const [runtime, setRuntime] = useState('');


  const urlGenIdName = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
  const urlMovieDetails = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits&language=en-US`;
  const urlRecommended = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const urlProvider = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;

  // https://image.tmdb.org/t/p/w200/7UIm9RoBnlqS1uLlbElAY8urdWD.jpg (cast image)

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
      fetch(urlVideos, options),
      fetch(urlProvider, options),
      fetch(urlGenIdName, options)
    ])
      .then(([resMovieDetails, resRecommended, resVideos, resProvider, resGenIdName]) =>
        Promise.all([resMovieDetails.json(), resRecommended.json(), resVideos.json(), resProvider.json(), resGenIdName.json()])
      )
      .then(([dataMovieDetails, dataRecommended, dataVideos, dataProvider, dataGenIdName]) => {
        setMovieDetails(dataMovieDetails);
        setIsLoading(false);
        setRecommended(dataRecommended.results);
        setVideo(dataVideos.results);
        setProvider(dataProvider.results.CA);
        setProviderBuy(dataProvider.results.CA?.buy || []);
        setProviderRent(dataProvider.results.CA?.rent || []);
        setProviderFlat(dataProvider.results.CA?.flatrate || []);
        setGenres(dataMovieDetails.genres);
        setGenresIdName(dataGenIdName.genres);
        setCast(dataMovieDetails.credits.cast)
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


const renderCast = (cast) => cast ? (
  cast.map((obj, i) => {
    const pathCast = obj.profile_path ? `https://image.tmdb.org/t/p/w200/${obj.profile_path}` : NoImageAvailable;
    
    return (
      <div key={i}>
        <img className="cast-image" src={pathCast} alt={obj.name} />
        <p className="text-center">{obj.name}</p>
      </div>
    );
  })
) : null;


  const resultsCast = renderCast(cast);
  
  const renderGenres = (gen) => gen ? gen.map((gen, i) => gen.name).join(', ') : null;

  const renderProviders = (providers) => providers ? (
    providers.map((obj, i) => {
      const pathProvider = `https://media.themoviedb.org/t/p/original${obj.logo_path}`;
      return <img key={i} src={pathProvider} alt={`Provider ${i + 1}`} />;
    })
  ) : null;

  const resultsProvidersFlat = renderProviders(providerFlat);
  const resultsProvidersBuy = renderProviders(providerBuy);
  const resultsProvidersRent = renderProviders(providerRent);



  const resultsRecommended = recommended.map((obj, i) => {
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
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  var settingscast = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    initialSlide: 0,
    adaptiveHeight: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2
        }
      }
    ]
  };

  function DateDisplay() {
    const releaseDate = movieDetails.release_date;

    if (releaseDate) {
      const dateString = new Date(releaseDate).getFullYear();
      return dateString;
    } else {
      return "N/A"; // Or handle the case where releaseDate is not available
    }
  }

  function renderMovieDetails() {

    const renderTrailer = () => {
      var trailer = movieDetails.videos.results.findLast(vid => vid.name === 'Official Trailer' || (vid.name).includes("trailer") || (vid.name).includes("Trailer") || (vid.name).includes("Official"))

      if (trailer === undefined) {
        return(
          null
        );
        
      }
      else {
        var trailerKey = trailer.key
        return (
          <YouTube
            videoId={trailerKey}
            className={"youtube amru"}
            containerClassName={"youtube-container amru"}
            opts={
              {
                width: "100%",
                height: "100%",
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

        );
      }
    }


    if (isLoading) {
      return <Hero text="Loading..." trailer={true}/>
    }
    if (movieDetails) {
      var posterPath = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
      if (movieDetails.poster_path === null) {
        posterPath = NoImageAvailable
      }

      const backdropUrl = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`

      return (
        <>
          <Hero movie={movieDetails} trailer={renderTrailer()} posterUrl={posterPath} text={movieDetails.original_title} description={movieDetails.overview} backdrop={backdropUrl} />


          <div className="sections">
            <div className="container-md">
              <div className="row">
              <div className="md-movie-info sections">
                    <h2 className="movie-title">{movieDetails.original_title}</h2>
                    <p className="info-date">({DateDisplay()})</p>
                  </div>
                <div className="col-md-3">
                  <div className="poster-img sections">
                    <img src={posterPath} alt="Poster" className="img-fluid shadow rounded" />
                  </div>
                  <div className="sections">
                    <h4>Status</h4>

                    <p>{movieDetails.status} ({movieDetails.release_date})</p>
                  </div>
                  <div className="sections">
                    <h4>Genres</h4>
                    <p>{renderGenres(gen)}</p>
                  </div>
                  <div className="sections-no-border">
                    <h4>Runtime</h4>
                    <p>{runtime}</p>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="watch-now">
                    {providerBuy && providerBuy.length > 0 ? (
                      <div className="providers">
                        <div className="provider-title">
                          <h4>Buy</h4>
                        </div>
                        {resultsProvidersBuy}
                      </div>
                    ) : (
                      <div>
                        <div className="providers">
                          <div className="provider-title">
                            <h4>Buy</h4>
                          </div>
                          <p>{movieDetails.original_title} is not available to buy</p>
                        </div>
                      </div>
                    )}
                    {providerRent && providerRent.length > 0 ? (
                      <div className="providers">
                        <div className="provider-title">
                          <h4>Rent</h4>
                        </div>
                        {resultsProvidersRent}
                      </div>
                    ) : (
                      <div className="providers">
                        <div className="provider-title">
                          <h4>Rent</h4>
                        </div>
                        <p>{movieDetails.original_title} is not available for rent</p>
                      </div>
                    )}
                    {providerFlat && providerFlat.length > 0 ? (
                      <div className="providers">
                        <div className="provider-title">
                          <h4>Stream</h4>
                        </div>
                        {resultsProvidersFlat}
                      </div>
                    ) : (
                      <div className="providers">
                        <div className="provider-title">
                          <h4>Stream</h4>
                        </div>
                        <p>{movieDetails.original_title} is not available for streaming</p>
                      </div>
                    )}
                  </div>
                  {cast ? 
                  <div className="slider-container sections">
                    <h4>Cast</h4>
                  <Slider {...settingscast}>
                    {resultsCast}
                  </Slider>
                </div>
                  :
                  null
                  }
                  
                </div>
              </div>
            </div>
          </div>

          <div className="homepage-sections">
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
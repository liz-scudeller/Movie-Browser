import { useState, useEffect } from 'react';

const useMovieDetails = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [video, setVideo] = useState([]);
  const [provider, setProvider] = useState([]);
  const [providerBuy, setProviderBuy] = useState([]);
  const [providerRent, setProviderRent] = useState([]);
  const [providerFlat, setProviderFlat] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genresIdName, setGenresIdName] = useState([]);
  const [runtime, setRuntime] = useState('');
  

  const urlMovieDetails = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US`;
  const urlRecommended = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const urlProvider = `https://api.themoviedb.org/3/movie/${id}/watch/providers`;
  const urlGenIdName = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGJkYjMyYTJlYjQ0NmVlY2UwYjMyZTgzMzk1MDE2MyIsInN1YiI6IjY1YmM2YmE3Y2ZmZWVkMDI1OWFjZjhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jURI0QKN2WPYYg7KH5nKg_FhhKvgWyEEMDnNQI41azI',
    },
  };

  useEffect(() => {

    if (typeof id === 'undefined') {
      return;
    }

    Promise.all([
      fetch(urlMovieDetails, options),
      fetch(urlRecommended, options),
      fetch(urlVideos, options),
      fetch(urlProvider, options),
      fetch(urlGenIdName, options),
    ])
      .then(([resMovieDetails, resRecommended, resVideos, resProvider, resGenIdName]) =>
        Promise.all([
          resMovieDetails.json(),
          resRecommended.json(),
          resVideos.json(),
          resProvider.json(),
          resGenIdName.json(),
        ])
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
        const runtimeInMinutes = dataMovieDetails.runtime;
        const formattedRuntime = runtimeInMinutes
          ? convertToHoursAndMinutes(runtimeInMinutes)
          : 'N/A';
        setRuntime(formattedRuntime);      })
      .catch((err) => console.error('error:' + err));
  }, [id]);

  const convertToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return {
    isLoading,
    movieDetails,
    recommended,
    video,

    genres,
    genresIdName,
    runtime,
  };
};

export default useMovieDetails;

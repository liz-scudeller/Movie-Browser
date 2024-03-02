import './App.css';
import {useState, useEffect} from 'react';
import Home from './components/Home';
import AboutView from './components/AboutView';
import Navbar from './components/Navbar';
import SearchView from './components/SearchView'
import MovieView from './components/MovieView'
import PageNotFound from './components/404Page'
import { Form, Route, Routes } from 'react-router-dom';

function App() {

const [searchResults, setSearchResults] = useState([]);
const [searchText, setSearchText] = useState('');

const onResultClick = () => {
  setSearchResults([]);
  setSearchText('');
};

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=7dbdb32a2eb446eece0b32e833950163&language=en-US&query=${searchText}&page=1&include_adult=false`)
  .then(response => response.json())
  .then(data =>{
    setSearchResults(data.results)
  })
}, [searchText])

  return (
    <div className='app_navbar'>
      <div className='app-navbar-search'>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <SearchView keyword={searchText} searchResults ={searchResults} onResultClick={onResultClick}/>
      </div>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/about" element={<AboutView/>} />     
        <Route path="/movies/:id" element={<MovieView />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App;

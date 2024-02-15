import {useNavigate, Link} from 'react-router-dom';

const Navbar = ({searchText, setSearchText}) => {
// const history = useNavigate()

const updateSearchText = (e) => {
  // history('/search')
  setSearchText(e.target.value);
}

  return(
    <div className='container-lg'>

<nav className="navbar navbar-expand-lg  my-1">
  <Link className="navbar-brand" to="/">Movie Browser</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">About</Link>
      </li>
    </ul>
    <form className="form-inline my-2">
      <div className="input-group mx-2">
        <input className="form-control" type="search" placeholder="Search" value={searchText} onChange={updateSearchText} />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </div>
    </form>
  </div>
</nav>
    </div>

    )
}

export default Navbar;

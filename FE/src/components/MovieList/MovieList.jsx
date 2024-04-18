import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieService } from "../../services/movies";
import { setMovies } from "../../store/slice/movies";
import MovieItem from "../MovieItem/MovieItem";
import "./index.css";
import Popup from "../Popup/Popup";
import { useLocation, useNavigate } from "react-router-dom";
import { generateArray } from "../../utils/generateArray";
export default function MovieList() {
  const { movies } = useSelector((state) => state.movies);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState({});
  const navigate = useNavigate();
  let location = useLocation();

  const page = Number(location.search.replace("?", "").split("=")[1]);

  const openPopup = (id) => {
    setCurrentMovie(movies.data.filter((item) => item._id === id));
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const data = await movieService.getMovies(page);
      dispatch(setMovies({ movies: data }));
    };
    fetch();
  }, [location.search]);
  console.log(movies);
  return (
    <>
      {movies.length === 0 ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className="page-btn">
            {generateArray(movies.totalPages).map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(`/?page=${item + 1}`)}
              >
                {item + 1}
              </button>
            ))}
          </div>
          <div className="movie-list-container">
            <h3 className="title">Most Popular Movies</h3>
            <div className="grid-movie-item">
              {movies.data.map((movie) => (
                <MovieItem
                  key={movie._id}
                  movie={movie}
                  openPopup={openPopup}
                />
              ))}
            </div>
          </div>
          <Popup
            isOpen={isPopupOpen}
            onClose={closePopup}
            currentMovie={currentMovie}
          />
        </>
      )}
    </>
  );
}

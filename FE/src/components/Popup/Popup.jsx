/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { FaPlay } from "react-icons/fa";
import "./index.css";
import { IoClose } from "react-icons/io5";

export default function Popup({ isOpen, onClose, currentMovie }) {
  const { name, image, year, time, introduce } =
    currentMovie.length > 0 ? currentMovie[0] : "";
  return (
    <div className="modal-popup">
      <Modal
        ariaHideApp={false}
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
            overflow: "hidden",
          },
          content: {
            height: "fit-content",
            width: "50vw",
            margin: "0 auto",
            borderRadius: 15,
          },
        }}
      >
        <div className="popup-container">
          <div className="popup-img-container">
            <img src={image} alt={name} />
          </div>
          <div className="popup-content-container">
            <h2>{name}</h2>
            <p>
              {time} min {year}
            </p>
            <p>{introduce}</p>
            <button className="play-movie-btn">
              <FaPlay />
              <p>Play Movie</p>
            </button>
            <button className="close-btn" onClick={onClose}>
              <IoClose size={30} />
            </button>
          </div>
        </div>
        {/* <button onClick={onClose}>Close</button> */}
      </Modal>
    </div>
  );
}

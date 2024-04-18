import { useState } from "react";
import "./index.css";
export default function MovieItem(newProps) {
  const { name, image, time, year, introduce, _id } = newProps.movie;
  const { openPopup } = newProps;
  return (
    <div className="move-item-container" onClick={() => openPopup(_id)}>
      <img className="movie-img" src={image} alt={name} />
      <p className="movie-name">{name}</p>
      <span>{time} min</span>
      <span> {year}</span>
    </div>
  );
}

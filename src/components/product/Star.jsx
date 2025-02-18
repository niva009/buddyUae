import React from "react";

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <span key={i} className="text-yellow-400">
        &#9733;
      </span>
    );
  }
  for (let i = rating; i < 5; i++) {
    stars.push(
      <span key={i} className="text-zinc-300">
        &#9733;
      </span>
    );
  }
  return stars;
};

export default RatingStars;

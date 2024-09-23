import React from 'react';
import './PodiumCard.css'; 

const PodiumCard = ({ bid, position }) => {
  return (
    <div className="podiumcard">
      <h2>Position: {position}</h2>
      <h3>Beneficiary: {bid._beneficiary}</h3>
      <p>Price per Land in MANA: {bid._pricePerLandInMana}</p>
      <p>Coordinates: ({bid._xs[0]}, {bid._ys[0]})</p>
    
    </div>
  );
};

export default PodiumCard;


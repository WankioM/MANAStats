import React from 'react';
import './PodiumCard.css'; 

const PodiumCard = ({ bid, position }) => {
  return (
    <div className="podiumcard">
      <h2 className='hrank'> {position}</h2>
      <h3 className='hbidder'>Bidder {bid._beneficiary}</h3>
      <p className='hbidprice'>Bid Price {bid._pricePerLandInMana}</p>
      <p className='hlocation'>Location({bid._xs[0]}, {bid._ys[0]})</p>
    
    </div>
  );
};

export default PodiumCard;


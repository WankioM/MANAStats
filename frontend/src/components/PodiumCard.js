import React from 'react';
import './PodiumCard.css'; 

const PodiumCard = ({ bid, position }) => {
  return (
    <div className="card podiumcard">
      <div className="card-header">
        <img src="position-icon-url-here" alt="Position Icon" className="position-icon" />
        <h2 className="hrank">{position}</h2>
      </div>

      <div className="card-body">
        <h3 className="hbidder">Bidder: {bid._beneficiary}</h3>
                <div className="info">
          <div className="bid-price">
            <img src="bid-icon-url-here" alt="Bid Icon" className="icon" />
            <span className="hbidprice">Bid Price: {bid._pricePerLandInMana}</span>
          </div>
          
          <div className="location">
            <img src="location-icon-url-here" alt="Location Icon" className="icon" />
            <span className="hlocation">Location: ({bid._xs[0]}, {bid._ys[0]})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodiumCard;


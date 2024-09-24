import React from 'react';
import './PodiumCard.css'; 
import { FaMapMarkerAlt } from 'react-icons/fa';

const PodiumCard = ({ bid, position }) => {
  return (
    <div className="card podiumcard">
      <div className="card-header">

        <img 
          src="https://gallery.yopriceville.com/var/albums/Free-Clipart-Pictures/Trophy-and-Medals-PNG/Gold_Cup_Transparent_Image.png?m=1629819139"
          alt="Position Icon"
          className="position-icon"
          style={{
            maxWidth: "50px", 
            maxHeight: "50px"
          }} 
        />

        <h2 className="hrank">{position}</h2>
      </div>

      <div className="card-body">
        <p className="hbidder">Bidder: {bid._beneficiary}</p>
          <div className="info">
            <div className="bid-price">
            <img 
              src="https://cdn3d.iconscout.com/3d/premium/thumb/mana-4721557-3921417.png?f=webp" 
              style={{
                maxWidth: "50px", 
                maxHeight: "50px"
              }} 
            />

              <span className="hbidprice">Bid Price: {bid._pricePerLandInMana}</span>
            </div>
            
          <div className="location">
            <FaMapMarkerAlt style={{ color: 'white', fontSize: '18px' }} />
            <span className="hlocation"> ({bid._xs[0]}, {bid._ys[0]})</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PodiumCard;


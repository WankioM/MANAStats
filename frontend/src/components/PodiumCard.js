import React from 'react';
import './PodiumCard.css'; 
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaCertificate } from 'react-icons/fa';
import { FaMedal } from 'react-icons/fa';

const PodiumCard = ({ bid, position }) => {
  return (
    <div className="card podiumcard">
      <div className="card-header">

        <FaMedal style={{ color: 'gold', fontSize: '48px', paddingTop: '10px' }} />

        <h2 className="hrank">{position}</h2>
      </div>

      <div className="card-body">
        <p className="hbidder">Bidder</p>
        <p className="hbidder"> {bid._beneficiary}</p>
          <div className="info">
            <div className="bid-price">
            

              <span className="hbidprice">Bid Price</span>
              <div className='pricechild'> 
                <img 
                src="https://cdn3d.iconscout.com/3d/premium/thumb/mana-4721557-3921417.png?f=webp" 
                style={{
                  maxWidth: "30px", 
                  maxHeight: "30px"
                }} 
              />
              <span className= 'liftspan'>{bid._pricePerLandInMana}</span></div>
            </div>
            
          <div className="location">
            <FaMapMarkerAlt style={{ color: 'white', fontSize: '18px' }} />
            <span className="hlocation">  ({bid._xs[0]}, {bid._ys[0]})</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PodiumCard;


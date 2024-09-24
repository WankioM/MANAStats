import React from 'react';
import './LeaderBoardRow.css'; 


const LeaderBoardRow = ({ bid, position }) => {
  return (
    <div className="leaderboardrow">
      <p>{position}</p>
      <p> {bid._beneficiary}</p>
      <div className='pricediv'>
      <img 
        src="https://cdn3d.iconscout.com/3d/premium/thumb/mana-4721557-3921417.png?f=webp" 
        style={{
          maxWidth: "30px", 
          maxHeight: "30px"
        }}
        />
      <p> {bid._pricePerLandInMana}</p>
      </div>

      <p> ({bid._xs[0]}, {bid._ys[0]})</p>
    
    </div>
  );
};

export default LeaderBoardRow;
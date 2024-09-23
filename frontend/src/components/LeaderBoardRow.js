import React from 'react';
import './LeaderBoardRow.css'; 


const LeaderBoardRow = ({ bid, position }) => {
  return (
    <div className="leaderboardrow">
      <p>Position: {position}</p>
      <p>Beneficiary: {bid._beneficiary}</p>
      <p>Price per Land in MANA: {bid._pricePerLandInMana}</p>
      <p>Coordinates: ({bid._xs[0]}, {bid._ys[0]})</p>
    
    </div>
  );
};

export default LeaderBoardRow;
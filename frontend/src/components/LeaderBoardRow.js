import React from 'react';
import './LeaderBoardRow.css'; 


const LeaderBoardRow = ({ bid, position }) => {
  return (
    <div className="leaderboardrow">
      <p>{position}</p>
      <p> {bid._beneficiary}</p>
      <img src='https://img.icons8.com/?size=100&id=24643&format=png&color=000000' width="30" height="30"></img>
      <p> {bid._pricePerLandInMana}</p>
            <p> ({bid._xs[0]}, {bid._ys[0]})</p>
    
    </div>
  );
};

export default LeaderBoardRow;
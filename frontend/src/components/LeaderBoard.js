import React from 'react';
import './LeaderBoard.css'; 
import PodiumCard from './PodiumCard';
const LeaderBoard = () => {
  return (
    <div className="leaderboard">
      <div className='Cards'>
      <PodiumCard />
      <PodiumCard />
      <PodiumCard />
      </div>

    </div>
  );
};

export default LeaderBoard;
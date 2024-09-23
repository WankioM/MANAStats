import React from 'react';
import './LeaderBoard.css'; 
import PodiumCard from './PodiumCard';
const LeaderBoard = () => {
  return (
    <div className="leaderboard">
      <p> Leaderboard </p>
      <PodiumCard />
      <PodiumCard />
      <PodiumCard />
    </div>
  );
};

export default LeaderBoard;
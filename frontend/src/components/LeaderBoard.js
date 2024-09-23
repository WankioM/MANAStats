import React from 'react';
import './LeaderBoard.css'; 
import PodiumCard from './PodiumCard';
import { useQuery, gql } from '@apollo/client';

const GET_BID_SUCCESSFULS = gql`
  query {
    bidSuccessfuls(first: 15, orderBy: _pricePerLandInMana) {
      id
      _pricePerLandInMana
      _xs
      _ys
      _beneficiary
    }
  }
`;


const LeaderBoard = () => {

  const { loading, error, data } = useQuery(GET_BID_SUCCESSFULS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  console.log ('Data from Subraph', data);
  const top3 = data.bidSuccessfuls.slice(0, 3);
  
  return (
    <div className="leaderboard">
      <div className='Cards'>
      {top3.map((bid, index) => (
        <PodiumCard key={bid.id} bid={bid} position={index + 1} />
      ))}
      </div>

    </div>
  );
};

export default LeaderBoard;
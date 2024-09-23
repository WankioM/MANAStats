import React from 'react';
import './LeaderBoard.css'; 
import PodiumCard from './PodiumCard';
import { useQuery, gql } from '@apollo/client';

const GET_BID_SUCCESSFULS = gql`
  query {
    bidSuccessfuls(first: 15, orderBy: _pricePerLandInMana) {
      id
      _pricePerLandInMana
      _manaAmountToBurn
      _token
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
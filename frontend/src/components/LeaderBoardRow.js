import React , {useState} from 'react';
import './LeaderBoardRow.css'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';


const LeaderBoardRow = ({ bid, position }) => {

  const [copied, setCopied] = useState(false);

  return (
    <div className="leaderboardrow">
      <p>{position}</p>
      <div className='copyable2'>
      <p> {bid._beneficiary}</p>
        <CopyToClipboard text={bid._beneficiary} onCopy={() => setCopied(true)}>
            <button style={{ color: 'rgba(95, 32, 44,0.1)' }}>
            <FaCopy style={{ color: 'rgba(95, 32, 44,0.7)' }} />
            </button>
        </CopyToClipboard>
        </div>

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
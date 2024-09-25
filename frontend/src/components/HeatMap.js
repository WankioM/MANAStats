import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './HeatMap.css'; 
import { useQuery, gql } from '@apollo/client';

const GET_BID_DATA = gql`
  query {
    bidSuccessfuls{
      _pricePerLandInMana
      _xs
      _ys
      _beneficiary
    }
  }
`;

const Renderer = ({ rectangles, xScale, yScale, colorScale }) => (
    <>
      {rectangles.map((rect, i) => (
        <rect
          key={i}
          {...rect}
          onMouseEnter={(e) => {
            const tooltip = document.getElementById('tooltip');
            tooltip.style.left = `${e.clientX}px`;
            tooltip.style.top = `${e.clientY}px`;
            tooltip.style.display = 'block';
            tooltip.innerHTML = `Price: ${rect.price} MANA`;
          }}
          onMouseLeave={() => {
            const tooltip = document.getElementById('tooltip');
            tooltip.style.display = 'none';
          }}
        />
      ))}
    </>
  );


const Heatmap = () => {
  const svgRef = useRef();
  const { loading, error, data } = useQuery(GET_BID_DATA);
  const [rectangles, setRectangles] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [colorScale, setColorScale] = useState(() => d3.scaleSequential().interpolator(d3.interpolateInferno).domain([0, 1])); // Initial color scale

  const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };
  const width = 900;
  const height = 900;

  useEffect(() => {
    if (loading || error) return; 

  
    const landData = [];
    data.bidSuccessfuls.forEach(plot => {
      plot._xs.forEach((x, i) => {
        landData.push({
          x: parseInt(x), 
          y: parseInt(plot._ys[i]), 
          price: parseInt(plot._pricePerLandInMana), 
          beneficiary: plot._beneficiary
        });
      });
    });

    landData.sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y; 
      }
      return a.x - b.x; 
    });

   
    const xValues = landData.map(d => d.x);
    const yValues = landData.map(d => d.y);
    const prices = landData.map(d => d.price);

    console.log('X Coordinates:', xValues);
    console.log('Y Coordinates:', yValues);
    console.log('Prices:', prices);


    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const allYGroups = [...new Set(landData.map(d => d.y))];
    const allXGroups = [...new Set(landData.map(d => d.x))];


    const xScale = d3.scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);

    const yScale = d3.scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);

  
    const [min, max] = d3.extent(landData, d => d.price);

    if (!min || !max) {
      return null;
    }


    const newColorScale = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([min, max]);

    setColorScale(newColorScale);


    const allRects = landData.map((d, i) => {
      return (
        <rect
          key={i}
          r={4}
          x={xScale(d.x)}
          y={yScale(d.y)}
          width={xScale.bandwidth()*3}
          height={yScale.bandwidth()*3}
          opacity={0.7}
          fill={newColorScale(d.price)}
          rx={2}
          stroke={"white"}
        />
      );
    });

    setRectangles(allRects);
    
    const newXLabels = allXGroups.filter((_, i) => i % 5 === 0).map((name, i) => {
      const xPos = xScale(name) ?? 0;
      return (
        <text
          key={i}
          x={xPos + xScale.bandwidth() / 2}
          y={height - MARGIN.bottom + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
        >
          {name}
        </text>
      );
    });

    const newYLabels = allYGroups.filter((_, i) => i % 5 === 0).map((name, i) => {
      const yPos = yScale(name) ?? 0;
      return (
        <text
          key={i}
          x={-10} 
          y={yPos + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={10}
        >
          {name}
        </text>
      );
    });

    setXLabels(newXLabels);
    setYLabels(newYLabels);
  }, [loading, error, data]); 

  return (
    <div className='map'>
      <p> Heat Map</p>

      <p>
        This interactive visualization highlights the land plots that received the highest bids in recent auctions. Each colored rectangle represents a specific plot of land, with the intensity of the color indicating the bid amount—darker shades signify higher bids. Explore the map to discover which locations are most sought after, helping you make informed decisions in your land investments. 
      </p>
      <span>The colors represent bid activity</span>

      
      <svg width="1000" height="1000">
        <g
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        >
          {rectangles}
          {xLabels}
          {yLabels}
        </g>
      </svg>

        </div>
      );
};

export default Heatmap;

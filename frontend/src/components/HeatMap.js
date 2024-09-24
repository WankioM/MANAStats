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
    if (loading || error) return; // Prevent execution if loading or error

    // Step 1: Organize the data into a neat structure
    const landData = [];
    data.bidSuccessfuls.forEach(plot => {
      plot._xs.forEach((x, i) => {
        landData.push({
          x: parseInt(x), // x coordinate
          y: parseInt(plot._ys[i]), // y coordinate
          price: parseInt(plot._pricePerLandInMana), // same price for all coordinates
          beneficiary: plot._beneficiary // beneficiary info if needed later
        });
      });
    });

    landData.sort((a, b) => {
      if (a.x === b.x) {
        return a.y - b.y; // Sort by y if x is the same
      }
      return a.x - b.x; // Otherwise, sort by x
    });

    // Optional: Store `landData` into variables for further use or debugging
    const xValues = landData.map(d => d.x);
    const yValues = landData.map(d => d.y);
    const prices = landData.map(d => d.price);

    console.log('X Coordinates:', xValues);
    console.log('Y Coordinates:', yValues);
    console.log('Prices:', prices);

    // bounds = area inside the axis
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    const allYGroups = [...new Set(landData.map(d => d.y))];
    const allXGroups = [...new Set(landData.map(d => d.x))];

    // x and y scales
    const xScale = d3.scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);

    const yScale = d3.scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);

    // Calculate min and max values
    const [min, max] = d3.extent(landData, d => d.price);

    if (!min || !max) {
      return null;
    }

    // Update color scale
    const newColorScale = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([min, max]);

    setColorScale(newColorScale);

    // Build rectangles
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
          y={height - MARGIN.bottom + 20} // y position for x labels
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
          x={-10} // Adjusted x position for y labels
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

      
      <svg width="1000" height="1000"> {/* Changed from 1000px to 1000 for consistency */}
        <g
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`} // Simplified the translation
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

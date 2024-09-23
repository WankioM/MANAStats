import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './HeatMap.css'; 
import { useQuery, gql } from '@apollo/client';

const GET_BID_DATA = gql`
  query {
    bidSuccessfuls {
      _pricePerLandInMana
      _xs
      _ys
      _beneficiary
    }
  }
`;

const Heatmap = () => {
  const svgRef = useRef();
  const { loading, error, data } = useQuery(GET_BID_DATA);
  const [rectangles, setRectangles] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [colorScale, setColorScale] = useState(() => d3.scaleSequential().interpolator(d3.interpolateInferno).domain([0, 1])); // Initial color scale

  const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };
  const width = 1000;
  const height = 1000;

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
          width={xScale.bandwidth()}
          height={yScale.bandwidth()}
          opacity={1}
          fill={newColorScale(d.price)}
          rx={5}
          stroke={"white"}
        />
      );
    });

    setRectangles(allRects);
    
    // Create xLabels and yLabels
    const newXLabels = allXGroups.map((name, i) => {
      const xPos = xScale(name) ?? 0;
      return (
        <text
          key={i}
          x={xPos + xScale.bandwidth() / 2}
          y={height - MARGIN.bottom + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
        >
          {name}
        </text>
      );
    });

    const newYLabels = allYGroups.map((name, i) => {
      const yPos = yScale(name) ?? 0;
      return (
        <text
          key={i}
          x={-5}
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
    <div>
      
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

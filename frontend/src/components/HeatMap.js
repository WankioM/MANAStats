import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (loading || error) return; // Prevent execution if loading or error

    // Step 1: Organize the data into a neat structure
    const landData = [];
    data.bidSuccessfuls.forEach(plot => {
      plot._xs.forEach((x, i) => {
        landData.push({
          x: parseInt(x),                    // x coordinate
          y: parseInt(plot._ys[i]),           // y coordinate
          price: parseInt(plot._pricePerLandInMana), // same price for all coordinates
          beneficiary: plot._beneficiary      // beneficiary info if needed later
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

    // We will add the SVG logic later, now just focus on data organization.

  

   // Create color scale based on price
   const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
   .domain([0, d3.max(landData, d => d.price)]);

 // Step 2: Build the Heatmap
 const width = 800;  // SVG width
 const height = 800; // SVG height
 const cellSize = 20; // Size of each heatmap cell

 const svg = d3.select(svgRef.current)
   .attr('width', width)
   .attr('height', height);

 // Bind data to the SVG and create `rect` for each data point
 svg.selectAll('rect')
   .data(landData)
   .enter()
   .append('rect')
   .attr('x', d => d.x * cellSize)         // x position
   .attr('y', d => d.y * cellSize)         // y position
   .attr('width', cellSize)                // width of cell
   .attr('height', cellSize)               // height of cell
   .attr('fill', d => colorScale(d.price)) // fill color based on price
   .attr('stroke', '#ccc')                 // add a stroke to each cell
   .on('mouseover', function () {
     d3.select(this)
       .attr('stroke', '#000')             // highlight stroke on hover
       .attr('stroke-width', 2);
   })
   .on('mouseout', function () {
     d3.select(this)
       .attr('stroke', '#ccc')             
       .attr('stroke-width', 1);
   });

}, [loading, error, data]);

  // Handle loading and error states in the render
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Heat Map</p>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Heatmap;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { interpolateInferno } from 'd3-scale-chromatic';
import { useQuery, gql } from '@apollo/client';
import './HeatMap.css';

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

const HeatmapVer2 = () => {
  const { loading, error, data } = useQuery(GET_BID_DATA);
  const svgRef = useRef();

  useEffect(() => {
    if (loading || error) return;

    // Step 1: Organize the data and calculate the grid size
    const landData = [];
    data.bidSuccessfuls.forEach(plot => {
      plot._xs.forEach((x, i) => {
        landData.push({
          x: parseInt(x), // x coordinate
          y: parseInt(plot._ys[i]), // y coordinate
          price: parseInt(plot._pricePerLandInMana),
        });
      });
    });

    // Get max x and y coordinates for grid dimensions
    const maxX = d3.max(landData, d => d.x);
    const maxY = d3.max(landData, d => d.y);

    // Select the SVG element and set up dimensions
    const svg = d3.select(svgRef.current)
      .attr("width", (maxX / 5) * 20 + 100)  // Adjust width based on the new scaling
      .attr("height", (maxY / 5) * 20 + 100) // Adjust height based on the new scaling
      .style("border", "1px solid black");

    // Clear previous content
    svg.selectAll("*").remove();

    // Define the scale for x and y, now each grid will represent a 5x5 area
    const xScale = d3.scaleLinear()
      .domain([0, maxX])
      .range([50, (maxX / 5) * 20 + 50]); // Start at 50 for padding (for axis labels)

    const yScale = d3.scaleLinear()
      .domain([0, maxY])
      .range([(maxY / 5) * 20 + 50, 50]); // Invert yScale for top-bottom alignment

    const colorScale = d3.scaleSequential(interpolateInferno)
    .domain([0, d3.max(landData, d => d.price)]); 

    // Draw grid lines (vertical) for each 5 units of x
    for (let x = 0; x <= maxX; x += 5) {
      svg.append("line")
        .attr("x1", xScale(x))
        .attr("y1", 50)
        .attr("x2", xScale(x))
        .attr("y2", (maxY / 5) * 20 + 50) // Ensure this goes to the bottom of the SVG
        .attr("stroke", "lightgrey")
        .attr("stroke-width", 1);
    }

    // Draw grid lines (horizontal) for each 5 units of y
    for (let y = 0; y <= maxY; y += 5) {
      svg.append("line")
        .attr("x1", 50)
        .attr("y1", yScale(y))
        .attr("x2", xScale(maxX))
        .attr("y2", yScale(y))
        .attr("stroke", "lightgrey")
        .attr("stroke-width", 1);
    }

    landData.forEach(({ x, y, price }) => {
      svg.append("rect")
        .attr("x", xScale(x) - 10) // Adjust position based on the scaling and square size
        .attr("y", yScale(y) - 10) // Adjust position based on the scaling and square size
        .attr("width", 20) // Width of each square
        .attr("height", 20) // Height of each square
        .attr("rx", 5) // Rounded corners (horizontal radius)
        .attr("ry", 5) // Rounded corners (vertical radius)
        .attr("fill", colorScale(price)) // Use the color scale to determine the color
        .attr("fill-opacity", 0.7) // Set the opacity of the fill color
        .attr("stroke", "white") // Set the border color to white
        .attr("stroke-width", 0.5); // Set the border width
    });
    

    // Create x-axis with ticks every 5 units
    const xAxis = d3.axisBottom(xScale).ticks(maxX / 5).tickValues(d3.range(0, maxX, 5));
    svg.append("g")
      .attr("transform", `translate(0, ${(maxY / 5) * 20 + 50})`)  // Position below grid
      .call(xAxis);

    // Create y-axis with ticks every 5 units
    const yAxis = d3.axisLeft(yScale).ticks(maxY / 5).tickValues(d3.range(0, maxY, 5));
    svg.append("g")
      .attr("transform", `translate(50, 0)`)  // Position to the left of the grid
      .call(yAxis);

    // Add x-axis label
    svg.append("text")
      .attr("x", ((maxX / 5) * 20) / 2 + 50) // Center the label horizontally
      .attr("y", (maxY / 5) * 20 + 90) // Position the label below the axis
      .attr("text-anchor", "middle")
      .text("X Coordinate");

    // Add y-axis label
    svg.append("text")
      .attr("x", -((maxY / 5) * 20) / 2 - 50) // Center the label vertically, but flipped due to rotation
      .attr("y", 15) // Position near the y-axis
      .attr("transform", "rotate(-90)") // Rotate the text to align vertically
      .attr("text-anchor", "middle")
      .text("Y Coordinate");

  }, [loading, error, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>Heat Map</p>
      <p>
        This grid shows the land plot coordinates. The faint grey lines represent the grid for organizing the land data, with each grid box representing a 5x5 area on DecentraLand.
      </p>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default HeatmapVer2;

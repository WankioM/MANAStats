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

    // Add this inside your useEffect after defining the landData

const tooltip = d3.select("#tooltip");

landData.forEach(({ x, y, price }) => {
  svg.append("rect")
    .attr("x", xScale(x) - 10) 
    .attr("y", yScale(y) - 10) 
    .attr("width", 20) 
    .attr("height", 20) 
    .attr("rx", 5) 
    .attr("ry", 5)
    .attr("fill", colorScale(price))
    .attr("fill-opacity", 0.7)
    .attr("stroke", "white") 
    .attr("stroke-width", 0.5)
    .on("mouseover", function(event) {
      d3.select("#tooltip")
        .style("visibility", "visible")
        .html(`<img src='https://cdn3d.iconscout.com/3d/premium/thumb/mana-4721557-3921417.png?f=webp' style="width: 15px; height: 15px; vertical-align: middle;" />  ${price}`) // Set tooltip content to include the image
        .style("left", (event.pageX + 5) + "px") 
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mousemove", (event) => {
     
      tooltip.style("top", `${event.pageY + 10}px`).style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });
});

    

  
    const xAxis = d3.axisBottom(xScale).ticks(maxX / 5).tickValues(d3.range(0, maxX, 5));
    svg.append("g")
      .attr("transform", `translate(0, ${(maxY / 5) * 20 + 50})`)  // Position below grid
      .call(xAxis);


    const yAxis = d3.axisLeft(yScale).ticks(maxY / 5).tickValues(d3.range(0, maxY, 5));
    svg.append("g")
      .attr("transform", `translate(50, 0)`) 
      .call(yAxis);


    svg.append("text")
      .attr("x", ((maxX / 5) * 20) / 2 + 50) 
      .attr("y", (maxY / 5) * 20 + 90) 
      .attr("text-anchor", "middle")
      .style("font-size", "18px") 
      .text("X Coordinate");

   
    svg.append("text")
      .attr("x", -((maxY / 5) * 20) / 2 - 50)
      .attr("y", 15) 
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "18px") 
      .text("Y Coordinate");

  }, [loading, error, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='map'>
      <p>Heat Map</p>
      <p>
        This grid shows the land plot coordinates. The faint grey lines represent the grid for organizing the land data, with each grid box representing a 5x5 area on DecentraLand.
      </p>
      <svg ref={svgRef}></svg>
      <div id="tooltip" style={{ position: "absolute",
         visibility: "hidden", 
         backgroundColor: "rgba(255, 255, 255, 0.7)", 
         border: "1px solid black", padding: "5px", borderRadius: "3px", pointerEvents: "none" }} />

    </div>
  );
};

export default HeatmapVer2;

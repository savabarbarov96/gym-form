
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ProgressGraphStepProps {
  goalValue: number;
  currentBodyFat?: number;
}

const ProgressGraphStep = ({ goalValue, currentBodyFat = 25 }: ProgressGraphStepProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing SVG
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Calculate values based on goal - adjusted muscle mass to be more realistic
    const startingBodyFat = currentBodyFat || goalValue;
    const targetBodyFat = Math.max(goalValue, 8);
    const startingMuscleMass = 30;
    const targetMuscleMass = 40; // Reduced from previous value to more realistic value
    
    // Data for the chart - adjusted values
    const data = [
      { month: 'Month 1', bodyFat: startingBodyFat, muscleMass: startingMuscleMass },
      { month: 'Month 2', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.2, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.25 },
      { month: 'Month 3', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.4, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.5 },
      { month: 'Month 4', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.65, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.7 },
      { month: 'Month 5', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.85, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.9 },
      { month: 'Month 6', bodyFat: targetBodyFat, muscleMass: targetMuscleMass },
    ];
    
    // Round values for cleaner display
    const roundedData = data.map(item => ({
      month: item.month,
      bodyFat: Math.round(item.bodyFat * 10) / 10,
      muscleMass: Math.round(item.muscleMass * 10) / 10
    }));

    // Set up dimensions - adjusted to fit container without scrolling
    const parentWidth = chartRef.current.clientWidth;
    const margin = { top: 50, right: Math.min(130, parentWidth * 0.1), bottom: 70, left: Math.min(70, parentWidth * 0.1) };
    const width = parentWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG element with dark background
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add dark background for graph
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#1a1a1a");
    
    // X axis - improved styling
    const x = d3.scaleBand()
      .domain(roundedData.map(d => d.month))
      .range([0, width])
      .padding(0.2);
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(0))
      .selectAll("text")
      .style("text-anchor", "middle")
      .attr("dy", "1em")
      .style("fill", "#888")
      .style("font-size", "12px");
    
    // Remove x-axis line but keep ticks
    svg.selectAll(".domain").style("stroke", "#333");
    
    // Y axis - improved styling
    const yMax = Math.max(
      d3.max(roundedData, d => d.bodyFat) || 0, 
      d3.max(roundedData, d => d.muscleMass) || 0
    ) * 1.2;
    
    const y = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);
    
    svg.append("g")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(d => d + "%"))
      .selectAll("text")
      .style("fill", "#888")
      .style("font-size", "12px");
    
    // Style the y-axis grid lines
    svg.selectAll(".tick line")
      .style("stroke", "#333")
      .style("stroke-opacity", 0.5);
    
    // Line generator for body fat
    const bodyFatLine = d3.line<{month: string, bodyFat: number}>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.bodyFat))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Line generator for muscle mass
    const muscleMassLine = d3.line<{month: string, muscleMass: number}>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y(d => y(d.muscleMass))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Add gradient definitions
    const defs = svg.append("defs");
    
    const bodyFatGradient = defs.append("linearGradient")
      .attr("id", "bodyFatGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    bodyFatGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FF6B35")
      .attr("stop-opacity", 0.8);
    
    bodyFatGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF6B35")
      .attr("stop-opacity", 0.1);
    
    const muscleMassGradient = defs.append("linearGradient")
      .attr("id", "muscleMassGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    muscleMassGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#54D62C")
      .attr("stop-opacity", 0.8);
    
    muscleMassGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#54D62C")
      .attr("stop-opacity", 0.1);
    
    // Add area under body fat line
    const bodyFatArea = d3.area<{month: string, bodyFat: number}>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.bodyFat))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    svg.append("path")
      .datum(roundedData)
      .attr("fill", "url(#bodyFatGradient)")
      .attr("fill-opacity", 0)
      .attr("d", bodyFatArea)
      .transition()
      .duration(2000)
      .attr("fill-opacity", 0.3);
    
    // Add area under muscle mass line
    const muscleMassArea = d3.area<{month: string, muscleMass: number}>()
      .x(d => (x(d.month) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.muscleMass))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    svg.append("path")
      .datum(roundedData)
      .attr("fill", "url(#muscleMassGradient)")
      .attr("fill-opacity", 0)
      .attr("d", muscleMassArea)
      .transition()
      .duration(2000)
      .attr("fill-opacity", 0.3);
    
    // Add body fat path with animation
    const bodyFatPath = svg.append("path")
      .datum(roundedData)
      .attr("fill", "none")
      .attr("stroke", "#FF6B35")
      .attr("stroke-width", 3)
      .attr("d", bodyFatLine);
    
    const bodyFatLength = bodyFatPath.node()?.getTotalLength() || 0;
    
    bodyFatPath
      .attr("stroke-dasharray", bodyFatLength)
      .attr("stroke-dashoffset", bodyFatLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Add muscle mass path with animation
    const muscleMassPath = svg.append("path")
      .datum(roundedData)
      .attr("fill", "none")
      .attr("stroke", "#54D62C")
      .attr("stroke-width", 3)
      .attr("d", muscleMassLine);
    
    const muscleMassLength = muscleMassPath.node()?.getTotalLength() || 0;
    
    muscleMassPath
      .attr("stroke-dasharray", muscleMassLength)
      .attr("stroke-dashoffset", muscleMassLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Add animated data points
    svg.selectAll(".bodyFatPoint")
      .data(roundedData)
      .enter()
      .append("circle")
      .attr("class", "bodyFatPoint")
      .attr("cx", d => (x(d.month) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.bodyFat))
      .attr("r", 0)
      .attr("fill", "#FF6B35")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", 6);
    
    svg.selectAll(".muscleMassPoint")
      .data(roundedData)
      .enter()
      .append("circle")
      .attr("class", "muscleMassPoint")
      .attr("cx", d => (x(d.month) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.muscleMass))
      .attr("r", 0)
      .attr("fill", "#54D62C")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", 6);
    
    // Add animated data labels with responsive font size
    const fontSize = Math.max(10, Math.min(12, parentWidth / 50));
    
    svg.selectAll(".bodyFatLabel")
      .data(roundedData)
      .enter()
      .append("text")
      .attr("class", "bodyFatLabel")
      .attr("x", d => (x(d.month) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.bodyFat) - 15)
      .attr("text-anchor", "middle")
      .style("font-size", `${fontSize}px`)
      .style("fill", "#FF6B35")
      .style("opacity", 0)
      .text(d => d.bodyFat + "%")
      .transition()
      .delay((d, i) => i * 300 + 200)
      .duration(500)
      .style("opacity", 1);
    
    svg.selectAll(".muscleMassLabel")
      .data(roundedData)
      .enter()
      .append("text")
      .attr("class", "muscleMassLabel")
      .attr("x", d => (x(d.month) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.muscleMass) - 15)
      .attr("text-anchor", "middle")
      .style("font-size", `${fontSize}px`)
      .style("fill", "#54D62C")
      .style("opacity", 0)
      .text(d => d.muscleMass + "%")
      .transition()
      .delay((d, i) => i * 300 + 200)
      .duration(500)
      .style("opacity", 1);
    
    // Add title with better styling
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("Your Expected Progress");
    
    // Add x-axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#888")
      .text("Timeline");
    
    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#888")
      .text("Percentage (%)");
    
    // Add legend with responsive position
    const legendX = width > 400 ? width + 20 : width - 100;
    const legendY = width > 400 ? 0 : -40;
    
    const legend = svg.append("g")
      .attr("transform", `translate(${legendX}, ${legendY})`);
    
    if (width <= 400) {
      // For smaller screens, create a horizontal legend
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", "#FF6B35");
      
      legend.append("text")
        .attr("x", 18)
        .attr("y", 10)
        .text("Body Fat %")
        .style("font-size", "12px")
        .style("fill", "#ccc");
      
      legend.append("rect")
        .attr("x", 100)
        .attr("y", 0)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", "#54D62C");
      
      legend.append("text")
        .attr("x", 118)
        .attr("y", 10)
        .text("Muscle Mass %")
        .style("font-size", "12px")
        .style("fill", "#ccc");
    } else {
      // For larger screens, create a vertical legend
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#FF6B35");
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 12.5)
        .text("Body Fat %")
        .style("font-size", "14px")
        .style("fill", "#ccc");
      
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 30)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#54D62C");
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 42.5)
        .text("Muscle Mass %")
        .style("font-size", "14px")
        .style("fill", "#ccc");
    }
    
    // Handle resize
    const handleResize = () => {
      if (chartRef.current) {
        d3.select(chartRef.current).selectAll("svg").remove();
        // The chart will be recreated on next render
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [goalValue, currentBodyFat]);

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Your Fitness Journey</h1>
      
      <div className="max-w-4xl mx-auto">
        <div 
          ref={chartRef} 
          className="w-full h-[400px] bg-card rounded-lg p-4 shadow-md mb-8"
        ></div>
        
        <div className="text-center mt-4 text-orange font-medium text-xl">
          You can achieve your goal in approximately 6 months!
        </div>
      </div>
    </div>
  );
};

export default ProgressGraphStep;

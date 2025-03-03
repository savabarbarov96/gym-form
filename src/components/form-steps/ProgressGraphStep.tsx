
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface ProgressGraphStepProps {
  goalValue: number;
}

const ProgressGraphStep = ({ goalValue }: ProgressGraphStepProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing SVG
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Calculate values based on goal
    const startingBodyFat = goalValue;
    const targetBodyFat = Math.max(startingBodyFat * 0.65, 10);
    const startingMuscleMass = 30;
    const targetMuscleMass = 55;
    
    // Data for the chart
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

    // Set up dimensions
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X axis
    const x = d3.scaleBand()
      .domain(roundedData.map(d => d.month))
      .range([0, width])
      .padding(0.2);
    
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "#888");
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, Math.max(d3.max(roundedData, d => d.bodyFat) || 0, d3.max(roundedData, d => d.muscleMass) || 0) * 1.2])
      .range([height, 0]);
    
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("fill", "#888");
    
    // Add gridlines
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(() => "")
      )
      .selectAll("line")
      .style("stroke", "#333")
      .style("stroke-opacity", 0.3);
    
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
    
    // Add data points with animation
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
    
    // Add data labels with animation
    svg.selectAll(".bodyFatLabel")
      .data(roundedData)
      .enter()
      .append("text")
      .attr("class", "bodyFatLabel")
      .attr("x", d => (x(d.month) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.bodyFat) - 15)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
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
      .style("font-size", "12px")
      .style("fill", "#54D62C")
      .style("opacity", 0)
      .text(d => d.muscleMass + "%")
      .transition()
      .delay((d, i) => i * 300 + 200)
      .duration(500)
      .style("opacity", 1);
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 150}, 0)`);
    
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
      .style("fill", "#888");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#54D62C");
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 37.5)
      .text("Muscle Mass %")
      .style("font-size", "14px")
      .style("fill", "#888");
    
    // Add gradients
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
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("Your Expected Progress");
    
    // Add subtitle
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "#888")
      .text("Timeline");

    // Add annotation for the best results
    svg.append("text")
      .attr("x", width)
      .attr("y", y(targetBodyFat) - 30)
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .style("fill", "#FF6B35")
      .style("opacity", 0)
      .text("Target body fat achieved!")
      .transition()
      .delay(2500)
      .duration(1000)
      .style("opacity", 1);
    
    // Handle resize
    const handleResize = () => {
      if (chartRef.current) {
        d3.select(chartRef.current).selectAll("svg").remove();
        const newWidth = chartRef.current.clientWidth - margin.left - margin.right;
        
        // Recalculate x scale
        x.range([0, newWidth]);
        
        // Redraw chart
        // ... (this would be a refactor of the code above)
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [goalValue]);

  return (
    <div className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Your Fitness Journey</h1>
      
      <div className="max-w-4xl mx-auto">
        <div 
          ref={chartRef} 
          className="w-full h-[400px] bg-card rounded-lg p-4 shadow-md"
        ></div>
        
        <div className="text-center mt-8 text-orange font-medium">
          You can achieve your goal in approximately 6 months!
        </div>
      </div>
    </div>
  );
};

export default ProgressGraphStep;

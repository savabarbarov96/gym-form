import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";

interface HormoneGraphStepProps {
  onNext: () => void;
  gender: string | null;
}

const HormoneGraphStep: React.FC<HormoneGraphStepProps> = ({ onNext, gender }) => {
  // Skip this step for female users
  if (gender === "female") {
    // Auto-advance to next step
    setTimeout(() => {
      onNext();
    }, 100);
    return null;
  }
  
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing SVG
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Data for hormone levels - testosterone increasing, cortisol decreasing
    const data = [
      { name: "Now", testosterone: 20, cortisol: 80 },
      { name: "Week 2", testosterone: 35, cortisol: 65 },
      { name: "Week 4", testosterone: 50, cortisol: 50 },
      { name: "Week 8", testosterone: 75, cortisol: 35 },
      { name: "Week 12", testosterone: 95, cortisol: 20 }
    ];
    
    // Round values for cleaner display
    const roundedData = data.map(item => ({
      name: item.name,
      testosterone: Math.round(item.testosterone * 10) / 10,
      cortisol: Math.round(item.cortisol * 10) / 10
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
      .domain(roundedData.map(d => d.name))
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
    const yMax = 100; // Fixed max at 100%
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
    
    // Line generator for testosterone
    const testosteroneLine = d3.line<{name: string, testosterone: number}>()
      .x(d => (x(d.name) || 0) + x.bandwidth() / 2)
      .y(d => y(d.testosterone))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Line generator for cortisol
    const cortisolLine = d3.line<{name: string, cortisol: number}>()
      .x(d => (x(d.name) || 0) + x.bandwidth() / 2)
      .y(d => y(d.cortisol))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Add gradient definitions
    const defs = svg.append("defs");
    
    const testosteroneGradient = defs.append("linearGradient")
      .attr("id", "testosteroneGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    testosteroneGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(var(--orange))")
      .attr("stop-opacity", 0.8);
    
    testosteroneGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(var(--orange))")
      .attr("stop-opacity", 0.1);
    
    const cortisolGradient = defs.append("linearGradient")
      .attr("id", "cortisolGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    cortisolGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#888")
      .attr("stop-opacity", 0.8);
    
    cortisolGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#888")
      .attr("stop-opacity", 0.1);
    
    // Add area under testosterone line
    const testosteroneArea = d3.area<{name: string, testosterone: number}>()
      .x(d => (x(d.name) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.testosterone))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    svg.append("path")
      .datum(roundedData)
      .attr("fill", "url(#testosteroneGradient)")
      .attr("fill-opacity", 0)
      .attr("d", testosteroneArea)
      .transition()
      .duration(2000)
      .attr("fill-opacity", 0.3);
    
    // Add area under cortisol line
    const cortisolArea = d3.area<{name: string, cortisol: number}>()
      .x(d => (x(d.name) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.cortisol))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    svg.append("path")
      .datum(roundedData)
      .attr("fill", "url(#cortisolGradient)")
      .attr("fill-opacity", 0)
      .attr("d", cortisolArea)
      .transition()
      .duration(2000)
      .attr("fill-opacity", 0.3);
    
    // Add testosterone path with animation
    const testosteronePath = svg.append("path")
      .datum(roundedData)
      .attr("fill", "none")
      .attr("stroke", "rgb(var(--orange))")
      .attr("stroke-width", 3)
      .attr("d", testosteroneLine);
    
    const testosteroneLength = testosteronePath.node()?.getTotalLength() || 0;
    
    testosteronePath
      .attr("stroke-dasharray", testosteroneLength)
      .attr("stroke-dashoffset", testosteroneLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Add cortisol path with animation
    const cortisolPath = svg.append("path")
      .datum(roundedData)
      .attr("fill", "none")
      .attr("stroke", "#888")
      .attr("stroke-width", 3)
      .attr("d", cortisolLine);
    
    const cortisolLength = cortisolPath.node()?.getTotalLength() || 0;
    
    cortisolPath
      .attr("stroke-dasharray", cortisolLength)
      .attr("stroke-dashoffset", cortisolLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Add animated data points
    svg.selectAll(".testosteronePoint")
      .data(roundedData)
      .enter()
      .append("circle")
      .attr("class", "testosteronePoint")
      .attr("cx", d => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.testosterone))
      .attr("r", 0)
      .attr("fill", "rgb(var(--orange))")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", 6);
    
    svg.selectAll(".cortisolPoint")
      .data(roundedData)
      .enter()
      .append("circle")
      .attr("class", "cortisolPoint")
      .attr("cx", d => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.cortisol))
      .attr("r", 0)
      .attr("fill", "#888")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", 6);
    
    // Add animated data labels with responsive font size
    const fontSize = Math.max(10, Math.min(12, parentWidth / 50));
    
    svg.selectAll(".testosteroneLabel")
      .data(roundedData)
      .enter()
      .append("text")
      .attr("class", "testosteroneLabel")
      .attr("x", d => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.testosterone) - 15)
      .attr("text-anchor", "middle")
      .style("font-size", `${fontSize}px`)
      .style("fill", "rgb(var(--orange))")
      .style("opacity", 0)
      .text(d => d.testosterone + "%")
      .transition()
      .delay((d, i) => i * 300 + 200)
      .duration(500)
      .style("opacity", 1);
    
    svg.selectAll(".cortisolLabel")
      .data(roundedData)
      .enter()
      .append("text")
      .attr("class", "cortisolLabel")
      .attr("x", d => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.cortisol) - 15)
      .attr("text-anchor", "middle")
      .style("font-size", `${fontSize}px`)
      .style("fill", "#888")
      .style("opacity", 0)
      .text(d => d.cortisol + "%")
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
      .text("Your Hormone Balance");
    
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
        .attr("fill", "rgb(var(--orange))");
      
      legend.append("text")
        .attr("x", 18)
        .attr("y", 10)
        .text("Testosterone")
        .style("font-size", "12px")
        .style("fill", "#ccc");
      
      legend.append("rect")
        .attr("x", 100)
        .attr("y", 0)
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", "#888");
      
      legend.append("text")
        .attr("x", 118)
        .attr("y", 10)
        .text("Cortisol (Stress)")
        .style("font-size", "12px")
        .style("fill", "#ccc");
    } else {
      // For larger screens, create a vertical legend
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "rgb(var(--orange))");
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 12.5)
        .text("Testosterone")
        .style("font-size", "14px")
        .style("fill", "#ccc");
      
      legend.append("rect")
        .attr("x", 0)
        .attr("y", 30)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#888");
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 42.5)
        .text("Cortisol (Stress)")
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
  }, []);

  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">Your hormones will improve</h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
        As you follow our program, your testosterone will increase and cortisol (stress hormone) will decrease
      </p>
      
      <div className="bg-card border border-border p-6 rounded-xl mb-10">
        <div 
          ref={chartRef} 
          className="w-full h-[400px]"
        ></div>
      </div>
      
      <motion.button
        className="btn-primary mt-6"
        onClick={onNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default HormoneGraphStep;

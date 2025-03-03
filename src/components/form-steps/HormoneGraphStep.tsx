
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";

interface HormoneGraphStepProps {
  onNext: () => void;
}

const HormoneGraphStep: React.FC<HormoneGraphStepProps> = ({ onNext }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing SVG
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Create more realistic data points
    const data = [
      { month: 'Month 1', cortisol: 100, testosterone: 10 },
      { month: 'Month 2', cortisol: 88, testosterone: 25 },
      { month: 'Month 3', cortisol: 74, testosterone: 42 },
      { month: 'Month 4', cortisol: 60, testosterone: 58 },
      { month: 'Month 5', cortisol: 45, testosterone: 72 },
      { month: 'Month 6', cortisol: 35, testosterone: 85 },
    ];

    // Set up dimensions
    const margin = { top: 50, right: 30, bottom: 50, left: 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Add background rect for styling
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#111")
      .attr("rx", 6);
    
    // X scale
    const x = d3.scalePoint<string>()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.5);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    
    // Add X grid lines
    svg.append("g")
      .attr("class", "grid x-grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(x)
          .tickSize(-height)
          .tickFormat(() => "")
      )
      .call(g => g.selectAll(".domain, .tick line").attr("stroke", "#333"));
    
    // Add Y grid lines
    svg.append("g")
      .attr("class", "grid y-grid")
      .call(
        d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => "")
          .ticks(5)
      )
      .call(g => g.selectAll(".domain, .tick line").attr("stroke", "#333"));
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .call(g => g.select(".domain").attr("stroke", "#666"))
      .call(g => g.selectAll("text")
        .attr("fill", "#999")
        .style("font-size", "12px")
      );
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call(g => g.select(".domain").attr("stroke", "#666"))
      .call(g => g.selectAll("text")
        .attr("fill", "#999")
        .style("font-size", "12px")
      );
    
    // Add gradient definitions
    const defs = svg.append("defs");
    
    // Cortisol gradient
    const cortisolGradient = defs.append("linearGradient")
      .attr("id", "cortisolGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    
    cortisolGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff4700")
      .attr("stop-opacity", 0.9);
    
    cortisolGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff4700")
      .attr("stop-opacity", 0.1);
    
    // Testosterone gradient
    const testosteroneGradient = defs.append("linearGradient")
      .attr("id", "testosteroneGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    
    testosteroneGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#54D62C")
      .attr("stop-opacity", 0.9);
    
    testosteroneGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#54D62C")
      .attr("stop-opacity", 0.1);
    
    // Add line generators with curve
    const cortisolLine = d3.line<any>()
      .x(d => x(d.month) || 0)
      .y(d => y(d.cortisol))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    const testosteroneLine = d3.line<any>()
      .x(d => x(d.month) || 0)
      .y(d => y(d.testosterone))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Add area generators
    const cortisolArea = d3.area<any>()
      .x(d => x(d.month) || 0)
      .y0(height)
      .y1(d => y(d.cortisol))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    const testosteroneArea = d3.area<any>()
      .x(d => x(d.month) || 0)
      .y0(height)
      .y1(d => y(d.testosterone))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Add cortisol area path
    const cortisolAreaPath = svg.append("path")
      .datum(data)
      .attr("fill", "url(#cortisolGradient)")
      .attr("opacity", 0)
      .attr("d", cortisolArea);
    
    // Add testosterone area path
    const testosteroneAreaPath = svg.append("path")
      .datum(data)
      .attr("fill", "url(#testosteroneGradient)")
      .attr("opacity", 0)
      .attr("d", testosteroneArea);
    
    // Add cortisol line path with animation
    const cortisolPath = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#ff4700")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("d", cortisolLine);
    
    const cortisolLength = cortisolPath.node()?.getTotalLength() || 0;
    
    cortisolPath
      .attr("stroke-dasharray", cortisolLength)
      .attr("stroke-dashoffset", cortisolLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)
      .on("end", () => {
        cortisolAreaPath
          .transition()
          .duration(1000)
          .attr("opacity", 0.3);
      });
    
    // Add testosterone line path with animation
    const testosteronePath = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#54D62C")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("d", testosteroneLine);
    
    const testosteroneLength = testosteronePath.node()?.getTotalLength() || 0;
    
    testosteronePath
      .attr("stroke-dasharray", testosteroneLength)
      .attr("stroke-dashoffset", testosteroneLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)
      .on("end", () => {
        testosteroneAreaPath
          .transition()
          .duration(1000)
          .attr("opacity", 0.3);
          
        setAnimationComplete(true);
      });
    
    // Add data points with animation
    svg.selectAll(".cortisol-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "cortisol-point")
      .attr("cx", d => x(d.month) || 0)
      .attr("cy", d => y(d.cortisol))
      .attr("r", 0)
      .attr("fill", "#ff4700")
      .transition()
      .delay((d, i) => 1800 * (i / (data.length - 1)))
      .duration(300)
      .attr("r", 5);
    
    svg.selectAll(".testosterone-point")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "testosterone-point")
      .attr("cx", d => x(d.month) || 0)
      .attr("cy", d => y(d.testosterone))
      .attr("r", 0)
      .attr("fill", "#54D62C")
      .transition()
      .delay((d, i) => 1800 * (i / (data.length - 1)))
      .duration(300)
      .attr("r", 5);
    
    // Add data labels with animation
    svg.selectAll(".cortisol-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "cortisol-label")
      .attr("x", d => x(d.month) || 0)
      .attr("y", d => y(d.cortisol) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#ff4700")
      .attr("font-size", "12px")
      .attr("opacity", 0)
      .text(d => `${d.cortisol}%`)
      .transition()
      .delay((d, i) => 2000 + i * 100)
      .duration(500)
      .attr("opacity", 1);
    
    svg.selectAll(".testosterone-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "testosterone-label")
      .attr("x", d => x(d.month) || 0)
      .attr("y", d => y(d.testosterone) - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#54D62C")
      .attr("font-size", "12px")
      .attr("opacity", 0)
      .text(d => `${d.testosterone}%`)
      .transition()
      .delay((d, i) => 2000 + i * 100)
      .duration(500)
      .attr("opacity", 1);
    
    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Hormone Balance Over Time");
    
    // Add stylish legend
    const legendWidth = 220;
    const legendHeight = 70;
    const legendX = width - legendWidth;
    const legendY = 0;
    
    // Legend background
    svg.append("rect")
      .attr("x", legendX)
      .attr("y", legendY)
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("fill", "rgba(0,0,0,0.5)")
      .attr("rx", 5);
    
    // Cortisol legend item
    svg.append("line")
      .attr("x1", legendX + 15)
      .attr("y1", legendY + 20)
      .attr("x2", legendX + 45)
      .attr("y2", legendY + 20)
      .attr("stroke", "#ff4700")
      .attr("stroke-width", 3);
    
    svg.append("text")
      .attr("x", legendX + 55)
      .attr("y", legendY + 25)
      .attr("fill", "#ddd")
      .attr("font-size", "14px")
      .text("Cortisol (Stress)");
    
    // Testosterone legend item
    svg.append("line")
      .attr("x1", legendX + 15)
      .attr("y1", legendY + 50)
      .attr("x2", legendX + 45)
      .attr("y2", legendY + 50)
      .attr("stroke", "#54D62C")
      .attr("stroke-width", 3);
    
    svg.append("text")
      .attr("x", legendX + 55)
      .attr("y", legendY + 55)
      .attr("fill", "#ddd")
      .attr("font-size", "14px")
      .text("Testosterone");
    
    // Handle window resize
    const handleResize = () => {
      if (chartRef.current) {
        d3.select(chartRef.current).selectAll("*").remove();
        // Redraw chart (this would require duplicating code above)
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className="text-center max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl sm:text-5xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Hormone Balance Will Improve
      </motion.h1>
      
      <motion.p
        className="text-lg mb-8 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Our program helps reduce stress hormone (cortisol) and increase testosterone for better results
      </motion.p>
      
      <div ref={chartRef} className="w-full h-[350px] bg-card rounded-lg p-4 shadow-lg mb-12"></div>

      <motion.button 
        onClick={onNext}
        className="px-8 py-4 bg-orange hover:bg-orange-hover text-white rounded-lg text-xl font-bold shadow-lg transition-all transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: animationComplete ? 1 : 0, scale: animationComplete ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default HormoneGraphStep;

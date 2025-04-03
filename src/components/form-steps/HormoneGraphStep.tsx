import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";

interface HormoneGraphStepProps {
  onNext: () => void;
  gender: string | null;
}

const HormoneGraphStep: React.FC<HormoneGraphStepProps> = ({ onNext, gender }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Clear any existing SVG
    d3.select(chartRef.current).selectAll("*").remove();
    
    // Data for the chart - now showing happiness and stress levels
    const data = [
      { week: 'Седмица 1', happiness: 40, stress: 85 },
      { week: 'Седмица 2', happiness: 50, stress: 65 },
      { week: 'Седмица 3', happiness: 70, stress: 30 },
      { week: 'Седмица 4', happiness: 75, stress: 25 },
      { week: 'Седмица 5', happiness: 80, stress: 20 },
      { week: 'Седмица 6', happiness: 90, stress: 15 },
      { week: 'Седмица 7', happiness: 95, stress: 7 },
      { week: 'Седмица 8', happiness: 100, stress: 0 },
    ];
    
    // Set up dimensions
    const parentWidth = chartRef.current.clientWidth;
    const isMobile = parentWidth < 500;
    
    const margin = { 
      top: 60, 
      right: isMobile ? 20 : 80, 
      bottom: isMobile ? 100 : 70, 
      left: isMobile ? 50 : 70 
    };
    
    const width = parentWidth - margin.left - margin.right;
    const height = isMobile ? 350 : 400 - margin.top - margin.bottom;
    
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
    
    // X axis
    const x = d3.scaleBand()
      .domain(data.map(d => d.week))
      .range([0, width])
      .padding(0.2);
    
    const xAxis = svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickSize(0));
    
    // Adjust x-axis labels for mobile
    if (isMobile) {
      xAxis.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)")
        .style("fill", "#888")
        .style("font-size", "10px");
    } else {
      xAxis.selectAll("text")
        .style("text-anchor", "middle")
        .attr("dy", "1em")
        .style("fill", "#888")
        .style("font-size", "12px");
    }
    
    // Y axis
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    
    svg.append("g")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(d => d + "%"))
      .selectAll("text")
      .style("fill", "#888")
      .style("font-size", isMobile ? "10px" : "12px");
    
    // Style the y-axis grid lines
    svg.selectAll(".tick line")
      .style("stroke", "#333")
      .style("stroke-opacity", 0.5);
    
    // Line generator for happiness
    const happinessLine = d3.line<{week: string, happiness: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
      .y(d => y(d.happiness))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Line generator for stress
    const stressLine = d3.line<{week: string, stress: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
      .y(d => y(d.stress))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Add gradient definitions
    const defs = svg.append("defs");
    
    const happinessGradient = defs.append("linearGradient")
      .attr("id", "happinessGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    happinessGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#54D62C")
      .attr("stop-opacity", 0.8);
    
    happinessGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#54D62C")
      .attr("stop-opacity", 0.1);
    
    const stressGradient = defs.append("linearGradient")
      .attr("id", "stressGradient")
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    
    stressGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FF6B35")
      .attr("stop-opacity", 0.8);
    
    stressGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#FF6B35")
      .attr("stop-opacity", 0.1);
    
    // Add area under happiness line
    const happinessArea = d3.area<{week: string, happiness: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.happiness))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    svg.append("path")
      .datum(data)
      .attr("fill", "url(#happinessGradient)")
      .attr("fill-opacity", 0)
      .attr("d", happinessArea)
      .transition()
      .duration(2000)
      .attr("fill-opacity", 0.3);
    
    // Add area under stress line
    const stressArea = d3.area<{week: string, stress: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.stress))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    svg.append("path")
      .datum(data)
      .attr("fill", "url(#stressGradient)")
      .attr("fill-opacity", 0)
      .attr("d", stressArea)
      .transition()
      .duration(2000)
      .attr("fill-opacity", 0.3);
    
    // Add happiness path with animation
    const happinessPath = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#54D62C")
      .attr("stroke-width", 3)
      .attr("d", happinessLine);
    
    const happinessLength = happinessPath.node()?.getTotalLength() || 0;
    
    happinessPath
      .attr("stroke-dasharray", happinessLength)
      .attr("stroke-dashoffset", happinessLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Add stress path with animation
    const stressPath = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#FF6B35")
      .attr("stroke-width", 3)
      .attr("d", stressLine);
    
    const stressLength = stressPath.node()?.getTotalLength() || 0;
    
    stressPath
      .attr("stroke-dasharray", stressLength)
      .attr("stroke-dashoffset", stressLength)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Add animated data points
    svg.selectAll(".happinessPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "happinessPoint")
      .attr("cx", d => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.happiness))
      .attr("r", 0)
      .attr("fill", "#54D62C")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", isMobile ? 4 : 6);
    
    svg.selectAll(".stressPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "stressPoint")
      .attr("cx", d => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.stress))
      .attr("r", 0)
      .attr("fill", "#FF6B35")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", isMobile ? 4 : 6);
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", isMobile ? "16px" : "20px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("Прогнозирано подобрение на менталното здраве");
    
    // Add x-axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + (isMobile ? 70 : 50))
      .attr("text-anchor", "middle")
      .style("font-size", isMobile ? "12px" : "14px")
      .style("fill", "#888")
      .text("Времева линия");
    
    // Add y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", isMobile ? -35 : -40)
      .attr("text-anchor", "middle")
      .style("font-size", isMobile ? "12px" : "14px")
      .style("fill", "#888")
      .text("Ниво (%)");
    
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-orange to-primary bg-clip-text text-transparent">Подобрение на цялостното здраве</h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
        Докато следвате нашата програма, нивото на щастие ще се увеличи, а нивото на стрес ще намалее
      </p>
      
      <div className="bg-card border border-border p-6 rounded-xl mb-10 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Legend positioned at the top with improved styling */}
        <div className="flex justify-center items-center gap-8 mb-6 p-3 bg-background/50 rounded-lg">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-[#54D62C] rounded-md mr-2 shadow-sm"></div>
            <span className="text-sm font-medium">Ниво на щастие</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-[#FF6B35] rounded-md mr-2 shadow-sm"></div>
            <span className="text-sm font-medium">Ниво на стрес</span>
          </div>
        </div>
        
        <div 
          ref={chartRef} 
          className="w-full h-[400px]"
        ></div>
      </div>
      
      {/* Motivational message with improved styling */}
      <div className="p-4 bg-background/50 border border-orange/20 rounded-lg max-w-xl mx-auto">
        <p className="text-orange font-medium">
          Следвайки нашата програма, ще постигнете значително подобрение във Вашето ментално и физическо състояние.
        </p>
      </div>
    </div>
  );
};

export default HormoneGraphStep;

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
    
    // Data for the chart - adjusted to 2 months with weekly data points
    const data = [
      { week: 'Седмица 1', bodyFat: startingBodyFat, muscleMass: startingMuscleMass },
      { week: 'Седмица 2', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.15, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.15 },
      { week: 'Седмица 3', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.25, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.25 },
      { week: 'Седмица 4', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.35, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.35 },
      { week: 'Седмица 5', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.45, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.45 },
      { week: 'Седмица 6', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.55, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.55 },
      { week: 'Седмица 7', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.65, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.65 },
      { week: 'Седмица 8', bodyFat: startingBodyFat - (startingBodyFat - targetBodyFat) * 0.75, muscleMass: startingMuscleMass + (targetMuscleMass - startingMuscleMass) * 0.75 },
    ];
    
    // Round values for cleaner display
    const roundedData = data.map(item => ({
      week: item.week,
      bodyFat: Math.round(item.bodyFat * 10) / 10,
      muscleMass: Math.round(item.muscleMass * 10) / 10
    }));

    // Set up dimensions - adjusted to fit container without scrolling
    const parentWidth = chartRef.current.clientWidth;
    const isMobile = parentWidth < 500;
    
    // Adjust margins for better mobile display
    const margin = { 
      top: 60, 
      right: isMobile ? 20 : Math.min(100, parentWidth * 0.1), 
      bottom: isMobile ? 100 : 70, 
      left: isMobile ? 50 : Math.min(70, parentWidth * 0.1) 
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
    
    // X axis - improved styling
    const x = d3.scaleBand()
      .domain(roundedData.map(d => d.week))
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
      .style("font-size", isMobile ? "10px" : "12px");
    
    // Style the y-axis grid lines
    svg.selectAll(".tick line")
      .style("stroke", "#333")
      .style("stroke-opacity", 0.5);
    
    // Line generator for body fat
    const bodyFatLine = d3.line<{week: string, bodyFat: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
      .y(d => y(d.bodyFat))
      .curve(d3.curveCatmullRom.alpha(0.5));
    
    // Line generator for muscle mass
    const muscleMassLine = d3.line<{week: string, muscleMass: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
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
    const bodyFatArea = d3.area<{week: string, bodyFat: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
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
    const muscleMassArea = d3.area<{week: string, muscleMass: number}>()
      .x(d => (x(d.week) || 0) + x.bandwidth() / 2)
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
      .attr("cx", d => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.bodyFat))
      .attr("r", 0)
      .attr("fill", "#FF6B35")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", isMobile ? 4 : 6);
    
    svg.selectAll(".muscleMassPoint")
      .data(roundedData)
      .enter()
      .append("circle")
      .attr("class", "muscleMassPoint")
      .attr("cx", d => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr("cy", d => y(d.muscleMass))
      .attr("r", 0)
      .attr("fill", "#54D62C")
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr("r", isMobile ? 4 : 6);
    
    // Add animated data labels with responsive font size and positioning
    const fontSize = isMobile ? 9 : Math.max(10, Math.min(12, parentWidth / 50));
    
    // Only show labels for every other point on mobile to prevent overlap
    const labelIndices = isMobile ? [0, 2, 4, 6] : roundedData.map((_, i) => i);
    
    // Filter data for labels to prevent overcrowding on mobile
    const labelData = roundedData.filter((_, i) => labelIndices.includes(i));
    
    svg.selectAll(".bodyFatLabel")
      .data(labelData)
      .enter()
      .append("text")
      .attr("class", "bodyFatLabel")
      .attr("x", d => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.bodyFat) - 10)
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
      .data(labelData)
      .enter()
      .append("text")
      .attr("class", "muscleMassLabel")
      .attr("x", d => (x(d.week) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.muscleMass) - 10)
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
      .style("font-size", isMobile ? "16px" : "20px")
      .style("fill", "#fff")
      .style("font-weight", "bold")
      .text("Очакван Прогрес");
    
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
      .text("Процент (%)");
    
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
      <h1 className="text-4xl sm:text-5xl font-bold mb-12">Вашето фитнес пътуване</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col">
          {/* Legend positioned at the top for better visibility */}
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#FF6B35] rounded-sm mr-2"></div>
              <span className="text-sm">Телесни мазнини %</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#54D62C] rounded-sm mr-2"></div>
              <span className="text-sm">Мускулна маса %</span>
            </div>
          </div>
          
          <div 
            ref={chartRef} 
            className="w-full h-[450px] bg-card rounded-lg p-4 shadow-md mb-8 overflow-hidden"
          ></div>
        </div>
        
        <div className="text-center mt-4 text-orange font-medium text-xl">
          Можете да постигнете значителен прогрес само за 2 месеца!
        </div>
      </div>
    </div>
  );
};

export default ProgressGraphStep;

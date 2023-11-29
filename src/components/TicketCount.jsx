import * as d3 from 'd3'
import 'd3-legend';
import 'd3-time'
import {useEffect, useState} from "react";
import BorderCom from "./BorderCom.jsx";

const TicketCount = ({showProvence}) => {
  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;
  const [ticketData, setTicketData] = useState([]);
  
  const [firmName, setFirmName] = useState('');
  
  useEffect(() => {
    drawGraph(ticketData.filter(item => item.province === showProvence));
  }, [showProvence])
  
  const drawGraph = (ticker) => {
    remove();
    setFirmName(ticker[0]?.shortName)
    const x = d3.scaleTime([d3.min(ticker, function (d) {
      return new Date(d?.dateTime);
    }), d3.max(ticker, function (d) {
      return new Date(d?.dateTime);
    })], [marginLeft, width - marginRight])
    
    
    const y = d3.scaleLog()
      .domain([d3.min(ticker, d => d.LowestPrice), d3.max(ticker, d => d.maxPrice)])
      .rangeRound([height - marginBottom, marginTop]);
    
    
    const svg = d3.select("#stockGraph")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
    
    // Append the axes.
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .tickValues(d3.utcMonday
          .every(width > 720 ? 1 : 2)
          .range(ticker.at(0)?.dateTime, ticker.at(-1)?.dateTime))
        .tickFormat(d3.utcFormat("%-m/%-d")))
      .call(g => g.select(".domain").remove());
    
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y)
        .tickFormat(d3.format("$~f"))
        .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
      .call(g => g.selectAll(".tick line").clone()
        .attr("stroke-opacity", 0.2)
        .attr("x2", width - marginLeft - marginRight))
      .call(g => g.select(".domain").remove());
    
    // Create a group for each day of data, and append two lines to it.
    const g = svg.append("g")
      .attr("stroke-linecap", "round")
      .attr("stroke", "black")
      .selectAll("g")
      .data(ticker)
      .join("g")
      .attr("transform", d => {
        return `translate(${x(new Date(d?.dateTime))},0)`
      });
    
    g.append("line")
      .attr("y1", d => y(d.LowestPrice))
      .attr("y2", d => y(d.maxPrice));
    
    g.append("line")
      .attr("y1", d => y(d.openPrice))
      .attr("y2", d => y(d.closePrice))
      .attr("stroke-width", 2)
      .attr("stroke", d => d.openPrice > d.closePrice ? d3.schemeSet1[0]
        : d.closePrice > d.openPrice ? d3.schemeSet1[2]
          : d3.schemeSet1[8]);
    
    // Append a title (tooltip).
    const formatDate = d3.utcFormat("%B %-d, %Y");
    const formatValue = d3.format(".2f");
    const formatChange = ((f) => (y0, y1) => f((y1 - y0) / y0))(d3.format("+.2%"));
    
    g.append("title")
      .text(d => `${formatDate(d?.dateTime)}
                        Open: ${formatValue(d.openPrice)}
                        Close: ${formatValue(d.closePrice)} (${formatChange(d.openPrice, d.closePrice)})
                        Low: ${formatValue(d.LowestPrice)}
                        High: ${formatValue(d.maxPrice)}`);
    
    return svg.node();
    
  }
  
  const remove = () => {
    d3.select("#stockGraph svg").remove();
  }
  
  
  useEffect(() => {
    d3.csv('public/data/StockInformation.csv')
      .then((data) => {
        setTicketData(data)
        drawGraph(data.slice(-150));
      })
  }, [])
  return (
    <BorderCom>
      <div style={{color:'#02a6b5'}}>示范性代表公司</div>
      <div id="stockGraph" style={{color: '#fff'}}></div>
      <div style={{color:'#02a6b5'}}>{firmName}股票趋势</div>
    </BorderCom>
  )
}

export default TicketCount;

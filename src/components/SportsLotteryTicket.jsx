import * as d3 from 'd3';
import {useEffect, useState} from "react";
import BorderCom from "./BorderCom.jsx";

/**
 * App 根组件
 * @return {JSX.Element}
 * @constructor
 */
function SportsLotteryTicket() {
  
  const [data, setData] = useState(null);
  const [dataRange, setDataRange] = useState(['2022-1-1', '2022-12-1']);
  const handleDraw = (data) => {
    handleRemove();
    const dataset = [];
    const count = [];
    data.forEach(item => {
      item.WinningNumbers.split(' ').forEach(jtem => {
        dataset.push({
          Multiplier: +item.Multiplier,
          DrawDate: +new Date(item.DrawDate).getTime(),
          WinningNumbers: +jtem
        })
        count[jtem] ? count[jtem]++ : count[jtem] = 1;
      })
      dataset.sort((a, b) => b.DrawDate - a.DrawDate)
    })
    const filterData = dataset.filter(item => {
      const start = new Date(dataRange[0]);
      const end = new Date(dataRange[1]);
      const now = new Date(item.DrawDate)
      return now >= start && now <= end;
    })
    console.log(`过滤日期${new Date(dataRange[0]).toLocaleString()},${new Date(dataRange[1]).toLocaleString()}`, filterData);
    // selection(dataset)
    graph(filterData);
  }
  
  const graph = (data) => {
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
      width = 450 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    const maxX = d3.max(data.map(item => item["DrawDate"]))
    const minX = d3.min(data.map(item => item["DrawDate"]))
    const maxY = d3.max(data.map(item => item["WinningNumbers"]))
    const minY = d3.min(data.map(item => item["WinningNumbers"]))
// append the svg object to the body of the page
    const Svg = d3.select(".ticketContainer")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    
    
    // Add X axis
    const x = d3.scaleLinear()
      .domain([minX, maxX])
      .range([0, width]);
    // const xAxis = Svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));
    const xAxis = Svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")));
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([minY, maxY])
      .range([height, 0]);
    Svg.append("g")
      .call(d3.axisLeft(y));
    // 添加网格线
    Svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0, 0)")
      .call(d3.axisLeft(y)
        .tickSize(-1000)
        .tickFormat("")
      )
      .selectAll(".tick line")
      .attr("stroke", "#dddddd");
    
    // Add a clipPath: everything out of this area won't be drawn.
    const clip = Svg.append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);
    
    const color = d3.scaleOrdinal()
      .domain([minY, maxY]) // 定义域为离散的数字
      .range(d3.schemeCategory10) // 值域为色轮中的颜色数组
    const brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    
    // Create the scatter variable: where both the circles and the brush take place
    const scatter = Svg.append('g')
      .attr("clip-path", "url(#clip)")
    
    // Add circles
    scatter
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      
      .attr("cy", function (d) {
        return y(d.WinningNumbers);
      })
      .attr("r", 5)
      .style("fill", function (d) {
        return color(d.WinningNumbers)
      })
      .style("opacity", 0.5)
      .transition()
      .delay(function (d, i) {
        return (i * 3)
      })
      .duration(2000)
      .attr("cx", function (d) {
        return x(d.DrawDate);
      })
    
    // Add the brushing
    scatter
      .append("g")
      .attr("class", "brush")
      .call(brush);
    
    // A function that set idleTimeOut to null
    let idleTimeout
    
    function idled() {
      idleTimeout = null;
    }
    
    // A function that update the chart for given boundaries
    function updateChart({selection}) {
      // const extent = d3.event.selection
      const extent = selection
      
      // If no selection, back to initial coordinate. Otherwise, update X axis domain
      if (!extent) {
        if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
        x.domain([minX, maxX])
      } else {
        x.domain([x.invert(extent[0]), x.invert(extent[1])])
        scatter.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
      }
      
      // Update axis and circle position
      xAxis.transition().duration(1000).call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
      scatter
        .selectAll("circle")
        .transition().duration(1000)
        .attr("cx", function (d) {
          return x(d.DrawDate);
        })
        .attr("cy", function (d) {
          return y(d.WinningNumbers);
        })
        .attr("r", 5)
    }
    
  }
  
  const handleRemove = () => {
    d3.select('.ticketContainer svg').remove();
  }
  
  // function onPick(value, context) {
  //   console.log('onPick:', value, context);
  // }
  
  function onChange(value, context) {
    setDataRange(context.dayjsValue.map(d => d.valueOf()));
    handleDraw(data);
    // console.log('onChange:', value, context);
    // console.log('timestamp', context.dayjsValue.map(d => d.valueOf()));
    // console.log('YYYYMMDD', context.dayjsValue.map(d => d.format('YYYYMMDD')));
  }
  
  useEffect(() => {
    d3.csv('./data/Lottery_Powerball_Winning_Numbers__Beginning_2010.csv')
      .then((dataset) => {
        setData(dataset);
        handleDraw(dataset);
      })
  }, [])
  
  return (
    <div style={{color: '#fff'}}>
      {/*<DateRangePicker defaultValue={['2022-1-1', '2022-12-1']} clearable onChange={onChange}*/}
      {/*                 disableDate={{before: '09/26/2020', after: '11/15/2023'}}/>*/}
      {/*<p>{dataRange[0] + ":" + dataRange[1]}</p>*/}
      <BorderCom>
        
        {/*<div className="ticketContainer" style={{background: "url(public/images/line.png)"}}>*/}
        <div className="panel-footer"></div>
        {/*</div>*/}
      </BorderCom>
    
    </div>
  )
}

export default SportsLotteryTicket;

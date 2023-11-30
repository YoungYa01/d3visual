import * as d3 from 'd3'
import BorderCom from "../BorderCom/BorderCom.jsx";
import {useEffect, useState} from "react";

/**
 * 面积图
 * @param showProvence
 * @return {JSX.Element}
 * @constructor
 */
const AreaChart = ({showProvence}) => {
  /** 数据 */
  const [dataset, setData] = useState([]);
  
  const maxHeight = 400;
  const maxWidth = 450;
  
  const colorArray = ['#00e11b', '#4babff', '#d7ce00', '#fe0000', '#FF4036', 'lightgrey'];
  
  /**
   * 绘面积图
   * @param stackData
   */
  function stackArea(stackData) {
    remove();
    
    const stack = d3.stack()
      .keys(['maxPrice', 'closePrice', 'openPrice', 'LowestPrice']);
    
    const series = stack(stackData);
    
    const stackMin = (serie) => d3.min(serie, (d) => d[0]);
    const stackMax = (serie) => d3.max(serie, (d) => d[1]);
    
    const yScale = d3.scaleLinear()
      .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
      .range([maxHeight, 100])
    
    const xAccessor = (d) => `${d.dateTime}`;
    
    const xScale = d3.scalePoint()
      .domain(stackData.map(xAccessor))
      .range([0, maxWidth])
    
    const xAxis = d3.axisBottom(d3.scaleBand(stackData.map(d => d.dateTime), [0, maxWidth]))
      .tickValues(xScale.domain().filter((d, i) => i % 30 === 0))
    
    const yAxis = d3.axisLeft(d3.scaleLinear([d3.min(series, stackMin), d3.max(series, stackMax)], [maxHeight, 20]))
    
    const area = d3.area()
      .x((d) => xScale(xAccessor(d.data)))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
    
    const svg = d3.select('#area_chart')
      .append('svg')
      .attr('width', maxWidth)
      .attr('height', maxHeight)
    
    svg.append('g')
      .selectAll('path')
      .data(series)
      .enter()
      .append('path')
      .attr('d', area)
      .attr('fill', (d, i) => colorArray[i % colorArray.length])
      .style('transform', 'translate(20px, -25px)')
      .style("opacity", '.8')
      .on('mouseenter', (e, d) => {
        d3.select(e.target)
          .style("opacity", '1')
      })
      .on('mouseout', (e, d) => {
        d3.select(e.target)
          .style("opacity", '.8')
      })
    svg.append('g')
      .style('transform', 'translateY(380px)')
      .call(xAxis)
      .attr('stroke', '#fff')
    svg.append('g')
      .style('transform', 'translate(20px, -5px)')
      .call(yAxis)
      .attr('stroke', '#d3d8f0')
      .select('path').remove();
  }
  
  
  useEffect(() => {
    d3.csv('./data/StockInformation.csv')
      .then((dataset) => {
        setData(dataset);
        stackArea(dataset.filter(item => item.province === "北京"))
      })
  }, [])
  
  useEffect(() => {
    stackArea(dataset.filter(item => item.province === showProvence))
  }, [showProvence])
  
  const remove = () => {
    d3.select('#area_chart svg').remove();
  }
  
  
  return (
    <BorderCom>
      <div id="area_chart" style={{paddingLeft:40}}></div>
    </BorderCom>
  )
  
}
export default AreaChart;

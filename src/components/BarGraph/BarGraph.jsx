import * as d3 from 'd3';
import BorderCom from "../BorderCom/BorderCom.jsx";

import {useEffect} from "react";

/**
 * 闭包函数创建tooltip
 * @return {function(): *}
 */
const gen = () => {
  let instance = void 0;
  return () => {
    if (!instance) {
      instance = d3.select(self.document.body)
        .append('div')
        .classed("tooltip", true)
        .style('position', 'absolute')
        .style('z-index', '100000')
        .style('color', '#ff7f0e')
        .style('visibility', 'hidden')   // 一开始设置为不可见
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('border', 'solid #acacac 1px')
        .style('padding', '10px 20px')
        .style('background', '#fff')
        .style('border-radius', '10px')
        .text('123213');
    }
    return instance;
  }
}
const handle = gen()

/**
 * 柱状图
 * @return {JSX.Element}
 * @constructor
 */
const BarGraph = () => {
  
  // 全局变量
  let data;
  let svgWidth = 400, svgHeight = 380;
  let intervalId = null; // 用于存储更新的定时器ID
  let currentRectCount = 0;
  let rectHeight = 14;
  let rectMargin = 1;
  
  /**
   * 创建图表的函数
   */
  function createChart() {
    // 确定图表的宽度和高度
    const xAxis = d3.axisLeft(d3.scaleBand(data.map(d => d.shortName), [0, svgHeight]))
    
    const yAxis = d3.axisBottom(d3.scaleLinear([d3.min(data, d => d.openPrice), d3.max(data, d => d.openPrice)], [0, svgHeight]))
    // 选择SVG元素并设置其宽度和高度
    const chart = d3.select("#bar_chart")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style('margin', 20)
    
    
    chart.append('g')
      .style('transform', 'translate(60px, -30px)')
      .call(xAxis)
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.4)
    
    chart.append('g')
      .style('transform', `translate(90px, ${svgHeight - 20}px)`)
      .call(yAxis)
      .attr('stroke', '#d3d8f0')
      .select('path').remove();
    // 更新矩形
    updateData();
  }
  
  /**
   * 更新数据的函数
   */
  function updateData() {
    // 计算下一组数据的起始索引和结束索引
    const startIndex = currentRectCount;
    const endIndex = startIndex + 26; // 每秒更新17个数据
    
    const newData = data.slice(startIndex, endIndex);
    
    d3.select('.bar_title').remove();
    
    d3.select("#bar_chart")
      .append('g')
      .classed('bar_title', true)
      .style('transform', `translate(0, ${svgHeight}px)`)
      .append('text')
      .classed("bar_title", true)
      .text(newData[0].dateTime)
      .attr('color', "#02a6b5")
      .attr('stroke', "#02a6b5")
    
    // 创建矩形并添加动画效果
    const rectangles = d3.select("#bar_chart").selectAll("rect")
      .data(newData)
      // .enter()
      .join("rect")
      .attr("x", 80)
      .attr("y", (d, i) => i * (rectHeight + rectMargin) - 50)
    rectangles.transition(d3.transition(d3.easeLinear).duration(1000))
      .attr("width", d => +d.maxPrice * 10) // 初始宽度为0
      .attr("height", rectHeight)
      .attr("fill", "steelblue")
    rectangles.on("mousemove", (e, d) => {
      // 鼠标覆盖时显
      handle().style('visibility', 'visible')
        .style('left', `${e.pageX + 10 + 'px'}`)
        .style('top', `${e.pageY + 25 + 'px'}`).text("234345324")
        .text(d.shortName + ' 开盘价 ' + d.openPrice + ' 最高价 ' + d.maxPrice);
    })
      .on("mouseout", function () {
        // 鼠标移开时移除
        d3.selectAll(".tooltip")
          .style('visibility', 'hidden')
      });
    
    
    currentRectCount = endIndex;
    if (currentRectCount >= data.length)
      currentRectCount = 0;
  }
  
  useEffect(() => {
    // 异步加载数据
    d3.csv("./data/StockInformation.csv").then(function (csvData) {
      data = csvData; // 将数据存储到全局变量中
      data.sort(function (a, b) {
        return d3.ascending(a.dateTime, b.dateTime);
      });
      // 在数据加载完成后调用创建图表的函数
      clearInterval(intervalId);
      createChart();
      // 设置定时器，每秒更新数据
      intervalId = setInterval(updateData, 3000);
    });
  }, [])
  
  return (
    <BorderCom>
      <svg id="bar_chart"></svg>
    </BorderCom>
  )
}

export default BarGraph;

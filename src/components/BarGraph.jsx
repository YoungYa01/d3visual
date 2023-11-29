import * as d3 from 'd3';
import BorderCom from "./BorderCom.jsx";
import {useEffect} from "react";

const BarGraph = () => {
  
  // 全局变量
  let data;
  let svgWidth, svgHeight;
  let intervalId = null; // 用于存储更新的定时器ID
  let currentRectCount = 0;
  let rectHeight = 20;
  let rectMargin = 1;
  
  // 创建图表的函数
  function createChart() {
    // 确定图表的宽度和高度
    svgWidth = 400;
    svgHeight = 400;
    
    // 选择SVG元素并设置其宽度和高度
    d3.select("#bar_chart")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style('margin',20)
    
    // 更新矩形
    updateData();
  }
  
  // 多个元素用到相同的动画过渡方式，定义一个统一的transition
  const transition = d3.transition().duration(1000).ease(d3.easeLinear)

// 更新数据的函数
  function updateData() {
    // 计算下一组数据的起始索引和结束索引
    const startIndex = currentRectCount;
    const endIndex = startIndex + 17; // 每秒更新17个数据
    // console.log(startIndex, endIndex);
    
    const newData = data.slice(startIndex, endIndex);
    // console.log(newData);
    // 清除现有的矩形
    d3.select("#bar_chart").selectAll("rect").remove();
    
    // 创建矩形并添加动画效果
    const rectangles = d3.select("#bar_chart").selectAll("rect")
      .data(newData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * (rectHeight + rectMargin))
      .attr("width", d => +d.maxPrice * 10) // 初始宽度为0
      .attr("height", rectHeight)
      .attr("fill", "steelblue")
      .on("mouseenter", (e, d) => {
        // 鼠标覆盖时显示shortName
        d3.select(e.target)
          .append("title")
          .text(d.shortName+' 开盘价 '+d.openPrice+' 最高价 '+d.maxPrice);
      })
    .on("mouseout", function () {
      // 鼠标移开时移除shortName
      d3.select(this)
        .select("title")
        .remove();
    });
    
    
    currentRectCount = endIndex;
    if (currentRectCount >= data.length)
      currentRectCount = 0;
  }
  
  
  useEffect(() => {
    // 异步加载数据
    d3.csv("public/data/StockInformation.csv").then(function (csvData) {
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

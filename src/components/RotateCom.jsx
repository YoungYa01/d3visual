import * as d3 from 'd3'
import {useEffect} from "react";
import BorderCom from "./BorderCom.jsx";

const RotateCom = () => {
  
  // 全局变量
  let svgWidth, svgHeight;
  let intervalId; // 用于存储更新的定时器ID
  let index = 5;
  
  // 创建图表的函数
  function createChart(data) {
    // 设置图表的宽度和高度
    svgWidth = 425;
    svgHeight = 400;
    
    // 创建SVG容器
    let svg = d3.select("#chart")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    
    // 创建矩形并绑定数据
    let rects = svg.selectAll("rect")
      .data(data.slice(0, 8)) // 只使用前6条数据
      .enter()
      .append("rect")
      .attr("y", function (d, i) {
        return i * (45 + 5);
      })
      .attr("x", 20)
      .attr("width", svgWidth-20)
      .attr("height", 45)
      .attr("fill", "rgb(107, 149, 212)") // 全部矩形颜色为蓝色
      .attr("stroke", function (d) {
        return getBorderColor(d); // 边框颜色由数据决定
      })
      .attr("stroke-width", 3) // 边框宽度增大
      .attr("rx", 10)
      .attr("ry", 10)
      .on("mouseover", function () {
        // 鼠标覆盖时停止更新
        stopUpdate();
      })
      .on("mouseout", function () {
        // 鼠移开时触发更新
        intervalId = setInterval(updateChart, 500); // 设置更新的定时器
      });
    
    // 在每个矩形上附加文本
    let texts = svg.selectAll("text")
      .data(data.slice(0, 8))
      .enter()
      .append("text")
      .text(function (d) {
        return d.shortName + " " + d.dateTime + " " + d.maxPrice;
      })
      .attr("x", svgWidth / 2) // 将文本放在矩形的中心
      .attr("y", function (d, i) {
        return i * (45 + 5) + (45 / 2); // 将文本放在矩形的中心
      })
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "black")
      .attr("font-size", "20px") // 设置字体大小
      .attr("font-family", 'SimSun');
    
    // 更新图表的函数
    function updateChart() {
      // 删除最前面的一条数据
      data.shift();
      
      // 在数据尾部添加新的数据（可以替换为从外部获取新数据的逻辑）
      // 这里我使用了 data[0] 的一个副本，实际应用中可能需要从外部获取新数据
      let newData = {...data[0]};
      
      // 更新矩形位置
      rects.data(data)
        .transition()
        .duration(1000)
        .attr("y", function (d, i) {
          return i * (45 + 5);
        });
      
      // 更新边框颜色
      rects.data(data)
        .transition()
        .duration(1000)
        .attr("stroke", function (d) {
          return getBorderColor(d);
        });
      
      // 更新文本内容
      texts.data(data)
        .text(function (d) {
          return d.shortName + " " + d.dateTime + " " + d.maxPrice;
        })
        .attr("y", function (d, i) {
          return i * (45 + 5) + (45 / 2); // 将文本放在矩形的中心
        });
      
      // 将新数据添加到数据尾部
      data.push(newData);
    }
    
    
    // 停止更新的函数
    function stopUpdate() {
      clearInterval(intervalId); // 清除定时器
    }
    
    // 根据数据获取边框颜色
    function getBorderColor(d) {
      return parseFloat(d.closePrice) >= parseFloat(d.openPrice) ? "Cyan" : "white";
    }
  }
  
  useEffect(() => {
    d3.csv("public/data/StockInformation.csv").then(function (csvData) {
      // 在数据加载完成后调用创建图表的函数
      createChart(csvData);
    });
  }, [])
  
  return (
    <BorderCom>
      <svg height="295px" width="1300px" id="chart" style={{margin:20}}></svg>
    </BorderCom>
  )
}

export default RotateCom;

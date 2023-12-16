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

export default BarGraph;import React, {useEffect, useState} from "react";
import ChinaGeo from "../components/Geo/Geo.jsx";
import {Button, Layout} from "tdesign-react";
import TicketCount from "../components/TicketCount/TicketCount.jsx";
import WordCloud from "../components/WordCloud/WordCloud.jsx";
import BGSvg from "../components/BGSvg/BGSvg.jsx";
import BarGraph from "../components/BarGraph/BarGraph.jsx";
import AreaChart from "../components/AreaChart/index.jsx";
import RotateCom from "../components/RotateCom/RotateCom.jsx";
import './index.css';

const {Header, Content, Footer} = Layout;
/**
 * 主页
 * @return {JSX.Element}
 * @constructor
 */
const HomePage = () => {
  
  const [dateNow, setDateNow] = useState(new Date());
  
  const [provence, setProvence] = useState(null);
  
  const handleProvienceClick = (pro) => setProvence(pro)
  
  useEffect(() => {
    setInterval(() => {
      setDateNow(new Date())
    }, 300)
  }, [])
  
  return (
    <>
      <Layout className="layout" style={{fontFamily: "Georgia, serif", overflow: 'hidden'}}>
        <Header className="header" style={{fontFamily: "微软雅黑", textIndent: '10em'}}>省代表公司股价动态分析<span
          style={{
            float: "right",
            paddingRight: 20,
            fontFamily: "electronicFont"
          }}>{dateNow.toLocaleString()}
          </span>
        </Header>
        <Content className="content" style={{padding:10}}>
          <BGSvg/>
          <div className="row">
            <div className="clo1" style={{flex: 1}}>
              <TicketCount showProvence={provence}/>
              <BarGraph/>
            </div>
            <div className="clo2" style={{flex: 2}}>
              <ChinaGeo provienceClick={handleProvienceClick}/>
              <RotateCom/>
            </div>
            <div className="clo3" style={{flex: 1}}>
              <WordCloud/>
              <AreaChart showProvence={provence}/>
            </div>
          </div>
        </Content>
        <Footer style={{
          textAlign: "center",
          color: "#02a6b5",
          position: "fixed",
          bottom: 0,
          left: '50%',
          transform: "translateX(-50%)"
        }}>Copyright @ 2023 YoungYa & Wang FY & Shuai Xin. All Rights
          Reserved</Footer>
      </Layout>
    </>
  )
}

export default HomePage;import React, {useEffect, useState} from "react";
import ChinaGeo from "../components/Geo/Geo.jsx";
import {Button, Layout} from "tdesign-react";
import TicketCount from "../components/TicketCount/TicketCount.jsx";
import WordCloud from "../components/WordCloud/WordCloud.jsx";
import BGSvg from "../components/BGSvg/BGSvg.jsx";
import BarGraph from "../components/BarGraph/BarGraph.jsx";
import AreaChart from "../components/AreaChart/index.jsx";
import RotateCom from "../components/RotateCom/RotateCom.jsx";
import './index.css';

const {Header, Content, Footer} = Layout;
/**
 * 主页
 * @return {JSX.Element}
 * @constructor
 */
const HomePage = () => {
  
  const [dateNow, setDateNow] = useState(new Date());
  
  const [provence, setProvence] = useState(null);
  
  const handleProvienceClick = (pro) => setProvence(pro)
  
  useEffect(() => {
    setInterval(() => {
      setDateNow(new Date())
    }, 300)
  }, [])
  
  return (
    <>
      <Layout className="layout" style={{fontFamily: "Georgia, serif", overflow: 'hidden'}}>
        <Header className="header" style={{fontFamily: "微软雅黑", textIndent: '10em'}}>省代表公司股价动态分析<span
          style={{
            float: "right",
            paddingRight: 20,
            fontFamily: "electronicFont"
          }}>{dateNow.toLocaleString()}
          </span>
        </Header>
        <Content className="content" style={{padding:10}}>
          <BGSvg/>
          <div className="row">
            <div className="clo1" style={{flex: 1}}>
              <TicketCount showProvence={provence}/>
              <BarGraph/>
            </div>
            <div className="clo2" style={{flex: 2}}>
              <ChinaGeo provienceClick={handleProvienceClick}/>
              <RotateCom/>
            </div>
            <div className="clo3" style={{flex: 1}}>
              <WordCloud/>
              <AreaChart showProvence={provence}/>
            </div>
          </div>
        </Content>
        <Footer style={{
          textAlign: "center",
          color: "#02a6b5",
          position: "fixed",
          bottom: 0,
          left: '50%',
          transform: "translateX(-50%)"
        }}>Copyright @ 2023 YoungYa & Wang FY & Shuai Xin. All Rights
          Reserved</Footer>
      </Layout>
    </>
  )
}

export default HomePage;# 省代表公司股价动态分析

## 项目介绍

（1）根据全国各地的代表公司股票数据，分析数据的独特性，并绘制多种不同类型的图表，包括条形图、区域图、词云图、K线图和全国地图，以展示数据的多样性和趋势。

（2）显示准确全地图，对于各省份的详细地图在点击对应省份实现。并且点击后在K线图和区域图上实现交互。

（3）K线图。在全地图上显示准确的地理信息，并提供详细的各省份地图，通过点击相应的省份实现交互功能。在与地图交互的同时，将相关数据呈现在K线图上，以便更好地理解和分析股票走势。

（4）区域图。利用区域图展示某个特定时间段内股价的变化情况，通过面积的大小来反映股价的涨跌幅度，从而更直观地观察和比较不同公司的股价走势。

（5）条形图。使用动态的条形图来展示每个公司随着时间推移的变化情况，特别是最高股价的变动情况，以便更清晰地了解不同公司的股价表现和潜在投资机会。

（6）词云图。获取数据信息，按数据的比重突出显示。

（7）最后根据这些图表信息分析得出股票价值与地区分布的关系。

## 项目运行

首先安装依赖项

```shell
npm install
# or
yarn install
```

然后运行即可

```shell
npm run dev
# or
yarn dev
```

本地访问

```
http://localhost:5173
```

import {useEffect, useState} from "react";
import * as d3 from 'd3'

const ChinaMap = () => {
  
  // const [mapView, setMapView] = useState(null);
  
  const margin = 20
  
  let mapView = null;
  
  let innerWidth = 0;
  let innerHeight = 0;
  
  function renderMapView(mapData) {
    // const provinceOrder = d3.groups(inputdata, d => d.Province)
    
    // let provinceObj = []
    // provinceOrder.forEach(row => {
    //   const obj = {}
    //   obj.province = row[0]
    //   obj.value = row[1].length  //省订单数量
    //   provinceObj.push(obj)
    // })
    
    // const maxOrderCount = d3.max(Array.from(d3.map(provinceOrder, d => d[1].length)))
    
    // const offset = document.getElementById('scatterview').clientWidth
    
    
    // 绘制渐变图例
    // svg.append('text').attr('x', width - 70).attr('y', height - 225).attr('font-size', 12).attr('fill', '#1f77b4').text('订单数量')
    // svg.append('text').attr('x', width - 45).attr('y', height - 205).attr('font-size', 12).attr('fill', '#1f77b4').text('-' + maxOrderCount)
    // svg.append('text').attr('x', width - 45).attr('y', height - 7).attr('font-size', 12).attr('fill', '#1f77b4').text('-0')
    
    // const legendarr = Array.from(Array(200), (v, k) => k)//生成0-199整数数组
    // const legendcolor = d3.scaleSequential([0, 200], d3.interpolateBlues)
    // svg.append('g').selectAll('line')
    //   .data(legendarr)
    //   .join('line')
    //   .attr('stroke', d => legendcolor(d))
    //   .attr('x1', width - 57)
    //   .attr('y1', (d, i) => height - 10 - i)
    //   .attr('x2', width - 45)
    //   .attr('y2', (d, i) => height - 10 - i)
    
    // 绘制地图
    
    
    const projection = d3.geoMercator()
      .center([103, 39])
      .scale(450)
      .translate([innerWidth / 2 - 30, innerHeight / 2])
    
    const path = d3.geoPath().projection(projection)
    const color = d3.scaleSequential([0, 10000], d3.interpolateBlues)
    
    const tooltip = d3.select('#mapview')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('color', '#1f77b4')
      .style('visibility', 'hidden')   // 一开始设置为不可见#1f77b4
      .style('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('')
    
    // d3.json('../Resources/data/china.geojson').then(mapData => {
    mapData.features.forEach(row => {
      row.properties.count = 0
      // provinceObj.forEach(e => {
      //   if (row.properties.name === e.province)
      //     row.properties.count = e.value
      // })
    })
    
    console.log(mapView);
    mapView?.selectAll('path')
      .data(mapData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('calss', 'mapPath')
      .attr('opacity', 1.0)
      .attr('fill', "#000")
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      // .on('dblclick', function (event, element) {//鼠标双击选中或取消选中
      //   selected = !selected
      //   if (selected) {
      //     // 不能用地图数据来返回过滤出来的数据，因为地图数据不是读入的inputdata，下同
      //     let selectedData = scatterView.selectAll('.dot').filter(d => d.Province == element.properties.name).data()
      //     renderSunburstView(selectedData)
      //     renderDataView(selectedData)
      //   } else {
      //     renderSunburstView(inputdata)
      //     renderDataView(inputdata)
      //   }
      // })
      .on('mouseenter', function (event, element) {
        console.log(event);
        if (!event.target) {
          // if (!selected) {
          d3.select(this).attr('fill', 'darkorange')
          let province = element.properties.name
          
          tooltip.style('visibility', 'visible')
            .style('left', `${d3.pointer(event)[0] + 'px'}`)
            .style('top', `${d3.pointer(event)[1] + 'px'}`)
            .text(province + '订单数：' + element.properties.count)
          
          // scatterView.selectAll('.dot').filter(d => d.Province != province).attr('stroke', 'none')
          // let selectedData = scatterView.selectAll('.dot').filter(d => d.Province == province).data()
          // renderSunburstView(selectedData)
        }
      })
      .on('mouseout', function (event) {
        if (!event.target) {
          // if (!selected) {
          d3.select(this).attr('fill', d => color(d.properties.count))
          
          tooltip.style('visibility', 'hidden')
          
          // scatterView.selectAll('.dot').attr('stroke', d => colorscale(d.Category))
          // renderSunburstView(inputdata)
        }
      })
    // })
  }
  
  
  useEffect(() => {
    d3.json('./data/china.geojson')
      .then((data) => {
        const height = document.getElementById('mapview').clientHeight
        const width = document.getElementById('mapview').clientWidth
        const svg = d3.select('#mapview')
          .append('svg')
          .attr('width', `${width}px`)
          .attr('height', `${height}px`)
        innerWidth = width - margin;
        innerHeight = height - margin;
        console.log(svg);
        mapView = svg.append('g').attr('id', 'gMap')
        renderMapView(data);
      })
  }, [])
  
  return (
    <div id='mapview'></div>
  )
}

export default ChinaMap;

import * as d3 from 'd3'
import {useEffect, useState} from "react";
import {Button, Dropdown} from "tdesign-react";
import './geo.css'

/**
 * 中华人名共和国地图组件
 * @param provienceClick
 * @return {JSX.Element}
 * @constructor
 */
const ChinaGeo = ({provienceClick}) => {
  
  const [geoProjection, setGeoProjection] = useState(`d3.geoMercator()`);
  
  const [chinaData, setChinaData] = useState(null);
  
  const margin = {top: 100, left: 100, bottom: 100, right: 100}
  const innerWidth = 600 - margin.left - margin.right
  const innerHeight = 450 - margin.top - margin.bottom
  
  useEffect(() => {
    d3.json('./data/china.geojson')
      .then(data => {
        console.log(data);
        setChinaData(data);
        drawGeo(data);
      })
  }, [])
  
  /**
   * 移除
   */
  const remove = () => {
    d3.selectAll('#mapView path').remove();
    d3.select('.tooltip').remove();
  }
  
  /**
   * 绘制地图
   * @param data
   */
  const drawGeo = (data) => {
    remove();
    
    const svg = d3.select('#mapView');
    
    svg.attr('width', 900)
      .attr('height', 800)
    
    
    //设置地图投影方式
    const projection = geoProjectionChange()
    
    // 创建和设置地理路径生成器
    const path = d3.geoPath().projection(projection)
    
    // 创建一个缩放行为
    const zoom = d3.zoom()
      .scaleExtent([1, 300])  // 设置缩放的范围
      .on("zoom", zoomed);
    
    svg.on('dblclick', () => {
      d3.json('./data/china.geojson')
        .then(data => {
          drawGeo(data);
        })
    })
    
    svg.call(zoom)
    
    // 缩放事件处理函数
    function zoomed(e) {
      // 获取当前的缩放状态
      const transform = e.transform;
      // 更新地图的投影和路径生成器
      projection.scale(transform.k * 300)
        .translate([200 + transform.x, 200 + transform.y]);
      // 重新绘制地图
      svg.selectAll("path")
        .attr("d", path);
      
    }
    
    const tooltip = createToolTip();
    
    svg.selectAll('path')
      .data(data.features || data.geometry) //加载数据，一定要打开JSON文件看结构，然后决定加载那个层次数据
      .enter()
      .append('path')
      .attr('d', path)
      .attr('opacity', 0.6)
      .attr('fill', '#1f77b4')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .style('position', 'relative')
      .on('mousemove', (e, d) => {
        d3.select(e.target)
          .attr('fill', '#d6fffc')
        tooltip.style('visibility', 'visible')
          .style('left', `${e.pageX + 10 + 'px'}`)
          .style('top', `${e.pageY + 25 + 'px'}`)
          .html(`${d.properties.name}<br>面积${d.properties.size || d.properties.adcode % 1000}km²`)
      })
      .on('mouseleave', (e) => {
        d3.select(e.target)
          .attr('fill', '#1f77b4')
        d3.select('.tooltip')
          .style('visibility', 'hidden')
      })
      .on('click', (e, d) => {
        provienceClick(d.properties.name)
        d3.json(`./data/province/${d.properties.name}.geojson`)
          .then((mapData) => {
            remove();
            drawGeo(mapData);
          })
      })
  }
  
  /**
   *
   * @return {*}
   */
  const geoProjectionChange = () => eval(geoProjection)
    .center([95, 45]) //设置地图中心位置
    .scale(500) //设置缩放比例
    .translate([innerWidth / 2, innerHeight / 2]) //地图中心放置位置
  
  /**
   * 创建tooltip
   * @return {Selection<ElementTagNameMap[string], unknown, HTMLElement, any>}
   */
  const createToolTip = () => {
    return d3.select('body')
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
  /**
   * 改变选中
   * @param v
   */
  const handleSelectChange = (v) => {
    setGeoProjection(v.value)
    drawGeo(chinaData);
  };
  
  
  return (
    <div style={{width: 800, height: 600, display: "inline-block", position: 'relative'}}>
      <Dropdown options={[
        {
          content: '墨卡托投影',
          value: `d3.geoMercator()`,
        },
        {
          content: '圆柱投影',
          value: `d3.geoEquirectangular()`,
        },
        {
          content: '兰伯特正形圆锥投影',
          value: `d3.geoConicConformal()`,
        },
      ]} onClick={handleSelectChange}>
        <Button variant="text" style={{position: 'absolute', color: '#02a6b5'}}>
          投影方式
        </Button>
      </Dropdown>
      <svg id="mapView"></svg>
    </div>
  )
}

export default ChinaGeo;

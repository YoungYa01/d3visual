import * as d3 from 'd3'
import {useEffect, useState} from "react";
import BorderCom from "../BorderCom/BorderCom.jsx";
import cloud from 'd3.layout.cloud'
import {Button, Dropdown} from "tdesign-react";

/**
 * 词云
 * @return {JSX.Element}
 * @constructor
 */
const WordCloud = () => {
  
  const [type, setType] = useState("maxPrice")
  const [data, setData] = useState([]);
  
  let timer = null;
  /**
   * 移除
   */
  const remove = () => {
    d3.select("#word_cloud svg").remove();
  }
  
  const fill = d3.scaleOrdinal(d3.schemeCategory10)
  
  /**
   * 先计算后绘制
   * @param words
   */
  const render = (words) => {
    const layout = cloud()
      .size([400, 350])
      .words(words)
      .padding(5)
      .rotate(function () {
        return ~~(Math.random() * 2) * Math.random() * 180;
      })
      .font("Impact")
      .fontSize(function (d) {
        return d.size;
      })
      .on("end", draw);
    
    layout.start();
  
    /**
     * 绘图
     * @param words
     */
    function draw(words) {
      remove();
      
      const wordCloud = d3.select("#word_cloud").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      
      wordCloud.selectAll("text")
        .data(words)
        .enter().append("text")
        .transition(d3.transition(eval(animations[Math.random() * animations.length - 1])).duration(1500))
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr('fill', d => fill(d.size))
        .attr("transform", function (d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
          return d.text;
        });
    }
  }
  /**
   * 动画数组
   * @type {string[]}
   */
  const animations = ['easeLinear', 'easePolyIn', 'easePolyOut', 'easePolyInOut', 'easeQuad', 'easeQuadIn', 'easeQuadOut',
    'easeQuadInOut', 'easeCubic', 'easeCubicIn', 'easeCubicOut', 'easeCubicInOut', 'easeSin', 'easeSinIn', 'easeSinOut', 'easeSinInOut',
    'easeExp', 'easeExpIn', 'easeExpOut', 'easeExpInOut', 'easeCircle', 'easeCircleIn', 'easeCircleOut', 'easeCircleInOut', 'easeElastic',
    'easeElasticIn', 'easeElasticOut', 'easeElasticInOut', 'easeBack', 'easeBackIn', 'easeBackOut', 'easeBackInOut',
    'easeBounce', 'easeBounceIn', 'easeBounceOut', 'easeBounceInOut']
  
  useEffect(() => {
    d3.csv('./data/StockInformation.csv')
      .then((data) => {
        const groupData = d3.groups(data, d => d.shortName);
        setData(groupData);
        const wordData = [];
        groupData.forEach(([name, arrayData]) => {
          wordData.push({
            text: name,
            size: arrayData[arrayData.length - 1].maxPrice
          })
        });
        render(wordData);
        clearInterval(timer);
        timer = setInterval(() => {
          render(wordData);
        }, 5000)
      })
  }, [])
  
  useEffect(() => {
    clearInterval(timer);
    const wordData = [];
    data.forEach(([name, arrayData]) => {
      wordData.push({
        text: name,
        size: arrayData[arrayData.length - 1][type]
      })
    });
    render(wordData);
    timer = setInterval(() => {
      render(wordData);
    }, 5000)
  }, [type])
  
  
  return (
    <BorderCom>
      <div style={{color: '#02a6b5'}}>
        <Dropdown options={[
          {
            content: '最高价',
            value: `maxPrice`,
          },
          {
            content: '最低价',
            value: `LowestPrice`,
          },
          {
            content: '开盘价',
            value: `openPrice`,
          },
          {
            content: '收盘价',
            value: `closePrice`,
          },
        ]} onClick={v => setType(v.value)}>
          <Button variant="text" style={{color: '#02a6b5'}}>
            股票词云
          </Button>
        </Dropdown>
      </div>
      <div id="word_cloud"></div>
    </BorderCom>
  )
}

export default WordCloud;

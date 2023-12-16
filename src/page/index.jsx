import React, {useEffect, useState} from "react";
import ChinaGeo from "../components/Geo/Geo.jsx";
import {Layout} from "tdesign-react";
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
        <Content className="content" style={{padding: 10}}>
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

export default HomePage;

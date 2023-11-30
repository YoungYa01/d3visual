import React, {useEffect, useState} from "react";
import ChinaGeo from "../components/Geo/Geo.jsx";
import {Col, Layout, Row} from "tdesign-react";
import TicketCount from "../components/TicketCount/TicketCount.jsx";
import WordCloud from "../components/WordCloud/WordCloud.jsx";
import BGSvg from "../components/BGSvg/BGSvg.jsx";
import BarGraph from "../components/BarGraph/BarGraph.jsx";
import AreaChart from "../components/AreaChart/index.jsx";
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
        <Header className="header">HELLO REACT & D3 <span
          style={{
            float: "right",
            paddingRight: 20,
            fontFamily: "electronicFont"
          }}>{dateNow.toLocaleString()}</span></Header>
        <Content className="content">
          <BGSvg/>
          <Row gutter={16}>
            <Col span={3}>
              {/*<SportsLotteryTicket/>*/}
              <TicketCount showProvence={provence}/>
              <BarGraph/>
            </Col>
            <Col span={5}>
              <ChinaGeo provienceClick={handleProvienceClick}/>
            </Col>
            <Col span={3} style={{marginLeft: 135}}>
              <WordCloud/>
              {/*<RotateCom/>*/}
              <AreaChart showProvence={provence}/>
            </Col>
          
          </Row>
        
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

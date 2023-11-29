import React, {useEffect, useState} from "react";
import SportsLotteryTicket from "../components/SportsLotteryTicket.jsx";
import ChinaGeo from "../components/Geo.jsx";
import {Col, Layout, Row} from "tdesign-react";
import TicketCount from "../components/TicketCount.jsx";
import WordCloud from "../components/WordCloud.jsx";
import BGSvg from "../components/BGSvg.jsx";

import './index.css';
import RotateCom from "../components/RotateCom.jsx";
import BarGraph from "../components/BarGraph.jsx";

const {Header, Content, Footer} = Layout;

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
              <RotateCom/>
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

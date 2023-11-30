// eslint-disable-next-line no-unused-vars
import React from "react";
import '../SportsLotteryTicket.css'

/**
 * 小图边框组件
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const BorderCom = (props) => (
  <div className="ticketContainer" style={{background: "url(./images/line.png)"}}>
    {/* eslint-disable-next-line react/prop-types */}
    {props.children}
    <div className="panel-footer"></div>
  </div>
)

export default BorderCom;

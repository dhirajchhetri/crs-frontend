// 0, Total Project Participants

import { Card, Col, Row } from "react-bootstrap";
import { dashboardChartDisplayText, GraphType } from "../../../config/constant";
import CardOptions from "./cardOptions";
import HoverDisplay from "./hoverDisplay";
import info from '../../../assets/images/info.png';
import React  from "react";
import ChartDisplayByType from "./ChartDisplayByType";



function WidgetCard({index, title, handleHover, handleWidgetMenuClick, menu, show, chartType, datum, labelType, infoText,height=250, graphs=1}) {
   return (
   <>
    <Card>
        <Card.Header>
            <Row>
                <Col md={2}  align="left">
                    <img src={info} onMouseEnter={() => handleHover(index)} onMouseLeave={() => handleHover(index)} />
                </Col>
                <Col md={8} align="center">
                    <Card.Title as="h5" className="text-dark">
                        {title}
                    </Card.Title>
                </Col>
                <Col md={2} align="right">
                    <i className="feather icon-menu menu-pie"
                        onClick={()=>handleWidgetMenuClick(index)}
                       />
                </Col>
                {show[index] && <HoverDisplay  displaytext={infoText}/>}
                {menu[index] && <CardOptions />}
            </Row>
        </Card.Header>
        <Card.Body className="text-center card-body-chart">
            <Row>
        {new Array(graphs).fill('x').map((x,i)=> (
            <Col md={graphs>1?Math.round(12/graphs):12}>
         <ChartDisplayByType key={i} chartType ={chartType} datum={graphs>1?datum[i]:datum} labelType={labelType} 
         height={height}/>
            </Col>
         ))}

            </Row>
         </Card.Body>
     </Card>
    
   </>)
}

export default React.memo(WidgetCard);
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import HighChartKPIData from '../../../charts/high-charts/kpidata';
function ProgramProgress({}) {
    const dispatch = useDispatch();
    const handleChange = (event) => {
      console.log(event.target.value,'Event');
    //   dispatch(getSectorSelected(event.target.value));
    }
    return (
        <>
            <Row>
                <Col sm={12} md={12} xl={12} lg={12}>
                    <HighChartKPIData/>
                </Col>
            </Row>
        </>
    );
}

export const MemoProgramProgress = React.memo(ProgramProgress);

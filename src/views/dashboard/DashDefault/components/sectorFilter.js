import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
// import { getSectorSelected } from '../../../../store/selected.actions';
import { useDispatch, useSelector } from 'react-redux';
function SectorFilter({}) {
    const dispatch = useDispatch();
    const handleChange = (event) => {
        // console.log(event.target.value, 'Event');
        // dispatch(getSectorSelected(event.target.value));
    };
    return (
        <>
            {' '}
            <label className="font-weight-bolds"> Sectors </label>{' '}
            <Form.Group id="formGridCheckbox" onChange={handleChange}>
                <Row>
                    <Col md={4}>
                        <Form.Check type="radio" value="livelihood" label="Livelihood " name="radio1" id="202" for="202" />
                    </Col>
                    <Col md={4}>
                        <Form.Check type="radio" value="sheltr" label="Shelter" name="radio1" id="203" for="203" />
                    </Col>
                    <Col md={4}>
                        <Form.Check
                            type="radio"
                            value="water-infrastructure"
                            label="Water Infrastructure"
                            name="radio1"
                            id="203"
                            for="203"
                        />
                    </Col>
                </Row>
            </Form.Group>
        </>
    );
}

export const MemoSectorFilter = React.memo(SectorFilter);

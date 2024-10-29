import React from 'react';
import { Form } from 'react-bootstrap';

function PerformanceFilter({}) {
    return (
        <>
            {' '}
            <label className="font-weight-bolds"> Performance Indicator </label>{' '}
            <Form.Group id="formGridCheckbox">
                <Form.Check type="radio" label="Top-up Support" name="radio2" id="102" for="102"/>
                <Form.Check type="radio" label="MLT Support" name="radio2" className="mt-3" id="103" for="103"/>
                <Form.Check type="radio" label="LCH Support" name="radio2" className="mt-3" id="104" for="104"/>
                <Form.Check type="radio" label="Tecnhical Assistance" name="radio2" className="mt-3" id="105" for="105"/>
                <Form.Check type="radio" label="Skill-building Training" name="radio2" className="mt-3" id="106" for="106"/>
                <Form.Check type="radio" label="Materials Inputs" name="radio2" className="mt-3" id="107" for="107"/>
            </Form.Group>
        </>
    );
}

export const MemoPerformanceFilter = React.memo(PerformanceFilter);

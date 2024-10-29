import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';

const YearFilter = ({ years, handleYearFilterChange }) => {
    const [checkedState, setCheckedState] = useState(new Array(years.length).fill(false));
    return (
        <>
            <label className="font-weight-bolds"> Year </label>{' '}
            <Form.Group id="formCheckbox">
                <Row>
                    {years.map((value, index) => {
                        return (
                            <Col md={6}>
                                <Form.Check
                                    key={`cb-${index}`}
                                    type="checkbox"
                                    label={value}
                                    value={value}
                                    // className="mt-3"
                                    for={`${index}`}
                                    id={`${index}`}
                                    onChange={handleYearFilterChange}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Form.Group>
        </>
    );
};

export const MemoYearFilter = React.memo(YearFilter);

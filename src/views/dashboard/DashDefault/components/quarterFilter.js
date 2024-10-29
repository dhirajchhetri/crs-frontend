import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const QuarterFilter = ({ quarters, handleQuarterFilterChange, isDisabled = true }) => {
    const [checkedState, setCheckedState] = useState(new Array(quarters.length).fill(false));

    useEffect(() => {
        setCheckedState(new Array(quarters.length).fill(false));
    }, [isDisabled]);
    const handleCheck = (index, e) => {
        setCheckedState(() => {
            checkedState[index] = !checkedState[index];
            return [...checkedState];
        });
        handleQuarterFilterChange(e);
    };
    return (
        <>
            <fieldset disabled={isDisabled}>
                <label className="font-weight-bolds"> Quarters </label>{' '}
                <Form.Group id="formGridCheckbox">
                    <Row>
                        {quarters.map((entry, index) => {
                            return (
                                <Col md={3}>
                                    <Form.Check
                                        key={`cb-${index}`}
                                        type="checkbox"
                                        label={entry.label}
                                        value={entry.value}
                                        checked={checkedState[index]}
                                        // className="mt-3"
                                        for={`${index}`}
                                        id={`${index}`}
                                        onChange={(e) => handleCheck(index, e)}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Form.Group>
            </fieldset>
        </>
    );
};

export const MemoQuarterFilter = React.memo(QuarterFilter);

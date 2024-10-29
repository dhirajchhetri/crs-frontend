import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import crslogo from '../../../../assets/images/crs-title-logo.png';
import crsRecoverlogo from '../../../../assets/images/crs-recover.png';

import { Row, Col } from 'react-bootstrap';

const NavLeftLogo = () => {
    return (
        <React.Fragment>
            <div className="ml-3">
                <Link to="/" className="b-brand">
                    <Row>
                        <Col md={2} className="crs-logo">
                            <img src={crslogo} alt="CRS LOGO" className="img-fluid" />
                        </Col>
                        <Col md={2} className="">
                            <div className="dashboardrecoverlogo">
                                <img src={crsRecoverlogo} className="img-fluid" />
                            </div>
                        </Col>
                    </Row>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default NavLeftLogo;

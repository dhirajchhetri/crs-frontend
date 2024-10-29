import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ConfigContext } from '../../../../contexts/ConfigContext';
import * as actionType from '../../../../store/actions';
import crslogo from '../../../../assets/images/crs-title-logo.png';
import recoverlogo from '../../../../assets/images/crs-recover.png';

import { Row, Col } from 'react-bootstrap';

const NavLogo = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;

    // let toggleClass = ['mobile-menu-on'];
    // if (collapseMenu) {
    //     toggleClass = [...toggleClass];
    // }

    return (
        <React.Fragment>
            <div className="navbar-brand header-logo">
                <Link to="\" className="b-brand">
                    <Row>
                        <Col md={6} className="float-left logo">
                            {' '}
                            <img src={crslogo} alt="CRS LOGO" width={'40'} height={'40'} />
                        </Col>
                        <Col md={6} className="float-right logo">
                            {' '}
                            <div className="recover-logo">
                                <img className="float-right" src={recoverlogo} alt="Recover LOGO" width={'50'} height={'40'} />
                            </div>
                        </Col>
                    </Row>
                </Link>
                <Link
                    to="#"
                    // className={toggleClass.join(' ')}
                    id="mobile-collapse"
                    onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
                >
                    <span />
                </Link>
            </div>
        </React.Fragment>
    );
};

export default NavLogo;

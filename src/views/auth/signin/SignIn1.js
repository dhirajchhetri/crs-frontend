import React, { useState } from 'react';
import { Card, Row, Col, Modal, Form, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

import RestLogin from './RestLogin';
import crsRecoverlogo from '../../../assets/images/crs-recover.png';
import crslogo from '../../../assets/images/crs-title-logo.png';
import NP1 from '../../../assets/images/NP1.jpg';
import NP2 from '../../../assets/images/NP2.jpg';
import NP3 from '../../../assets/images/NP3.jpg';
import NP4 from '../../../assets/images/NP4.jpg';
import bottombrand from '../../../assets/images/bottombrand.png';
import lumanti from '../../../assets/images/Lumanti.jpg';
import Sappros from '../../../assets/images/Sappros.jpg';

const Signin1 = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);
    const handlePrivacyPolicyClick = () => setShowPrivacy(!showPrivacy);

    const [showContact, setShowContact] = useState(false);
    const handleContactClick = () => setShowContact(!showContact);
    const imagePath = '../../../assets/images';
    return (
        <>
            <div className="container-fluid fwrapper">
                <Row>
                    <div className="bottom-brand">
                        <img src={bottombrand} />
                    </div>
                    <div className="right-brand"></div>
                    <Col md={4}>
                        <div className="login-content-left">
                            <div className="recoverlogo">
                                <img src={crsRecoverlogo} />
                            </div>
                            <div className="login-content-header">
                                <span>
                                    Welcome To <br />
                                    CRS-<span style={{ color: '#f78e3c' }}>ReCoVER </span>
                                    Dashboard
                                </span>
                            </div>
                            <div className="recover-content">
                                <span>
                                    Resilient Communities through Vulnerable Earthquake Recovery (ReCoVER) is a 3-year multi-sectoral
                                    recovery project that will support 6,240 families affected by the 2015 earthquake. Using a targeted,
                                    tailored approach to reconstruction, ReCoVER will assist 4,000 households in the districts of Lamjung,
                                    Tanahun and Kaski to build safer homes and restore critical water supply for the most vulnerable
                                    families. To ensure the success of this approach, the program will support households to improve
                                    financial planning, home-based livelihoods and savings that help families withstand future shocks. The
                                    4,000 reconstructed homes plus an additional 2,240 neighboring households that benefit from water supply
                                    and livelihood improvements add to a total of 6,240 households, or 31,200 individuals, that will be
                                    supported to survive and thrive in their homes and communities.
                                </span>
                            </div>

                            <div className="footer">
                                <div className="footer-heading"> Implementing Partner</div>
                                <Row>
                                    <Col md={3}>
                                        <div className="recoverlogo">
                                            <img src={lumanti} />
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <div className="recoverlogo">
                                            <img src={Sappros} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="crs-title-logo">
                            <img src={crslogo} />
                        </div>

                        <Row className="Login">
                            <Col md={6} style={{ padding: '10px' }}>
                                <div class="login-body">
                                    <div class="login-heading">Sign In</div>
                                    <div>
                                        <RestLogin />
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} style={{ padding: '20px' }}>
                                <div className="image-cover">
                                    <img src={NP1} />
                                </div>
                                <div className="image-list">
                                    <Row>
                                        <Col md={4}>
                                            <div className="image-individual">
                                                <img src={NP2} />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="image-individual">
                                                <img src={NP3} />
                                            </div>
                                        </Col>
                                        <Col md={4}>
                                            <div className="image-individual">
                                                <img src={NP4} />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="login-footer">
                                <div class="flex-items">
                                    <a href="#" onClick={handlePrivacyPolicyClick} className="forget-password">
                                        Privacy Statement
                                    </a>
                                    <a href="#" onClick={handleContactClick} className="forget-password" style={{ marginLeft: '50px' }}>
                                        Contact
                                    </a>
                                </div>
                                <div class="flex-items"></div>
                                <div class="flex-items">
                                    <a href="#" className="forget-password">
                                        @CRSNEPAL2022
                                    </a>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    {showPrivacy && (
                <>
                    <Modal show={showPrivacy} onHide={handlePrivacyPolicyClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>Privacy Policy</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            This section is the privacy policy by the csr
                        </Modal.Body>
                        <Modal.Footer>
                           
                        </Modal.Footer>
                    </Modal>
                </>
            )}

{showContact && (
                <>
                    <Modal show={showContact} onHide={handleContactClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>Contact Us</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <div className="form-group mb-3">
                                        {/* <i class="feather icon-user" /> */}
                                        <i class="feather icon-user icon"></i>

                                        <input
                                            className="form-control"
                                            label="Full Name"
                                            placeholder="Full Name"
                                            name="name"
                                            type="text"
                                            value=""
                                        />
                                    </div>{' '}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <div className="form-group mb-3">
                                        {/* <i class="feather icon-user" /> */}
                                        <i class="feather icon-mail icon"></i>

                                        <input
                                            className="form-control"
                                            label="Email"
                                            placeholder="Email"
                                            name="email"
                                            type="email"
                                            value=""
                                        />
                                    </div>{' '}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Message</Form.Label>
                                    <div className="form-group mb-3">
                                        {/* <i class="feather icon-user" /> */}
                                        <i class="feather icon-message-square icon"></i>

                                        <input
                                            className="form-control"
                                            label="Message"
                                            placeholder="Message"
                                            name="message"
                                            type="textarea"
                                            value=""
                                        />
                                    </div>{' '}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="email-submit" onClick={handleContactClick}>
                                Send A Message
                            </Button>
                            <Button variant="danger" onClick={handleContactClick}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
                </Row>
            </div>
        </>
    );
};

export default Signin1;

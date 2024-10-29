import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Alert, Form, Modal } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { API_SERVER } from './../../../config/constant';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';
import * as mockAdaptor from 'axios-mock-adapter';
import { login } from '../../../store/account.actions';
import ForgetPasswordModal from '../../../components/Modal/forgetpassword';

const RestLogin = ({ className, ...rest }) => {
    const dispatcher = useDispatch();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required('Username is required'),
                    password: Yup.string().max(255).required('Password is required'),
                })}
                onSubmit={async (values) => {
                    dispatcher(login(values));
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <i class="feather icon-user icon"></i>

                            <input
                                className="form-control"
                                error={touched.username && errors.username}
                                label="Username"
                                placeholder="Username"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="username"
                                value={values.username}
                            />
                            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
                        </div>
                        <div className="form-group mb-0">
                            <i class="feather icon-lock icon"></i>
                            <input
                                className="form-control"
                                error={touched.password && errors.password}
                                label="Password"
                                placeholder=" Password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}

                        <Row style={{ paddingTop: '15px' }}>
                            <Col md={6}>
                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox" id="100" for="100" label="Remeber me" />
                                </Form.Group>
                            </Col>
                            <Col md={6} style={{ padding: '5px' }}>
                                <a onClick={handleClick} className="forget-password">
                                    Forgot Password?
                                </a>
                            </Col>
                        </Row>

                        <Row>
                            <Col mt={1}>
                                <Button disabled={isSubmitting} type="submit" className="login-submit">
                                    Log in
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
            {show && (
                <>
                    <Modal show={show} onHide={handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>Forgot Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
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
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="email-submit" onClick={handleClick}>
                                Email Password Reset Link
                            </Button>
                            <Button variant="danger" onClick={handleClick}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </React.Fragment>
    );
};

export default RestLogin;

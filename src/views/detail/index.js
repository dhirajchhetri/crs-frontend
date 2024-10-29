import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCSRDataDetail } from '../../store/detail.actions';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import ReactMapGL, { Marker } from "react-map-gl";

const Detail = () => {
    const params = useParams();

    const dispatch = useDispatch();
    const detailData = useSelector((state) => state.detailDataReducer.detailData);
    const csrSingleViewData = detailData.hhr?.data;
    const sta = detailData.sta?.data;
    const lta = detailData.lta?.data;
    const ist = detailData.ist?.data;
    const vst = detailData.vst?.data;

    const [lng, setLng] = useState(csrSingleViewData?.reg_gpa_coordinate_long);
    const [lat, setLat] = useState(csrSingleViewData?.reg_gpa_coordinate_lat);
    const [zoom, setZoom] = useState(9);
    const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: csrSingleViewData?.reg_gpa_coordinate_long,
    zoom: 9,
  });
    useEffect(() => {
        dispatch(getCSRDataDetail(params.caseId));
    }, [params.caseId]);

  
    console.log(detailData)
    return (
        <React.Fragment>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <div class="d-flex flex-column align-items-center text-center">
                                <div className='image' style={{width:'200px', height:'200px'}}>
                                <img
                                    src={csrSingleViewData?.reg_photo}
                                    alt={csrSingleViewData?.reg_name_head_hh}
                                    class="rounded-circle"
                                    width="100%"
                                    height="100%"
                                ></img>
                                </div> 
                                <div class="mt-3">
                                    <h4>{csrSingleViewData?.reg_name_head_hh}</h4>
                                    <p class="text-secondary mb-1">{csrSingleViewData?.reg_gender_head_hh}</p>
                                    <p class="text-muted font-size-sm">{csrSingleViewData?.reg_contact_number}</p>
                                    <Button class="btn btn-primary">{csrSingleViewData?.reg_age_head_hh}</Button>
                                    <Button class="btn btn-outline-primary">Edit</Button>
                                </div>
                            </div>{' '}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className='detail-page-card'>
                        <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
                            <Tab eventKey="home" title="Participant Details">
                                <Card.Body>
                                    <Row>
                                        <Col sm={3}>
                                            <h6 class="mb-0">Full Name</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                        {csrSingleViewData?.reg_name_head_hh}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={3}>
                                            <h6 class="mb-0">Ethinicity</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary">
                                        {csrSingleViewData?.reg_ethnicity_head_hh}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={3}>
                                            <h6 class="mb-0">Address</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary " style={{textTransform:'capitalize'}}>
                                        {csrSingleViewData?.reg_district} {csrSingleViewData?.reg_palika} {csrSingleViewData?.reg_current_ward} {csrSingleViewData?.reg_tole}
                                        </Col>
                                    </Row>
                                 
                                    <hr></hr>
                                    <Row>
                                        <Col sm={3}>
                                            <h6 class="mb-0">Average Income Of HH</h6>
                                        </Col>
                                        <Col sm={9} className="text-secondary " style={{textTransform:'capitalize'}}>
                                        {csrSingleViewData?.reg_avg_earn}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </Card.Body>
                            </Tab>
                        </Tabs>
                    </Card>

                    <Row>
                       
                    {/* <ReactMapGL
       {...viewport}
       mapboxAccessToken="pk.eyJ1IjoiYWJoaTExNSIsImEiOiJja3J0M3dyMmYzY3I5Mm9ydng4eDg2cmhnIn0.o7apw95emv8sY-lzt0qFIQ"
       onViewportChange={nextViewport => setViewport(nextViewport)}
     >
       <Marker
         latitude={lat}
         longitude={lng}
         offsetLeft={-20}
         offsetTop={-10}
       >
         <img src={Location} alt="pin" height="40px" width="30px" />
         <p>MindBowser</p>
       </Marker>
     </ReactMapGL> */}
                    </Row>
                </Col>
            </Row>
            <Row>
            <Col md={12}>
                    <Card className='detail-page-card'>
                        <Tabs variant="pills" defaultActiveKey="reg" className="mb-3">
                            <Tab eventKey='reg' title='Registration Details'>
                                 <Row>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Registration Date</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {csrSingleViewData?.date_of_registration}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Registration District</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {csrSingleViewData?.reg_district}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0"> Reg Pa Number</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {csrSingleViewData?.reg_pa_number}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">LiveStock</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {csrSingleViewData?.reg_livestock}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">LiveStock Value</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {csrSingleViewData?.reg_livestock_value}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                 </Row>
                            </Tab>

                            <Tab eventKey='teir' title='Tier Category'>
                                 <Row>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Ethinicity</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {csrSingleViewData?.reg_ethnicity_head_hh}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">PWD</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {csrSingleViewData?.reg_hh_head_pwd}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Land Availability</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {csrSingleViewData?.reg_available_land}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">LiveStock</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {csrSingleViewData?.reg_livestock}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Age Of HH Heade</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {csrSingleViewData?.reg_age_head_hh}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Gender Of HH</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {csrSingleViewData?.reg_gender_head_hh}
                                        </Col>
                                        </Row>
                                </Card.Body>
                                    </Col>
                                 </Row>
                            </Tab>
                            <Tab eventKey='support' title='Support Received'>
                                 <Row>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Shelter</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {sta?.reg_receive_tranche}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Livelihood</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {lta?.liv_ffs_training_type}<br></br>
                                            {lta?.id_type_input}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">DDR</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {/* {csrSingleViewData?.reg_available_land} */}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Wash</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                   
                                    
                                </Card.Body>
                                    </Col>
                                 </Row>
                            </Tab>

                            <Tab eventKey='tranche' title='Tranche Received'>
                                 <Row>
                                    <Col>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">1st Treanche</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {sta?.dd_receive_1st_tranche}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                    <Col sm={7}>
                                            <h6 class="mb-0">2nd Treanche</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {sta?.dd_receive_2nd_tranche}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                    <Col sm={7}>
                                            <h6 class="mb-0">3rd Treanche</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {sta?.dd_receive_3rd_tranche}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    </Card.Body>
                                    </Col>
                                 </Row>
                            </Tab>

                            <Tab eventKey='sup' title='Support Details'>
                                 <Row>
                                    <Col md={6}>
                                    <Card.Body>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Shelter</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {/* {csrSingleViewData?.date_of_registration} */}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Top Up</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {vst?.ip_first_installment_cash_received}
                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0"> MLT</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {vst?.ip_receive_labour_support}<br></br>
                                        {vst?.ip_receive_material_support}<br></br>
                                        {vst?.ip_receive_transportantion_support}<br></br>

                                        </Col>
                                    </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">FCH</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {vst?.ip_receive_cost_effective_house_support}<br></br>
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                    <Col md={6}>
                                    <Card.Body>
                                
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Livelihood</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Input Received</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        {ist?.id_type_input}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Training Received</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {ist?.liv_ffs_training_type}
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                    <Col md={6}>
                                    <Card.Body>
                                
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Water</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Drinking Water</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        {/* {ist?.id_type_input} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">Irrigation Scheme</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                            {/* {ist?.liv_ffs_training_type} */}
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                </Card.Body>
                                    </Col>
                                    <Col md={6}>
                                    <Card.Body>
                                
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">DRR</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                    <Row>
                                        <Col sm={7}>
                                            <h6 class="mb-0">DRR Awareness</h6>
                                        </Col>
                                        <Col sm={5} className="text-secondary">
                                        {/* {csrSingleViewData?.reg_livestock_value} */}
                                        {/* {ist?.id_type_input} */}
                                        </Col>
                                        </Row>
                                    <hr></hr>
                                
                                </Card.Body>
                                    </Col>
                                 </Row>
                            </Tab>

                        </Tabs>
                    </Card>

                    <Row>
                       
                    {/* <ReactMapGL
       {...viewport}
       mapboxAccessToken="pk.eyJ1IjoiYWJoaTExNSIsImEiOiJja3J0M3dyMmYzY3I5Mm9ydng4eDg2cmhnIn0.o7apw95emv8sY-lzt0qFIQ"
       onViewportChange={nextViewport => setViewport(nextViewport)}
     >
       <Marker
         latitude={lat}
         longitude={lng}
         offsetLeft={-20}
         offsetTop={-10}
       >
         <img src={Location} alt="pin" height="40px" width="30px" />
         <p>MindBowser</p>
       </Marker>
     </ReactMapGL> */}
                    </Row>
                </Col>
            </Row>
            {/* 
              <div class="row gutters-sm">
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3"><i class="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div class="progress mb-3" style="height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

        </div>
    </div> */}

            {/* <Row>
                <Col md={2}>
                    <img
                        src="http://lgmis.trimax.com.np/storage/respondents/malika/thumb/1528082055670.jpg"
                        alt="abhishek"
                        height="300"
                    ></img>
                </Col>
                <Col md={4} className="d-flex align-items-center">
                    <div className="personal-details">
                        <h3>Dudhaman Kumal</h3>
                        <h6>
                            {' '}
                            <i className="feather icon-phone" /> 9867739191
                        </h6>
                        <h6>
                            {' '}
                            <i className="feather icon-map-pin" /> मालिका गाउँपालिका-7, लुम्बिनी प्रदेश
                        </h6>
                    </div>
                </Col>
                <Col md={2}>
                    <Button>Age</Button>
                </Col>
                <Col md={2}>
                    <Button>
                        {' '}
                        <i className="feather icon-settings" /> Edit
                    </Button>
                </Col>
            </Row>
            <Tabs variant="pills" defaultActiveKey="home" className="mb-3 mt-3">
                <Tab eventKey="home" title="PERSONAL INFORMATION">
                    <Row>
                        <Col md={12}>
                            <h4>
                                <i className="feather icon-credit-card" /> PERSONAL INFORMATION
                            </h4>{' '}
                        </Col>
                        <Col md={12}>
                            <Card className="p-2">
                                <Card.Body>
                                    <Row className="personal-details-all">
                                        <Col md={4}>
                                            <h6>
                                                <span>पूरा नाम, थर:</span> Dudhaman Kumal
                                            </h6>
                                            <h6>
                                                <span>प्रदेश</span> : लुम्बिनी प्रदेश
                                            </h6>
                                            <h6>
                                                <span>वडा नं.</span>: 7
                                            </h6>
                                            <h6>
                                                <span>सडकको नाम </span>: 0
                                            </h6>
                                        </Col>
                                        <Col md={4}>
                                            <h6>
                                                <span>पूरा नाम, थर:</span> Dudhaman Kumal
                                            </h6>
                                            <h6>
                                                <span>प्रदेश</span> : लुम्बिनी प्रदेश
                                            </h6>
                                            <h6>
                                                <span>वडा नं.</span>: 7
                                            </h6>
                                            <h6>
                                                <span>सडकको नाम </span>: 0
                                            </h6>
                                        </Col>
                                        <Col md={4}>
                                            <h6>
                                                <span>पूरा नाम, थर:</span> Dudhaman Kumal
                                            </h6>
                                            <h6>
                                                <span>प्रदेश</span> : लुम्बिनी प्रदेश
                                            </h6>
                                            <h6>
                                                <span>वडा नं.</span>: 7
                                            </h6>
                                            <h6>
                                                <span>सडकको नाम </span>: 0
                                            </h6>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="family_members" title="पारिवारिक सदस्यहरु">
                    <Row>
                        <Col md={12}>
                            <h4>
                                <i className="feather icon-credit-card" /> पारिवारिक सदस्यहरु
                            </h4>{' '}
                        </Col>
                        <Col md={12}>
                            <Card className="p-2">
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th> क्र.स.</th>
                                                <th>नाम</th>
                                                <th>लिङ्ग</th>
                                                <th>उमेर</th>
                                                <th>वैवाहिक स्थिति</th>
                                                <th>नाता</th>
                                                <th>नागरिकता</th>
                                                <th>जाति</th>
                                                <th>धर्म</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-active">
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr className="table-success">
                                                <th scope="row">3</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">4</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr className="table-warning">
                                                <th scope="row">5</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">6</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr className="table-danger">
                                                <th scope="row">7</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">8</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr className="table-info">
                                                <th scope="row">9</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">10</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
            <Row>
                <Col md={12}>
                    <h4>
                        <i className="feather icon-image" /> घरको फोटोहरू
                    </h4>{' '}
                </Col>
                <Col md={2}>
                    <img
                        src="http://lgmis.trimax.com.np/storage/respondents/malika/thumb/1528082055670.jpg"
                        alt="abhishek"
                        height="300"
                        weight="200"
                    ></img>
                </Col>
                <Col md={2}>
                    <img
                        src="http://lgmis.trimax.com.np/storage/respondents/malika/thumb/1528082055670.jpg"
                        alt="abhishek"
                        height="300"
                        weight="200"
                    ></img>
                </Col>
            </Row>

            <Row>
                <Col md={12} className="mt-3">
                    <h4>
                        <i className="feather icon-map-pin" /> Location
                    </h4>{' '}
                </Col>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28324.94872602452!2d83.21412144234068!3d27.449994954633947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996eb334fe91fc1%3A0x5793b8b9b8917fcd!2sLumbini%2032900!5e0!3m2!1sen!2snp!4v1655870780008!5m2!1sen!2snp"
                                style={{ width: '100%' }}
                                height="450"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
        </React.Fragment>
    );
};

export default Detail;

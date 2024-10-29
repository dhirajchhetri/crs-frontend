import locationLogo from '../../../../assets/images/logo/house.png';
import { getDistrictData, getlocalData, getMapData, getWardData } from '../../../../utils/mapData';
import layerImage from '../../../../assets/images/layer-icon.jpg';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { clusterLayer } from '../MapBox/layer';
import Map, {
    GeolocateControl,
    Marker,
    NavigationControl,
    Source,
    Layer,
    ScaleControl,
    FullscreenControl,
    FillLayer,
    Popup
} from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import useSupercluster from 'use-supercluster';
// import locationLogo from '../../../../assets/images/logo/crslocation.jpg';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Popover, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCSRDataDetail } from '../../../../store/detail.actions';
import { province } from '../../../../assets/geojson/province';
import { district } from '../../../../assets/geojson/district';
import { locallevel } from '../../../../assets/geojson/locallevel';
import { wardbnd } from '../../../../assets/geojson/wardbnd';
import {
    dashBoardFilterChange,
    getCsrHHRegistrationData,
    getDistricts,
    getPalikas,
    getTrancheData,
    setSelectedDistricts,
    setSelectedPalikas
} from '../../../../store/dashboard.actions';
import { bbox, feature } from '@turf/turf';
import black from '../../../../assets/images/black.png';
import street from '../../../../assets/images/default.png';
import sattelite from '../../../../assets/images/sattelite.png';
import markerModel from './custom-marker/markerModel';
const Colors = [
    {
        id: '313',
        color: 'red'
    },
    {
        id: '2',
        color: 'blue'
    },
    {
        id: '3',
        color: 'green'
    },
    {
        id: '4',
        color: 'yellow'
    },
    {
        id: '5',
        color: 'lightblue'
    },
    {
        id: '6',
        color: 'lightblue'
    },
    {
        id: '7',
        color: 'lightblue'
    }
];

export const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
        'fill-color': {
            property: 'id',
            type: 'categorical',
            stops: [
                ['313', 'red'],
                ['201', 'orange'],
                ['405', 'blue'],
                ['406', 'orange'],
                ['312', 'green'],
                ['407', 'lightblue'],
                ['7', 'pink'],
                ['40503', 'blue'],
                ['40504', 'orange'],
                ['40501', 'green'],
                ['40502', 'lightblue'],
                ['40505', 'red'],
                ['40603', 'blue'],
                ['40604', 'orange'],
                ['40601', 'green'],
                ['40602', 'lightblue'],
                ['40605', 'red'],
                ['40606', 'pink'],
                ['40607', 'yellow'],
                ['40608', 'purple'],
                ['40703', 'blue'],
                ['40704', 'orange'],
                ['40701', 'green'],
                ['40702', 'lightblue'],
                ['40705', 'red'],
                ['40706', 'pink'],
                ['40707', 'yellow'],
                ['40708', 'purple'],
                ['40709', 'pink'],
                ['40710', 'maroon'],
                ['31202', 'blue'],
                ['31201', 'orange'],
                ['31203', 'green'],
                ['31204', 'lightblue'],
                ['31205', 'red'],
                ['31206', 'pink'],
                ['31207', 'yellow'],
                ['31208', 'purple'],
                ['31209', 'pink'],
                ['31210', 'maroon'],
                ['31211', 'white'],
                ['31302', 'blue'],
                ['31301', 'orange'],
                ['31303', 'green'],
                ['31304', 'lightblue'],
                ['31305', 'red'],
                ['31306', 'pink'],
                ['31307', 'yellow'],
                ['31308', 'purple'],
                ['31309', 'maroon'],
                ['31310', 'maroon'],
                ['31311', 'white']
            ]
        },
        'fill-opacity': 0.5,
        'fill-outline-color': 'white'
    },
    layout: {
        visibility: 'visible'
    }
};

export default function MapBox() {
    const dispatch = useDispatch();

    const CsrHHRegistrationData = useSelector((state) => state.dashboardReducer.csrHHRegistrationData);

    const districts = useSelector((state) => state.dashboardReducer.districts);
    const palikas = useSelector((state) => state.dashboardReducer.palikas);
    const selectedDistricts = useSelector((state) => state.dashboardReducer.selectedDistricts);
    const selectedPalikas = useSelector((state) => state.dashboardReducer.selectedPalikas);
    const detailData = useSelector((state) => state.detailDataReducer.detailData);
    const csrSingleViewData = detailData?.hhr?.data;
    const sta = detailData?.sta?.data;
    const lta = detailData?.lta?.data;
    const ist = detailData?.ist?.data;
    const vst = detailData?.vst?.data;
    const [selected, setSelected] = useState({ currentSelected: undefined, type: 'district', previousSelected: undefined, label: 'label' });
    const [lng, setLng] = useState(84.3542);
    const [lat, setLat] = useState(27.5291);
    const [zoom, setZoom] = useState(9);
    const [popupOpen, setPopupOpen] = useState(false);
    const [parkData, setParkData] = useState();
    const [hoverInfo, setHoverInfo] = useState(null);
    const [layer, setLayer] = useState(dataLayer);
    const [mapData, setMapData] = useState(district);
    const [viewport, setViewport] = useState({
        latitude: 28.2489136496,
        longitude: 83.9158264002,
        zoom: 7
    });
    const myRef = useRef();
    const [number, setnumber] = useState([]);
    const [scroll, setScroll] = useState(0);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/satellite-v9');
    const [show, setShow] = useState(false);
    const [layerShow, setLayerShow] = useState(false);

    const handleLayerHover = () => {
        setLayerShow(!layerShow);
    };
    const [menu, setMenu] = useState(false);
    const [graphMenu, setGraphMenu] = useState('');
    const [graphShow, setGraphShow] = useState('');

    const handlePopupClick = () => {
        setMenu(!menu);
    };
    // useEffect(() => {
    //     dispatch(getCSRDataDetail(code));
    // }, [handlePopupClick(code)]);

    const onScroll = () => {
        const scrollY = window.scrollY; //Don't get confused by what's scrolling - It's not the window
    };

    const onHover = useCallback((event) => {
        const {
            features,
            point: { x, y }
        } = event;

        if (features[0]) {
            const hoveredFeature = features && features[0];
            const pid = parseInt(hoveredFeature.properties.id);
            const label = hoveredFeature.properties.DISTRICT;

            // console.log(label, 'This is pid of hover');
            // if (selected.type === 'district') {
            //     const labelMuni = hoveredFeature.properties.GaPa_NaPa;
            //     console.log(labelMuni, 'This is pid LOCAL of hover');
            // }
            const newStops = [];
            for (let index = 1; index < 7; index++) {
                if (pid !== index) {
                    newStops.push([index.toString(), Colors.find((x) => x.id === index.toString())?.color]);
                }
            }

            setLayer({
                ...layer,
                paint: {
                    'fill-color': {
                        property: 'id',
                        type: 'categorical',
                        stops: [[hoveredFeature.properties.id, 'lightBlue'], ...newStops]
                    },
                    'fill-opacity': 0.5,
                    'fill-outline-color': 'white'
                }
            });

            if (hoveredFeature) {
                setHoverInfo({ ...hoverInfo, features: hoveredFeature, x, y });
            }
        }
    }, []);

    useEffect(() => {
        dispatch(dashBoardFilterChange(selectedDistricts, selectedPalikas));
    }, [selectedPalikas, selectedDistricts]);

    useEffect(() => {
        dispatch(getPalikas(selectedDistricts));
        // dispatch(dashBoardFilterChange(selectedDistricts,selectedPalikas));
    }, [selectedDistricts]);
    const onDistrictSelectionChange = useCallback((e) => {
        const districtSelected = e.target.value;
        dispatch(setSelectedDistricts(districtSelected));
    }, []);
    const onPalikaSelectionChange = useCallback((e) => {
        const palikasSelected = e.target.value;
        dispatch(setSelectedPalikas(palikasSelected));
    }, []);

    const zoomTocenter = () => {
        const feature = province.features[0];

        if (feature && myRef.current) {
            // calculate the bounding box of the feature
            const [minLng, minLat, maxLng, maxLat] = bbox(feature);

            myRef.current.fitBounds(
                [
                    [minLng, minLat],
                    [maxLng, maxLat]
                ],
                { padding: 40, duration: 1000 }
            );

            setTimeout(() => {
                setnumber([minLng, minLat, maxLng, maxLat]);
            }, 6000);
        }
    };

    React.useEffect(() => {
        zoomTocenter();
        setMapData(district);
        setViewport({ ...viewport });
    }, []);

    const palikaZoom = () => {
        setSelected({
            ...selected,
            currentSelected: undefined,
            type: 'district',
            previousSelected: undefined,
            label: 'label'
        });
        setMapData(district);
        zoomTocenter();
    };
    const handleMapClick = (e) => {
        const { features } = e;
        const feature = features && features[0];
        if (feature) {
            const provinceId = feature.properties.id;
            const Municiples = feature.properties.GaPa_NaPa;
            if (selected.type === 'district') {
                const localData = locallevel.features.filter((x) => x.properties.DISTRICT === feature.properties.DISTRICT);
                setMapData({ type: 'FeatureCollection', features: [...localData] });
                setSelected({
                    ...selected,
                    type: 'ward',
                    currentSelected: +provinceId,
                    label: Municiples
                });
            }

            if (feature && myRef.current) {
                const [minLng, minLat, maxLng, maxLat] = bbox(feature);
                myRef.current.fitBounds(
                    [
                        [minLng, minLat],
                        [maxLng, maxLat]
                    ],
                    { padding: 40, duration: 1000 }
                );
            }
        }
    };

    // const clearState = () => {
    //     setMapData(province);
    //     setLayer(dataLayer);
    //     setSelected({ currentSelected: undefined, type: 'province', previousSelected: undefined, label: 'नेपाल' });
    //     setViewport({
    //         ...viewport,
    //         latitude: 28.2489136496,
    //         longitude: 83.9158264002,
    //         zoom: 8.8
    //     });
    // };

    const crsData = CsrHHRegistrationData;
    const points = crsData.map((data) => ({
        type: 'Feature',
        properties: { cluster: false, caseId: data.caseid, district: data.reg_district },
        geometry: {
            type: 'Point',
            coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)]
        }
    }));

    const bounds = myRef.current ? myRef.current.getMap().getBounds().toArray().flat() : null;
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: { radius: 50, maxZoom: 20 }
    });
    return (
        <>
            <Button onClick={palikaZoom} style={{ width: '200px' }} className='mt-2 ml-2'>
                Back to main map
            </Button>
            <Map
                initialViewState={{
                    ...viewport
                }}
                style={{ width: '100%', height: '600px' }}
                mapboxAccessToken="pk.eyJ1IjoiYWJoaTExNSIsImEiOiJja3J0M3dyMmYzY3I5Mm9ydng4eDg2cmhnIn0.o7apw95emv8sY-lzt0qFIQ"
                ref={myRef}
                interactiveLayerIds={['data']}
                // onMouseMove={onHover}
                attributionControl={false}
                mapStyle={mapStyle}
                // scrollZoom={false}
                onMove={(evt) => setViewport(evt.viewState)}
                onMouseMove={onHover}
                doubleClickZoom={true}
                onClick={handleMapClick}
                // onScroll={onscroll}
                // onClick={handleMapClick}
            >
                <Source type="geojson" data={mapData}>
                    <Layer {...layer} />
                </Source>
                {selected.type === 'district' &&
                    getDistrictData(mapData).map((x) => (
                        <Marker key={x.id} longitude={(x.minLongitude + x.maxLongitude) / 2} latitude={(x.minLatitude + x.maxLatitude) / 2}>
                            {<p style={{ color: 'white', fontSize: '8px' }}>{x.label}</p>}
                        </Marker>
                    ))}

                {selected.type === 'ward' &&
                    getlocalData().map((x) => (
                        <Marker key={x.id} longitude={(x.minLongitude + x.maxLongitude) / 2} latitude={(x.minLatitude + x.maxLatitude) / 2}>
                            {<p style={{ color: 'white', fontSize: '8px' }}>{x.label}</p>}
                        </Marker>
                    ))}
                {clusters.map((cluster) => {
                    // every cluster point has coordinates

                    const [longitude, latitude] = cluster.geometry.coordinates;
                    // the point may be either a cluster or a crime point

                    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

                    // we have a cluster to render
                    if (isCluster) {
                        return (
                            <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${5 + (pointCount / points.length) * 30}px`,
                                        height: `${5 + (pointCount / points.length) * 30}px`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 15);

                                        setViewport({
                                            ...viewport,
                                            latitude,
                                            longitude,
                                            zoom: expansionZoom
                                        });
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    } else if (!isCluster) {
                        return (
                            <Marker
                                key={`crime-${cluster.properties.caseId}`}
                                onClick={() => {
                                    setMenu(true);
                                    dispatch(getCSRDataDetail(cluster.properties.caseId));
                                }}
                                latitude={latitude}
                                longitude={longitude}
                            >
                                <button className="crime-marker">
                                    <img src={locationLogo} alt="csr data" />
                                </button>
                            </Marker>
                        );
                    }
                })}

                {menu && (
                    <Modal size="lg" show={menu} onHide={handlePopupClick} scrollable={true}>
                        <Modal.Header closeButton>
                            <Modal.Title>Deatail View of Pa Number {csrSingleViewData?.reg_pa_number} And {csrSingleViewData?.reg_name_head_hh}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md={6}>
                                    <Card>
                                        <Card.Body>
                                            <div class="d-flex flex-column  align-items-center text-center">
                                                <div className="image" style={{ width: '200px', height: '200px' }}>
                                                    <img
                                                        src={csrSingleViewData?.reg_photo}
                                                        alt={csrSingleViewData?.reg_name_head_hh}
                                                        width="100%"
                                                        height="100%"
                                                    ></img>
                                                </div>
                                                <div class="mt-3">
                                                    {/* <h4>{csrSingleViewData?.reg_name_head_hh}</h4>
                                                    <p class="text-secondary mb-1">{csrSingleViewData?.reg_gender_head_hh}</p>
                                                    <p class="text-muted font-size-sm">{csrSingleViewData?.reg_contact_number}</p>
                                                    <Button class="btn btn-primary">{csrSingleViewData?.reg_age_head_hh}</Button> */}
                                                    <Link to={`/detail/view/${csrSingleViewData?.caseid}`}>
                                                        <Button class="btn btn-outline-primary" style={{padding:'5px'}}> Detail Page</Button>
                                                    </Link>

                                                    <Button class="btn btn-outline-primary" style={{padding:'5px'}}>Show Photo</Button>
                                                </div>
                                            </div>{' '}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <Card className="detail-page-card">
                                        <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
                                            <Tab eventKey="home" title="Participant Details" style={{padding:'0px'}}>
                                                <Card.Body>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <h6 class="mb-0">Full Name</h6>
                                                        </Col>
                                                        <Col sm={6} className="text-secondary">
                                                            {csrSingleViewData?.reg_name_head_hh}
                                                        </Col>
                                                    </Row>
                                                    <hr></hr>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <h6 class="mb-0">Ethinicity</h6>
                                                        </Col>
                                                        <Col sm={6} className="text-secondary">
                                                            {csrSingleViewData?.reg_ethnicity_head_hh}
                                                        </Col>
                                                    </Row>
                                                    <hr></hr>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <h6 class="mb-0">Address</h6>
                                                        </Col>
                                                        <Col sm={6} className="text-secondary " style={{ textTransform: 'capitalize' }}>
                                                            {csrSingleViewData?.reg_district} {csrSingleViewData?.reg_palika}{' '}
                                                            {csrSingleViewData?.reg_current_ward} {csrSingleViewData?.reg_tole}
                                                        </Col>
                                                    </Row>

                                                    <hr></hr>
                                                    <Row>
                                                        <Col sm={6}>
                                                            <h6 class="mb-0">Average Income Of HH</h6>
                                                        </Col>
                                                        <Col sm={6} className="text-secondary " style={{ textTransform: 'capitalize' }}>
                                                            {csrSingleViewData?.reg_avg_earn}
                                                        </Col>
                                                    </Row>
                                                    <hr></hr>
                                                </Card.Body>
                                            </Tab>
                                        </Tabs>
                                    </Card>

                                    <Row></Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Card className="detail-page-card">
                                        <Tabs variant="pills" defaultActiveKey="reg" className="mb-3">
                                            <Tab eventKey="reg" title="Registration Details">
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

                                            <Tab eventKey="teir" title="Tier Category">
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
                                            <Tab eventKey="support" title="Support Received">
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
                                                                    {lta?.liv_ffs_training_type}
                                                                    <br></br>
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

                                            <Tab eventKey="tranche" title="Tranche Received">
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

                                            <Tab eventKey="sup" title="Support Details">
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
                                                                    {vst?.ip_receive_labour_support}
                                                                    <br></br>
                                                                    {vst?.ip_receive_material_support}
                                                                    <br></br>
                                                                    {vst?.ip_receive_transportantion_support}
                                                                    <br></br>
                                                                </Col>
                                                            </Row>
                                                            <hr></hr>
                                                            <Row>
                                                                <Col sm={7}>
                                                                    <h6 class="mb-0">FCH</h6>
                                                                </Col>
                                                                <Col sm={5} className="text-secondary">
                                                                    {vst?.ip_receive_cost_effective_house_support}
                                                                    <br></br>
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

                                    <Row></Row>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                    </Modal>
                )}
                <GeolocateControl position="top-right" />
                <FullscreenControl position="top-right" />
                <NavigationControl position="top-right" />
                <div
                    class="mapboxgl-ctrl mapboxgl-ctrl-group"
                    style={{
                        width: '29px',
                        right: 0,
                        float: 'right',
                        height: '30px',
                        marginRight: '10px',
                        marginTop: '200px',
                        transition: '0.8s'
                    }}
                    onMouseEnter={handleLayerHover}
                    onMouseLeave={handleLayerHover}
                >
                    <button class="mapboxgl-ctrl-layers" type="button" aria-label="Layers" aria-disabled="false">
                        <span class="feather icon-layers" aria-hidden="true" title="Layers"></span>
                    </button>
                    {layerShow && (
                        <div
                            class="mapboxgl-ctrl mapboxgl-ctrl-group"
                            style={{
                                width: '280px',
                                right: 0,
                                float: 'right',
                                height: '80px',
                                padding: '10px',
                                paddingRight: '10px',
                                background: 'white',
                                transition: '5s ease',
                                marginRight: '30px',
                                marginTop: '-28px',
                                borderRadius: '5px'
                                // marginRight: 'px'
                            }}
                        >
                            <Row>
                                <Col
                                    md={3}
                                    onClick={() => {
                                        setMapStyle('mapbox://styles/mapbox/satellite-v9');
                                    }}
                                    className="active"
                                >
                                    <img src={sattelite} width={50} height={50} />
                                    <label>Satellite</label>
                                </Col>
                                <Col
                                    md={3}
                                    onClick={() => {
                                        setMapStyle('mapbox://styles/mapbox/streets-v9');
                                    }}
                                >
                                    <img src={street} width={50} height={50} />
                                    <label>Street</label>
                                </Col>
                                <Col
                                    md={3}
                                    onClick={() => {
                                        setMapStyle('mapbox://styles/mapbox/outdoors-v9');
                                    }}
                                >
                                    <img src={layerImage} width={50} height={50} />
                                    <label>Outdoor</label>
                                </Col>
                                <Col
                                    md={3}
                                    onClick={() => {
                                        setMapStyle('mapbox://styles/mapbox/dark-v9');
                                    }}
                                >
                                    <img src={black} width={50} height={50} />
                                    <label>Black</label>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>

                {/* <div className="layer" style={{ background: 'white', top: '0', right: '0' }}>
                        <img src={layerImage} />
                    </div> */}
                <ScaleControl />
            </Map>
        </>
    );
}

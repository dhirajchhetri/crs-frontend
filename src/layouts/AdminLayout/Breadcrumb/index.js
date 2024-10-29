import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import navigation from '../../../menu-items';
import { BASE_TITLE, BASENAME } from '../../../config/constant';
import assessed from '../../../assets/images/assessed.png';
import registered from '../../../assets/images/registered.png';
import Shelter from '../../../assets/images/Shelter.png';
import Technical from '../../../assets/images/Tenicial.png';
import Livelihood from '../../../assets/images/Livelihood.png';
import WI from '../../../assets/images/WI.png';
import CountUp from 'react-countup';
import { getMapData } from '../../../utils/mapData';


const Breadcrumb = () => {
    const [main, setMain] = useState([]);
    const [item, setItem] = useState([]);
    const sector=useSelector((state)=> state.dashboardReducer.selectedSector).value

    useEffect(() => {
        navigation.items.map((item, index) => {
            if (item.type && item.type === 'group') {
                getCollapse(item, index);
            }
            return false;
        });
    });
    // const sectorSelected = useSelector((state) => state.selectedReducer.sectorSelected);
    // console.log(sectorSelected,'sector Selected');
    const getCollapse = (item, index) => {
        if (item.children) {
            item.children.filter((collapse) => {
                if (collapse.type && collapse.type === 'collapse') {
                    getCollapse(collapse, index);
                } else if (collapse.type && collapse.type === 'item') {
                    if (document.location.pathname === BASENAME + collapse.url) {
                        setMain(item);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    let mainContent, itemContent;
    let breadcrumbContent = '';
    let title = '';
    const   getWidgets =()=>{
        if(sector==='shelter'){
            return (
                    <div className="row crs-card-details" style={{ marginRight: '0px' }}>
                    <div className="crs-details">
                        <div className="widget-card widget-card-row">
                            <div className="img">
                                <img src={assessed} width={'50'} height={'50'} />
                            </div>
                            <div className="content">
                            <h3><CountUp end ={13100} duration={3} /></h3>
                                <span>Total Assessed Families</span>
                            </div>
                        </div>
                    </div>
                    <div className="crs-details">
                        <div className="widget-card widget-card-row">
                            <div className="img">
                                <img src={registered} width={'50'} height={'50'} />
                            </div>
                            <div className="content">
                                <h3><CountUp end ={4100} duration={3} /></h3>
                                <span>Total Registered Families</span>
                            </div>
                        </div>
                    </div>
                    <div className="crs-details">
                        <div className="widget-card widget-card-row">
                            <div className="img">
                                <img src={Technical} width={'50'} height={'50'} />
                            </div>
                            <div className="content">
                                <h3>
                                    <CountUp end ={1100} duration={3} /> 
                                    <h4> /<CountUp end={900} duration={3} /></h4>
                                </h3>
                                <span>Technical Assitance</span>
                            </div>
                        </div>
                    </div>
                    <div className="crs-details">
                        <div className="widget-card widget-card-row">
                            <div className="img">
                                <img src={Shelter} width={'50'} height={'50'} />
                            </div>
                            <div className="content">
                                <h3>
                                    <CountUp end ={1100} duration={3} /> 
                                    <h4> /<CountUp end={900} duration={3} /></h4>
                                </h3>
                                <span>Shelter Assitance</span>
                            </div>
                        </div>
                    </div>
                    </div>
    
            )
        }else if(sector ==='livelihood'){
            return (
            <div className="row crs-card-details" style={{ marginRight: '0px' }}>

                <div className="crs-details">
                    <div className="widget-card widget-card-row">
                        <div className="img">
                            <img src={Livelihood} width={'50'} height={'50'} />
                        </div>
                        <div className="content">
                            <h3>
                                <CountUp end={1800} duration={3}/>
                                <h4> /<CountUp end={1000} duration={3} /></h4>
                            </h3>
                            <span>Livelihood Assitance</span>
                        </div>
                    </div>
                </div>
            </div>

            )
        }
        else{
            return (
                <div className="row crs-card-details" style={{ marginRight: '0px' }}>
                <div className="crs-details">
                    <div className="widget-card widget-card-row">
                        <div className="img">
                            <img src={WI} width={'50'} height={'50'} />
                        </div>
                        
                        <div className="content">
                            <h3>
                                <CountUp end={3} duration={2}/>
                                <h4> /<CountUp end={10} duration={2} /></h4>
                            </h3>
                            <span>Water Infrastructure</span>
                        </div>
                    </div>
                </div>
                
            </div>
            )
        
        }
        
       

    } 
    


    if (main && main.type === 'collapse') {
        mainContent = (
            <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                <Link to="#">CSR ReCoVER {main.title}</Link>
            </ListGroup.Item>
        );
    }

    if (item && item.type === 'item') {
        title = item.title;
        itemContent = (
            <ListGroup.Item as="li" bsPrefix=" " className="breadcrumb-item">
                <Link to="#">{title}</Link>
            </ListGroup.Item>
        );

        if (item.breadcrumbs !== false) {
            breadcrumbContent = (
                <div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center mb-3 mt-3">
                            <div className="col-md-3">
                                <div className="page-header-title">
                                    <h5 className="m-b-15">Dashboard Overview </h5>
                                    <span>CRS-ReCoVER</span>
                                </div>
                            </div>
                            <div className="col-md-9">
                             {getWidgets()}
                               
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        document.title = title + BASE_TITLE;
    }

    return <React.Fragment>{breadcrumbContent}</React.Fragment>;
};

export default Breadcrumb;

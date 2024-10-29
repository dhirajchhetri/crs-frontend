import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import NavLeft from './NavLeft';
import NavRight from './NavRight';

import { ConfigContext } from '../../../contexts/ConfigContext';
import * as actionType from '../../../store/actions';
import NavLogo from '../Navigation/NavLogo';
import NavLeftLogo from '../Navigation/NavLogo/logoleft';

const getImage = (icon) => {
    try {
        let test = require(`../../../assets/images/logo/${icon}.png`);
        return test;
    } catch (error) {}
};

const NavBar = () => {
    const configContext = useContext(ConfigContext);
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;

    let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', 'navbar-default'];

    let toggleClass = ['navbar'];
    if (collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    const navToggleHandler = () => {
        dispatch({ type: actionType.COLLAPSE_MENU });
    };

    let collapseClass = ['collapse navbar-collapse'];

    let navBar = (
        <React.Fragment>
            <div className={collapseClass.join(' ')}>
                {/* <NavLeft /> */}
                <NavLeftLogo />

                <NavRight />
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <header className={headerClass.join(' ')}>{navBar}</header>
        </React.Fragment>
    );
};

export default NavBar;

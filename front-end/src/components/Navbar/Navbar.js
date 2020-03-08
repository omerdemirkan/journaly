import React from 'react';
import classes from './Navbar.module.css';

import logo from '../../images/ijdb-logo-1.svg'

export default function Navbar() {
    return <div className={classes.Navbar}>
        <span>
            <img src={logo} className={classes.Logo}/>
        </span>
    </div>
}

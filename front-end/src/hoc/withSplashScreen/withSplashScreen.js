import React, {useState, useEffect} from 'react';
import classes from './withSplashScreen.module.css';
import logo from '../../images/ijdb-logo-1.svg'

export default function withSplashScreen(Component) {
    return function SplashScreen() {

        const [displaySplashScreen, setDisplaySplashScreen] = useState(true);

        async function removeSplashScreen() {
            setTimeout(() => {
                setDisplaySplashScreen(false)
            }, 1750);
        }

        useEffect(() => {
            removeSplashScreen();
        }, []);

        return <>
            {displaySplashScreen ? 
                <div className={classes.SplashScreen}>
                    <img src={logo} className={classes.Logo}/>
                </div>
            : null}
            
            <Component/>
        </>
    }
}

import React from 'react';
import classes from './Review.module.css';

export default function Review(props) {
    return <div className={classes.Review} style={{animationDelay: props.delay}}>
        <p>"{props.review}"</p>
    </div>
}

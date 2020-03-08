import React, {useEffect, useState} from 'react';
import classes from './Rate.module.css';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import axios from '../../axios';

export default function Rate(props) {
    const currentPath = props.history.location.pathname;
    const journalistId = currentPath.slice(currentPath.lastIndexOf('/') + 1, currentPath.length)
    
    const [journalist, setJournalist] = useState(null);

    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const storedJournalists = JSON.parse(localStorage.getItem('ratedJournalists'));
        
        axios.get('/journalist/' + journalistId)
        .then(res => {
            if (storedJournalists && storedJournalists.includes(res.data)) {
                setSubmitted(true);
            } else {
                setJournalist(res.data)
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    function postRatingHandler() {

        // axios.post();
        // const newStoredJournalists = storedJournalists ? storedJournalists.concat([res.data._id]) : [res.data._id];
        // localStorage.setItem('ratedJournalists', JSON.stringify(newStoredJournalists));
    }

    if (journalist == null) {
        return null;
    }

    return <div className={classes.Rate}>
        <h1 className={classes.Header}>Rate {journalist.name}</h1>
        <div className={classes.RateBox}>
            <div className={classes.InputBox}>
                <p>Rating</p>
                <TextField
                className={classes.RatingField}
                id="outlined-number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={rating}
                onChange={event => {
                    const newRating = event.target.value;
                    if (newRating <= 10 && newRating >= 0) {
                        setRating(newRating)
                    }
                }}
                variant="outlined"
                />
            </div>

            <div className={classes.InputBox}>
                <p>Review (Optional)</p>
                <TextareaAutosize 
                value={review}
                className={classes.TextArea}
                onChange={event => {setReview(event.target.value)}}/>
            </div>
        </div>
    </div>
}

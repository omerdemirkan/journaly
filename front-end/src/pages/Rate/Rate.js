import React, {useEffect, useState} from 'react';
import classes from './Rate.module.css';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Review from '../../components/Review/Review';

import axios from '../../axios';

export default function Rate(props) {
    const currentPath = props.history.location.pathname;
    const journalistId = currentPath.slice(currentPath.lastIndexOf('/') + 1, currentPath.length);
    const ratedJournalists = JSON.parse(localStorage.getItem('ratedJournalists'));
    
    const [journalist, setJournalist] = useState(null);

    const [rating, setRating] = useState(null);
    const [review, setReview] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        console.log(ratedJournalists);
        let firstVisit = false;
        if (!ratedJournalists) {
            localStorage.setItem('ratedJournalists', '[]');
            firstVisit = true;
        };
        
        axios.get('/journalist/' + journalistId)
        .then(res => {
            if (ratedJournalists && ratedJournalists.includes(res.data._id)) {
                setJournalist(res.data)
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
        console.log(ratedJournalists);
        axios.post('/rate/' + journalistId, {
            rating: rating,
            review: review
        })
        .then(res => {
            const newRatedJournalists = [...ratedJournalists, res.data];
            localStorage.setItem('ratedJournalists', JSON.stringify(newRatedJournalists));
            const newJournalist = {...journalist};
            newJournalist.userReviews.push(review)
            setSubmitted(true);
            setJournalist(newJournalist);
        })
        .catch(err => {
            console.log(err);
        });
        // const newratedJournalists = ratedJournalists ? ratedJournalists.concat([res.data._id]) : [res.data._id];
        // localStorage.setItem('ratedJournalists', JSON.stringify(newratedJournalists));
    }

    if (journalist == null && !submitted) {
        return null;
    }

    let delay = 0.2;

    return <div className={classes.Rate}>
        {!submitted ?
            <>
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
                    <Button 
                    onClick={postRatingHandler}
                    color='primary'>Submit</Button>
                </div>
            </>
        : 
        <>
            <h1 className={classes.Header}>Thanks for your review!</h1>
            <div className={classes.RecentReviewsBox}>
                <h2 className={classes.Header}>Recent Reviews</h2>
                {journalist.userReviews.map(review => {
                    if (review.length > 0) {
                        delay += .1;
                        return <Review review={review} delay={delay + 's'}/>
                    }
                    return null;
                })}
            </div>
        </>
        }

        
        
    </div>
}

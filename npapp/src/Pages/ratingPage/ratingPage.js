import { motion } from 'framer-motion';
import classes from "./ratingPage.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { sendFeedback } from '../../Services/feedbackService';

export default function RatingPage(){

    const [selectedValue, setSelectedValue] = useState('Average');
    const navigate = useNavigate();
    const location = useLocation();
    const gender = location.state.gender;
    
    const handleClick = () => {
        if(selectedValue === "Bad"){
            navigate("/badRatingPage", { state: { gender: gender, gradeOverall: selectedValue } });
        }else{
            sendFeedback({ toiletId: localStorage.getItem("toiletId"), gender: gender, gradeOverall: selectedValue }).then(function (response){

                navigate("/thankYouPage", {
                    state: {
                      gender: gender,
                      gradeOverall: selectedValue
                    }
                });
            });
        }

    };

    const handleChange = (event) => {
        setSelectedValue(event.target.id);

    };

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container">
            <div className={classes.container}>
                <div className={classes.maintitle}>
                    <h2 style={{color:"#11362a"}}>PLEASE RATE YOUR EXPERIENCE:</h2>
                </div>
                <h3 className={classes.title}>Help us improve our service :)</h3>
                <div className={classes.wrapper}>
                    <div className={classes.cards}>
                        <div onClick={handleChange} id='Bad' className={`${classes.card} ${classes.unhappyCard} ${selectedValue === "Bad" ? classes.badLight: ''}`}>

                        </div>
                        <div onClick={handleChange} id={'Average'} className={`${classes.card} ${classes.sadCard} ${selectedValue === "Average" ? classes.averageLight: ''}`}>

                        </div>
                        <div onClick={handleChange} id={'Great'} className={`${classes.card} ${classes.happyCard}  ${selectedValue === "Great" ? classes.goodLight: ''}`}>

                        </div>
                        
                        <button onClick={handleClick} className={classes.proceed}>Proceed</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
import { motion } from 'framer-motion';
import classes from "./ratingPage.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RatingPage(){

    const [selectedValue, setSelectedValue] = useState('Average');
    const navigate = useNavigate();
    const handleClick = () => {
        if(selectedValue === "Bad"){
            navigate("/badRatingPage");
        }else{
            navigate("/thankYouPage");
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
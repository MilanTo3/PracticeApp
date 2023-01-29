import { motion } from 'framer-motion';
import classes from "./ratingPage.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RatingPage(){

    const [selectedValue, setSelectedValue] = useState('Average');
    const navigate = useNavigate();
    const handleClick = () => navigate('/ratingPage');

    const handleChange = (parameter) => {
        setSelectedValue(parameter);
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
                        <div onClick={() => handleChange("Bad")} className={`${classes.card} ${classes.unhappyCard}`}>
                            <input className={classes.radioButton}
                                type="radio"
                                value="Bad"
                                checked={selectedValue === 'Bad'}
                                />
                        </div>
                        <div onClick={() => handleChange("Average")} className={`${classes.card} ${classes.sadCard}`}>
                            <input className={classes.radioButton}
                                type="radio"
                                value="Average"
                                checked={selectedValue === 'Average'}
                                />
                        </div>
                        <div onClick={() => handleChange("Great")} className={`${classes.card} ${classes.happyCard}`}>
                            <input className={classes.radioButton}
                                type="radio"
                                value="Great"
                                checked={selectedValue === 'Great'}
                                />
                        </div>
                        
                        <button onClick={handleClick} className={classes.proceed}>Proceed</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
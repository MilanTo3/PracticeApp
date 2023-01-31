import classes from "./homePage.module.css";
import { motion } from 'framer-motion';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage(){

    const [selectedValue, setSelectedValue] = useState('male');
    const navigate = useNavigate();
    const handleClick = () => navigate('/ratingPage');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container">
            <div className={classes.container}>
                <div className={classes.maintitle}>
                    <h2 style={{color:"#11362a"}}>PLEASE RATE YOUR EXPERIENCE:</h2>
                </div>
                <h3 className={classes.title}>Help us improve our service :)</h3>
                <div className={`${classes.info}`} style={{background: selectedValue === 'male' ? 'linear-gradient(to bottom, lightBlue, lightGray)' :'linear-gradient(to bottom, pink, lightGray)'}}>
                    <h3>Establishment: <h5 className={classes.gotinfo}>Seshadri Tower</h5></h3>
                    <h3>City: <h5 className={classes.gotinfo}>Europolis</h5></h3>
                    <h3>Location: <h5 className={classes.gotinfo}>The Collective Street 132, Scnd Floor</h5></h3>
                    <div className={classes.gender}>
                        <div className={`${classes["gender-card"]} ${classes[selectedValue === 'male' ? 'selectedMale' : '']}`} onClick={() => setSelectedValue('male')}>
                            <input className={classes.radioButton}
                            type="radio"
                            value="male"
                            checked={selectedValue === 'male'}
                            onChange={handleChange}
                            />
                            <label className={classes.label}>Male</label>
                        </div>
                        <div className={`${classes["gender-card"]} ${classes[selectedValue === 'female' ? 'selectedFemale' : '']}`} onClick={() => setSelectedValue('female')}>
                            <input className={classes.radioButton}
                            type="radio"
                            value="female"
                            checked={selectedValue === 'female'}
                            onChange={handleChange}
                            />
                            <label className={classes.label}>Female</label>
                        </div>
                    </div>
                    
                    <button onClick={handleClick} className={classes.proceed}>Proceed</button>
                </div>

            </div>

        </motion.div>
    );
}
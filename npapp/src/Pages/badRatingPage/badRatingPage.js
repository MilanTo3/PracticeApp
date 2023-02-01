import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import classes from "./badRatingPage.module.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { sendFeedback } from '../../Services/feedbackService';

export default function BadRatingPage(){

    const navigate = useNavigate();
    const location = useLocation();
    const gender = location.state.gender;
    const gradeOverall = location.state.gradeOverall;
    const initVal = { toiletId: localStorage.getItem("toiletId"), gender: gender, gradeOverall: gradeOverall, foulSmell: false, dirtyBowl: false, noPaper: false, noSoap: false, dirtyFloor: false, wetFloor: false, faultyEquipment: false, litterBin: false, noTissues: false, dirtyBasin: false };
    const [selectedValues, setSelectedValues] = useState(initVal);

    const handleSelection = (event) => {
        const name = event.target.id;
        console.log(name);
        let newDict = {...selectedValues};
        newDict[name] = !newDict[name];
        setSelectedValues(newDict);
    };

    const handleClick = (event) => {        

        sendFeedback(selectedValues).then(() => {
            navigate('/thankYouPage');
        });

    };

    const foulSmell =     require('../../Assets/Group 24444/Group 24444.png');
    const dirtyBowl =     require('../../Assets/Group 24445/Group 24445.png');
    const noToiletPaper = require('../../Assets/Group 24446/Group 24446.png');
    const noSoap =        require('../../Assets/Group 24447/Group 24447.png');
    const noTissuePaper = require('../../Assets/Group 24448/Group 24448.png');
    const dirtyFloor =    require('../../Assets/Group 24442/Group 24442.png');
    const dirtyBasin =    require('../../Assets/Group 24443/Group 24443.png');
    const wetFloor =      require('../../Assets/Group 24449/Group 24449.png');
    const faultyEquipment = require('../../Assets/Group 24450/Group 24450.png');
    const litterBin =     require('../../Assets/Group 24451/Group 24451.png');

    const data = [["foulSmell", foulSmell, "Foul Smell"], ["dirtyBowl", dirtyBowl, "Dirty Bowl"],
                  ["noPaper", noToiletPaper, "No Paper"], ["noSoap", noSoap, "No Soap"],
                  ["noTissues", noTissuePaper, "No Tissues"], ["dirtyFloor", dirtyFloor, "Dirty Floor"],
                  ["dirtyBasin", dirtyBasin, "Dirty Basin"], ["wetFloor", wetFloor, "Wet Floor"],
                  ["faultyEquipment", faultyEquipment, "Faulty Equipment"], ["litterBin", litterBin, "Litter Bin"]];

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container">
            <div className={classes.container}>
                <div className={classes.maintitle}>
                    <h2 style={{color:"#11362a"}}>Aww, we're sorry. How can we be better?</h2>
                </div>
                <h3 className={classes.title}>Help us improve our service :)</h3>
                <div className={classes.wrapper}>
                    <div className={classes.clickLabels}>

                        {data.map((row) => (
                            <div id={row[0]} onClick={handleSelection} className={`${classes.option} ${ selectedValues[row[0]]? classes.selected:classes.optionUnselected }`} style={{ backgroundImage: `url(${row[1]})` }} >
                                <label id={row[0]} className={classes.label}>{row[2]}</label>
                            </div>

                        ))}
                    </div>
                    <br/>
                    <button onClick={handleClick}>Submit</button>
                </div>
                <br/>
            </div>
        </motion.div>
    );
}
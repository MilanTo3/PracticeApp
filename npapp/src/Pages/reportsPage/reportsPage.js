import { motion } from 'framer-motion';
import classes from "./reportsPage.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../Components/table/table';

export default function ReportsPage(){

    const [type, setType] = useState("reports");

    const handleTypeSelect = (ev) => {

        setType(ev.target.value);
    };

    return (<motion.div className={classes.box} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container">
        <p className={classes.managwrite}>Reports administration:</p>
        <div className={`${classes.managwrite}`}>
            <div className={classes.inputWrap}>
                    <select className={classes.input} onChange={handleTypeSelect}>
                        <option value={"reports"} selected={true}>Individual</option>
                        <option value={"summary"} >Summary</option>
                    </select>
                    <select className={classes.input}>
                        <option selected={true}>All toilets</option>
                    </select>
                    <input className={classes.input} type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} placeholder="Start date" />
                    <input className={classes.input} type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} placeholder="End date" />
                    <button className={classes.input}>View</button>
            </div>
        </div>
            <CustomTable dataType={type} />
    </motion.div>);

}

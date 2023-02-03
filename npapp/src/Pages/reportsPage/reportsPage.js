import { motion } from 'framer-motion';
import classes from "./reportsPage.module.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../Components/table/table';
import { getNames } from '../../Services/toiletService';

export default function ReportsPage(){

    const [type, setType] = useState("reports");
    const initVal = { toiletId: -1, sed: null, eed: null };
    const [filterForm, setFilterForm] = useState(initVal);
    const [names, setNames] = useState([]);
    const [vlaue, setValue] = useState();
    const [key, setKey] = useState(1);

    useEffect(() => {

        getNames().then(function (response){
            setNames(response["data"]);
        });

    }, [vlaue]);

    const handleTypeSelect = (ev) => {

        setType(ev.target.value);
        if(ev.target.value == "summary"){
            setKey(2);
        }else{
            setKey(1);
        }
    };

    const applyFilter = () => {
        console.log(filterForm);
        setKey(key+1);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
		setFilterForm({...filterForm, [name]: value});
    }

    return (<motion.div className={classes.box} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container">
        <p className={classes.managwrite}>Reports administration:</p>
        <div className={`${classes.managwrite}`}>
            <div className={classes.inputWrap}>
                <select className={classes.input} onChange={handleTypeSelect}>
                    <option value={"reports"} selected={true}>Individual</option>
                    <option value={"summary"}>Summary</option>
                </select>
                <select name="toiletId" className={classes.input} value={filterForm.toiletId} onChange={handleChange}>
                    <option selected={true} value="-1">All toilets</option>
                    {names.map((row) => (
                        <option value={row["toiletId"]}>{row["name"]}</option>
                    ))}
                </select>
                <input name="sed" className={classes.input} type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} placeholder="Start date" value={filterForm.sed} onChange={handleChange}/>      
                <input name="eed" className={classes.input} type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} placeholder="End date" value={filterForm.eed} onChange={handleChange}/>
                <button className={classes.input} onClick={applyFilter}>View</button>
            </div>
        </div>
        <CustomTable key={key} dataType={type} filterInfoObj={filterForm} />
    </motion.div>);

}

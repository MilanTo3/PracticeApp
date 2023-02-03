import {useState, useEffect} from 'react'
import UserModel from '../../Models/userModel';
import * as React from 'react';
import LoginModel from '../../Models/loginModel';
import { motion } from 'framer-motion';
import classes from './toiletAdmin.module.css';
import CustomTable from '../../Components/table/table';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getNames } from '../../Services/toiletService';

export default function ToiletAdmin(){

    const [names, setNames] = useState([]);
    const [mount, setMounted] = useState(false);
    const initVal = { toiletId: -1, sed: null, eed: null };
    
    const getId = (event) => {
        console.log(event.target.id);
    }

    useEffect(() => {
        console.log('here');
        if(!mount){
            setMounted(true);
            getNames().then(function (retVal) {
                setNames(retVal["data"]);
            });
        }
    });

    return (
        <motion.div className={classes.box} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{marginTop: "100px"}}>
            <p className={classes.managwrite}>Toilet administration:</p>

            <div className={classes.boxwrite}>
                <h5 className={classes.bindTitle}>Bind to this device:</h5>
                <Autocomplete
                onChange={(event, value) => { localStorage.setItem("toiletId", value.toiletId) }}
                className={classes.select}
                disablePortal
                defaultValue={names[0]}
                options={names}
                getOptionLabel={(names) => names.name}
                margin="normal"
                sx={{ width: 221 }}
                renderOption={(props, names) => { return(<li {...props} key={names.toiletId}>{names.name}</li>) }}
                renderInput={(params) => <TextField {...params} label="Choose toilet" variant='standard' />}
                />
            </div>
            <CustomTable dataType={"toilets"} filterInfoObj={initVal} />
        </motion.div>
    
    );
}
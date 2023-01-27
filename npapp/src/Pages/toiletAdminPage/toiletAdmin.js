import {useState, useEffect} from 'react'
import UserModel from '../../Models/userModel';
import * as React from 'react';
import LoginModel from '../../Models/loginModel';
import { motion } from 'framer-motion';
import classes from './toiletAdmin.module.css';
import CustomTable from '../../Components/table/table';

export default function ToiletAdmin(){

    return (
        <motion.div className={classes.box} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{marginTop: "100px"}}>
            <p className={classes.managwrite}>Toilet administration:</p>
            <CustomTable dataType={"toilets"}/>
        </motion.div>
    
    );
}
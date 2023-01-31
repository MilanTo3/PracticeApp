import {motion} from 'framer-motion';
import { useEffect, useState } from 'react';
import classes from "./thankYouPage.module.css";
import { useNavigate } from 'react-router-dom';

export default function ThankYouPage(){

    return (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} id="container">
        <div className={classes.container}>
                    <div className={classes.content}>
            <div className={classes.wrapper1}>
                <div className={classes.wrapper2}>
                    <h1 className={classes.title}>Thank you !</h1>
                    <p>Thanks for giving us your feedback, </p>
                    <p>so we can be better in providing our service.</p>
                </div>
                <div className={classes.footerlike}>
                    <p>Redirecting to home page</p>
                </div>
            </div>
            </div>
        </div>
        <link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro" rel="stylesheet"></link>
    </motion.div>);
}
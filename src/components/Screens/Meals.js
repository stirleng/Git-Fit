import React, {useEffect, useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import styles from './Meals.module.css'
import globalStyles from '../styles/Global.module.css'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import bgWaveSvg from '../images/bruin_colored_waves.svg'
import baked_haddock from '../images/Baked_Haddock_recipe_prvw.png'
import { db } from '../../firebase';
import Logo from "../ui/Logo";
import MealSelector from "../ui/MealSelector";

export default function Meals(props) {
    const {currentUser} = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        document.body.setAttribute('style',
            `position: fixed; top: -$(this.windowOffset)px; left: 0; right: 0;`);
        return () => {
            document.body.setAttribute('style', '');
        };
    }, []);

    function nextpage() {
        return navigate('/uploadmeal')
    }

    return (<div className={globalStyles.wrapper}>
            <div id='bottom-layer' className={styles.mealsBackground}/>

            <Logo id='top-layer'/>
            <div id='top-layer' className={styles.slide}
                 style={{
                     background: '#e0b100',
                     transform: 'rotate(7deg) translate(-10%, -5%)'
                 }}/>
            <div id='top-layer' className={styles.slide}/>
            <div id='top-layer' className={styles.container}>
                <img src={baked_haddock}
                     style={{
                         width: '85%',
                         filter: 'drop-shadow(0 0 25px rgba(0, 0, 0, 0.45))'
                     }}
                     alt="baked_haddock"/>
            </div>
            <div id='top-layer' className={styles.container__right}>
                <MealSelector/>
            </div>
            <div id='top-layer' className='UploadMealButton'>
                {/*<button onClick={nextpage}>Upload your own meal!</button>*/}
            </div>
        </div>
        // <div>
        // <div className={styles.container__footer}>
        // <img src={bgWaveSvg}
        //              style={{height: '30vh'}}/>
        //     </div>
        //     <div id='top-layer' className={styles.slide}
        //          style={{
        //              background: '#e0b100',
        //              transform: 'rotate(7deg) translate(-12%, -5%)'
        //          }}/>
        //
        //     <div id='top-layer' className={styles.slide}/>
        // </div>
    );
}
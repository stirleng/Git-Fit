import React, {useEffect} from 'react'
import styles from '../styles/Meals.module.css'
import globalStyles from '../styles/Global.module.css'
import {useNavigate} from 'react-router-dom';
import baked_haddock from '../assets/images/baked_haddock.png'
import Logo from "../ui/Logo";
import MealSelector from "../ui/MealSelector";
import MyButton from "../ui/Button";

export default function Meals() {
    const buttonProps = {className: styles.inputBox, textColor: 'white', bgColor: '#e0b100', width: 375, height: 50};
    let navigate = useNavigate();

    useEffect(() => {
        document.body.setAttribute('style',
            `position: fixed; top: -$(this.windowOffset)px; left: 0; right: 0;`);
        return () => {
            document.body.setAttribute('style', '');
        };
    }, []);

    function handleSubmit() {
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
            <form id='top-layer' className={styles.container} style={{height: '130%'}} onSubmit={handleSubmit}>
                <MyButton {...buttonProps}
                          type='submit'
                          value={'Upload your own meal!'}/>
            </form>
        </div>
    );
}
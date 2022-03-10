import React from 'react';
import {IconButton, Paper} from '@mui/material';
import {useNavigate} from "react-router-dom";

// I want to use 'Button' but it's already taken :(
/* PROPS DESCRIPTION
 * (string)  value:       the description of the button.
 * (string)  bgColor:     the color of the button (e.g '#000' or 'white').
 * (string)  textColor:   the color of the button description.
 * (int)     width:       the width of the button.
 * (int)     height:      the height of the button.
 * (func)    handler:     the handler for handling what happens when the button is clicked.
 */
export default function Logo(props) {
    let navigate = useNavigate();

    const logoStyles = {
        color: '#2774AE',
        WebkitTextStrokeColor: '#FFD100',
        WebkitTextStrokeWidth: '1px',
        fontSize: '43px',
        fontWeight: 'bolder',
        fontFamily: 'Futura-Heavy-Italic',
        display: 'inline-block',
        padding: '2px 10px 2px 4px',
        margin: '5px',
        position: 'fixed',
    };

    return (<div id={props.id}>
        <IconButton onClick={() => navigate('/')} style={logoStyles}>
            <Paper elevation={3} style={logoStyles}>
                Git-Fit
            </Paper>
        </IconButton>
    </div>);
}
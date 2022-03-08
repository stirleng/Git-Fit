import React from 'react';
import {Button, Paper, ThemeProvider} from '@mui/material';
import {createTheme} from "@mui/material";

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
    const logoStyles = {
        color: '#2774AE',
        WebkitTextStrokeColor: '#FFD100',
        WebkitTextStrokeWidth: '1px',
        fontSize: '43px',
        fontWeight: 'bolder',
        fontFamily: 'Futura-Heavy-Italic',
        display: 'inline-block',
        padding: '2px 10px 2px 4px',
        margin: '10px',
    };

    return (<div id={props.id}>
        <Paper elevation={3} style={logoStyles}>
            Git-Fit
        </Paper>
    </div>);
}
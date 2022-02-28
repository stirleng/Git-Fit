import React from 'react';
import {Button, ThemeProvider} from '@mui/material';
import {muiTheme} from "../../App";

// I want to use 'Button' but it's already taken :(
/* PROPS DESCRIPTION
 * (string)  value:       the description of the button.
 * (string)  bgColor:     the color of the button (e.g '#000' or 'white').
 * (string)  textColor:   the color of the button description.
 * (int)     width:       the width of the button.
 * (int)     height:      the height of the button.
 * (func)    handler:     the handler for handling what happens when the button is clicked.
 */
export default function MyButton(props) {
    return (<div className={props.className}>
        <ThemeProvider theme={muiTheme}>
            <Button type={props.type}
                    style={{
                        color: props.textColor,
                        backgroundColor: props.bgColor,
                        width: props.width,
                        height: props.height
                    }}
                    onClick={props.handler}
                    variant='contained'
                    disableElevation
            >
                {props.value}
            </Button>
        </ThemeProvider>
    </div>);
}
import React from 'react';
import {InputAdornment, TextField, ThemeProvider} from '@mui/material';
import {createTheme} from "@mui/material";

const muiTheme = createTheme({
    typography: {
        allVariants: {
            margin: 0,
            fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                'sans-serif'].join(','),
            webKitFontSmoothing: 'antialiased',
            mozOsxFontSmoothing: 'grayscale',
            textTransform: 'none',
            fontWeight: 550,
            fontSize: '1rem',
            lineHeight: '1.4375em',
        },
    },
});

/* PROPS DESCRIPTION
 * (string)  type:        represents the type of input that should go in the box (e.g. 'password' or 'text').
 * (string)  placeholder: the placeholder text only shown with no input text.
 * (string)  bgColor:     the color of the box (e.g '#000' or 'white').
 * (string)  textColor:   the color of the input text.
 * (int)     width:       the width of the box.
 * (int)     height:      the height of the box.
 * (SvgIcon) adornment:   an icon representing the TextBox shown on the left-most side of the box.
 * (func)    handler:     the handler for handling changes in the input field.
 */
export default function TextBox(props) {
    return (<div className={props.className}>
        <ThemeProvider theme={muiTheme}>
            <TextField type={props.type}
                       placeholder={props.placeholder}
                       sx={{
                           input: {color: props.textColor},
                           width: props.width,
                           height: props.height
                       }}
                       style={{
                           backgroundColor: props.bgColor,
                           borderRadius: 5
                       }}
                       InputProps={{
                           startAdornment: (
                               <InputAdornment position='start' sx={{color: props.textColor}}>
                                   {props.adornment}
                               </InputAdornment>)
                       }}
                       size='small'
                       onChange={props.handler}
            />
        </ThemeProvider>
    </div>);
}
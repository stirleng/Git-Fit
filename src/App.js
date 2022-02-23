import { ThemeProvider, createTheme } from '@mui/material/styles';
import SignIn from './components/SignIn';

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
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.4375em',
        },
    },
});

function App() {
    return ( // Force both the mui textFields and Buttons to have the same font, etc.
        <ThemeProvider theme={muiTheme}>
            <SignIn />
        </ThemeProvider>
    );
}

export default App;

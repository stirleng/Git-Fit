import React, {useEffect, useState} from 'react';
import {
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider
} from '@mui/material';
import {createTheme} from "@mui/material";
import {db} from "../../contexts/firebase";

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

export default function MealSelector() {
    const [meals, setMeals] = useState([]);

    const columnNames = ['Dish Name', 'Calories', 'Protein', 'Protein Source', 'Recipe Link'];
    const genRowValues = (meal) => [
        meal.DishName,
        meal.Calories,
        meal.Protein_Grams + 'g',
        meal.Protein ? meal.Protein.charAt(0).toUpperCase() + meal.Protein.slice(1) : 'N/A',
        <a href={meal.link} target="_blank" rel="noreferrer">Link</a>
    ];

    useEffect(() => {
        const fetchData = async () => {
            const mealsRef = db.collection('meals');
            const docs = (await mealsRef.limit(40).get()).docs;

            for (let i = 0; i < docs.length - 1; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [docs[i], docs[j]] = [docs[j], docs[i]];
            }

            return docs.map(i => i.data());
        };
        fetchData().then(meals => setMeals(meals));
    }, []);

    return (<ThemeProvider theme={muiTheme}>
        <TableContainer component={Paper} style={{margin: '3%'}} elevation={3}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{borderBottom: 3}}>
                        <TableCell><h1 style={{fontSize: 20, margin:0}}>{columnNames[0]}</h1></TableCell>
                        {columnNames.slice(1).map(name => (
                            <TableCell align="right"><h1 style={{fontSize: 20, margin:0}}>{name}</h1></TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meals && meals.slice(0, 6).map((meal, i) => (
                        <TableRow
                            key={meal.DishName}
                            sx={i % 2 === 0 ? {backgroundColor: '#e0e0e0'} : null}
                        >
                            <TableCell >{meal.DishName}</TableCell>
                            {genRowValues(meal).slice(1).map(value => (
                                <TableCell align="right">{value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </ThemeProvider>);
}
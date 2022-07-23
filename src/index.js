import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DragAndDrop from "./components/dragAndDrop/DragAndDrop";
import App from "./App";
import { createTheme, colors, ThemeProvider } from '@mui/material';
import { Container } from '@mui/material';

const theme = createTheme({
      palette: {
        blue: {
            background: '#07213C',
            // from  example
            main: "colors.lightGreen[700]",
            footer: colors.grey[200],
            header: colors.lightGreen[50],
            loading: colors.lightGreen[400],
        },
      }
    })    

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <ThemeProvider theme={theme}>
            <Container sx={{backgroundColor: 'blue.background'}}>
                  <App/>
            </Container>
      </ThemeProvider>
);

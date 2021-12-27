import React from 'react';
import Box from '@mui/material/Box';
import Navigation from '../Navigation/Navigation';
import css from './appcontainer.module.css';

export const AppContainer = ({children}) => {

return(
    <div className={css.App}>
      <Navigation />
      <body className={css.bodyContainer}>
        <Box sx={{ minWidth: 120 }}>
            {children}
        </Box>
      </body>
      
    </div>
);
};

export default AppContainer;
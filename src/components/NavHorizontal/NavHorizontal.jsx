import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import {
  Link,
  useMatch,
  useResolvedPath
} from "react-router-dom";

function NavHorizontal() {

  function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div style={{ marginRight: '50px' }}>
        <Link
          style={{ textDecoration: match ? "underline" : "none" }}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    );
  }
  
  return (
    <nav>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '600px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
        <Tabs aria-label="nav tabs">
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/portfolios">Create</CustomLink>
                <CustomLink to="/view">View</CustomLink>
        </Tabs>
      </Box>
    </nav>
  );
}

export default NavHorizontal;

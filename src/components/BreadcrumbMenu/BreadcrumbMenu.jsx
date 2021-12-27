import React from 'react';
import {
  Link,
} from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import css from './breadcrumbMenu.module.css';

function BreadcrumbMenu({ isVisibleCallback }) {
  const pathname = useLocation().pathname;

  const separator = <div className={css.separator}>/</div>;
  const createCrumb = <div className={css.breadcrumbContainer}>
      <Link to="/coinbear" style={{ color: 'white' }} >Home</Link>
      {separator}
      Create
    </div>;
  const viewMyPortfoliosCrumb = <div className={css.breadcrumbContainer}>
      <Link to="/coinbear" style={{ color: 'white' }} >Home</Link>
      {separator}
      My Portfolios
    </div>

  const viewPortfolioCrumb = <div className={css.breadcrumbContainer}>
    <Link to="/coinbear" style={{ color: 'white' }} >Home</Link>
    {separator}
    <Link to="coinbear/myportfolios" style={{ color: 'white' }} >My Portfolios</Link>
    {separator}
    View portfolio
    </div>

  const importDataCrumb = 
    <div className={css.breadcrumbContainer}>
      <Link to="/coinbear" style={{ color: 'white' }} >Home</Link>
      {separator}
      <Link to="/importData" style={{ color: 'white' }} >Import data</Link>
    </div>;

  const exportDataCrumb = 
  <div className={css.breadcrumbContainer}>
    <Link to="/coinbear" style={{ color: 'white' }} >Home</Link>
    {separator}
    Export data
  </div>;

const dashboardCrumb = 
<div className={css.breadcrumbContainer}>
  <Link to="/coinbear" style={{ color: 'white' }} >Home</Link>
  {separator}
  Dashboard
</div>;

const crumbChangeHandler = (pathName) => {
  if(pathname === '/coinbear') {
    isVisibleCallback(false);
  }
  if(pathname === '/coinbear/create') {
    isVisibleCallback(true);
    return createCrumb;
  }
  if(pathname === '/coinbear/myportfolios') {
    isVisibleCallback(true);
    return viewMyPortfoliosCrumb;
  }
  if(pathname.includes('/coinbear/myportfolios/')) {
    isVisibleCallback(true);
    return viewPortfolioCrumb;
  }

  if(pathname === '/coinbear/importData') {
    isVisibleCallback(true);
    return importDataCrumb;
  }

  if(pathname === '/coinbear/exportData') {
    isVisibleCallback(true);
    return exportDataCrumb;
  }

  if(pathname === '/coinbear/dashboard') {
    isVisibleCallback(true);
    return dashboardCrumb;
  }


};
  
  return (
    <Breadcrumbs aria-label="breadcrumb" >
      {crumbChangeHandler(pathname)};
    </Breadcrumbs>
  );
}

export default BreadcrumbMenu;

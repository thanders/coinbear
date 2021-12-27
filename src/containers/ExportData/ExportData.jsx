/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import css from './exportData.module.css';
import Button from '@mui/material/Button';
import { useAppSelector } from "../../hooks";

function Home() {

  const state = useAppSelector(state => state);
  const allPortfolioState = state.viewPortfolios.portfolios;
  const date= new Date();
  const timestamp = Date.now();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();


  useEffect(() => {
    console.log('exporting data to file');
    const test = JSON.stringify(allPortfolioState);
    const data = new Blob([test], {type: 'application/json'});
    const url = window.URL.createObjectURL(data);
    
    document.getElementById('download_link').href = url;

}, []);

  return (
  <div>
    <h2>Export Data</h2>
    <a id="download_link" download={`coinbearExport_${day}_${month}_${year}_${timestamp}.json`} href='' >
    <Button variant="outlined">Export to file</Button>
    </a>
  </div>
  );
}

export default Home;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import css from './importData.module.css';
import { useAppSelector } from "../../hooks";
import { useAppDispatch } from "../../hooks";

function Home() {
  const state = useAppSelector(state => state);
  const allPortfolioState = state.viewPortfolios.portfolios;
  const [userState, setUserState] = useState("");
  const dispatch = useAppDispatch();


  useEffect(() => {
    console.log('dispatching state to reducer');
    console.log('userState', userState);
  }, [userState]);

  const importDataHandler = (e) =>{

    // Stop the form from reloading the page
	  e.preventDefault();
    const fileReader = new FileReader();

    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      const result = JSON.parse(e.target.result);
      setUserState(result);
      dispatch({ type: "portfolios/import", payload: result });
    };
  }

  return (
  <div>
    <h2>Import Data</h2>
    <input type="file" onChange={(e) => importDataHandler(e)} />
      <br />
        {"uploaded file content -- " + userState}
        <div className={css.textContainer}>
          Import Coinbear Portfolio Data
          <br/>
          <br/>
          This feature allows you to manually import previously exported portfolio data.
          <br/>
          The file must be of format json and it must adhere to the Coinbear data format standard.
        </div>
  </div>
  );
}

export default Home;

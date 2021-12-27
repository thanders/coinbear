import React from 'react';
import styles from './viewPortfolios.module.css';
import { useAppSelector } from "../../hooks";
import ViewPortfoliosGrid from '../../components/ViewPortfoliosGrid/ViewPortfoliosGrid';

function Portfolio() {

  const state = useAppSelector(state => state);
  console.log('state.portfolios', state.viewPortfolios);
  const portfolioArray = Object.values(state.viewPortfolios.portfolios);
  console.log('portfolio array ', portfolioArray);

  return (
      <div className={styles.portfoliosContainer}>
        <h2>Current Portfolios</h2>
          <ViewPortfoliosGrid portfolios={portfolioArray} />
      </div>
  );
}

export default Portfolio;

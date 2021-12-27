import React, { useEffect, useState } from 'react';
import css from './viewPortfolios.module.css';
import { useAppSelector } from "../../hooks";
import ViewPortfoliosGrid from '../../components/ViewPortfoliosGrid/ViewPortfoliosGrid';
import SnackBarRenderer from '../SnackBarRenderer/SnackBarRenderer';
import ActionMenu from '../../components/ActionMenu/ActionMenu';
import { useAppDispatch } from "../../hooks";

function ViewPortfolios() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const state = useAppSelector(state => state);
  const portfolios = Object.values(state.viewPortfolios.portfolios);
  const [portfolioArray, setPortfolioArray] = useState(portfolios);
  const [showAllDeletedSnackbar, setShowAllDeletedSnackbar] = useState(false);

  useEffect(() => {
    const portfolios = Object.values(state.viewPortfolios.portfolios);
    
    setPortfolioArray(portfolios);
  }, [state.viewPortfolios.portfolios]);

  const areActive = state.viewPortfolios.areActive;

  const dispatch = useAppDispatch();

  const deleteAllMsg = 'All portfolios have been deleted';

  const rowSelectHandler = (rows) => {
    const selectedRowKeys = rows.map( (row) => row.id);
    setSelectedRowKeys(selectedRowKeys);
  }

  const deleteSelected = () => {
    const data = {
      keys: selectedRowKeys,
    };
    dispatch({ type: 'deletePortfolios', payload: data});
  }

  return (
      <div className={css.portfoliosContainer}>
        <div className={css.headerContainer}>
          <h2>Current Portfolios</h2>
        </div>
        <ActionMenu 
          deleteSelected={() => deleteSelected()}
          disableDeleteSelectedBtn={selectedRowKeys.length === 0}
          show={areActive}
          menuType='portfolios'
        />
        <ViewPortfoliosGrid
          portfolios={portfolioArray}
          areActive={areActive}
          onRowSelect={(data) => rowSelectHandler(data)}
        />
        <SnackBarRenderer
          showSnackBar={showAllDeletedSnackbar }
          snackBarMessage={deleteAllMsg}
          hideSnackbarCallback={() => setShowAllDeletedSnackbar(false)}
        />
      </div>
  );
}

export default ViewPortfolios;

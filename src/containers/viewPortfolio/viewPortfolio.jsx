import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../hooks";
import css from './viewPortfolio.module.css'
import AssetsGrid from '../../components/AssetsGrid/AssetsGrid';
import { useAppDispatch } from "../../hooks";
import ActionMenu from '../../components/ActionMenu/ActionMenu';

function ViewPortfolio() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const { slug } = useParams();
  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  
  const portfolio = JSON.parse( JSON.stringify( state.viewPortfolios.portfolios[slug] ) );
  portfolio.assets = Object.values(portfolio.assets).map((asset, index) => {
    asset.id = index;
    return asset;
  });

  const assets = JSON.parse( JSON.stringify( portfolio.assets ) );
  
  useEffect(() => {
    setEditModeEnabled(false);
  }, []);

const toggleEditMode = () => {
  setEditModeEnabled(!editModeEnabled);
};

const cellChangeHandler = (data) => {
  data.portfolioID = slug
  dispatch({ type: 'editPortfolioRow', payload: data});
}
const deleteSelected = () => {
  const data = {
    keys: selectedRowKeys,
    portfolioID: slug
  };
  dispatch({ type: 'deleteAsset', payload: data});
}

const rowSelectHandler = (rows) => {
  const selectedRowKeys = rows.map( (row) => row.currency);
  setSelectedRowKeys(selectedRowKeys);
}

  return (
    <div className={css.portfolioContainer}>
      <div className={css.headerContainer}>
        <h2 className={css.header} >{portfolio.name}</h2>
        <h3 className={css.header} >{portfolio.description}</h3>
      </div>

      <ActionMenu 
          deleteSelected={() => deleteSelected()}
          disableDeleteSelectedBtn={selectedRowKeys.length === 0}
          show={true}
          toggleEditMode={() => toggleEditMode()}
          menuType='portfolio'

        />
      <AssetsGrid
        portfolios={assets}
        isEditable={editModeEnabled}
        cellChangeCallback={(data) => cellChangeHandler(data)}
        onRowSelect={(data) => rowSelectHandler(data)}
      />
   
    </div>
  );
}

export default ViewPortfolio;

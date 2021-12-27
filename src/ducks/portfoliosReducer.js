import { createAction, createReducer } from '@reduxjs/toolkit';

const add = createAction('portfolios/add');
const importData = createAction('portfolios/import');
const deleteAll = createAction('deleteAllPortfolios');
const editPortfolioRow = createAction('editPortfolioRow');
const deleteAsset = createAction('deleteAsset');
const deletePortfolios = createAction('deletePortfolios');

const initialState = {
  portfolios: {},
  areActive: false,
};


export const portfoliosReducer = createReducer(initialState, (builder) => {
  
  builder
    .addCase(add, (state, action) => {
      const index = Object.keys(state.portfolios).length;
      action.payload.id = index;
      state.portfolios[action.payload.id] = action.payload;
      if(state.areActive === false) {
        state.areActive = true;
      }
    })
    .addCase(importData, (state, action) => {
      const importArray = Object.values(action.payload);

      const portfoliosMutable = JSON.parse( JSON.stringify( state.portfolios ) );

      const existingPortfolios = Object.values(portfoliosMutable);
      const newArray = existingPortfolios.concat(importArray);

      const newState = {};

      newArray.forEach((portfolio, index) => {
        portfolio.id = index;
        newState[index] = portfolio;
      });

      state.portfolios = newArray;
    })
    .addCase(deleteAll, (state, action) => {
      state.portfolios = {}
      state.areActive = false;
    })
    .addCase(editPortfolioRow, (state, action) => {
      const portfolioID = action.payload.portfolioID;
      console.log('action reducer', action);
      if(action.payload.field === 'currency') {

        const assetState = state.portfolios[portfolioID].assets[action.payload.asset];
        // update existing property
        assetState[action.payload.field] = action.payload.value;
  
        // create new property using value
        state.portfolios[portfolioID].assets[action.payload.value] = assetState;
        delete state.portfolios[portfolioID].assets[action.payload.asset]
        return state;
      }
      if(action.payload.field === 'amount') {
        const assetState = state.portfolios[portfolioID].assets[action.payload.asset];
        assetState[action.payload.field] = action.payload.value;
        state.portfolios[portfolioID].assets[action.payload.asset] = assetState;
        return state;
      }
      return state;
    })
    .addCase(deleteAsset, (state, action) => {
      const keysToRemove = action.payload.keys;
      keysToRemove.forEach((key) => {
        delete state.portfolios[action.payload.portfolioID].assets[key];
      });
      return state
    })
    .addCase(deletePortfolios, (state, action) => {
      const keysToRemove = action.payload.keys;
      keysToRemove.forEach((key) => {
        delete state.portfolios[key];
      });
      return state
    })
})
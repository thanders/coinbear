import { configureStore } from '@reduxjs/toolkit';
import { portfoliosReducer } from '../ducks/portfoliosReducer';
import { createPortfolioReducer } from '../ducks/createPortfolioReducer';

export const store = configureStore({
  reducer: {
    viewPortfolios: portfoliosReducer,
    createPortfolio: createPortfolioReducer,
  },
});

import React from 'react';
import { Routes, Route } from "react-router-dom";
import CreatePortfolio from './containers/CreatePortfolio/CreatePortfolio';
import ViewPortfolios from './containers/ViewPortfolios/ViewPortfolios';
import Home from './containers/Home/Home';
import ViewPortfolio from './containers/viewPortfolio/viewPortfolio';
import AppContainer from './components/AppContainer/AppContainer';
import ExportData from './containers/ExportData/ExportData';
import './App.css';
import ImportData from './containers/ImportData/ImportData';
import Dashboard from './containers/Dashboard/Dashboard';


function App() {
  return (
      <AppContainer>
        <Routes>
          <Route path="coinbear/" element={<Home />} />
          <Route path="coinbear/create" element={<CreatePortfolio />} />
          <Route path="coinbear/myportfolios" element={<ViewPortfolios />} />
          <Route path="coinbear/myportfolios" element={<ViewPortfolio />} >
            <Route path=":slug" />
          </Route>
          <Route path="coinbear/exportData" element={<ExportData />} />
          <Route path="coinbear/importData" element={<ImportData />} />
          <Route path="coinbear/dashboard" element={<Dashboard />} />
        </Routes>
      </AppContainer>
  );
}

export default App;

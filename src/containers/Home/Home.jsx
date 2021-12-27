import React from 'react';
import css from './home.module.css';
import MenuGrid from '../MenuGrid/MenuGrid';
import {useLocation} from 'react-router-dom';
import SnackBarRenderer from '../SnackBarRenderer/SnackBarRenderer';

function Home() {

  const location = useLocation();

  return (
  <div>
    <MenuGrid />
    {
    location.state && location.state.name ?
    <SnackBarRenderer showSnackBar={true} snackBarMessage={location.state.name} /> : null
    }
  </div>
  );
}

export default Home;

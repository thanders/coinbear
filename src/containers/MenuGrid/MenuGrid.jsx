import React from 'react';
import css from './menuGrid.module.css';
import { Link } from "react-router-dom";


function MenuGrid() {
  return (
    <div className={css.menuGridContainer}>
      <table className={css.tableStyles}>
        <tr className={css.menuGridContainer}>
          <Link to='/coinbear/dashboard'>
            <td className={css.squareCard}>
              Dashboard
            </td>
          </Link>
          <Link to='/coinbear/create'>
            <td className={css.squareCard}>
              Create Portfolio
            </td>
          </Link>
          <Link to='/coinbear/myportfolios'>
            <td className={css.squareCard}>
              My Portfolios
            </td>
          </Link>
        </tr>
        <tr className={css.menuGridContainer}>
          <Link to='/coinbear/importData'>
            <td className={css.squareCard}>
              Import from file
            </td>
          </Link>
          <Link to='/coinbear/exportData'>
            <td className={css.squareCard}>
              Export to file
            </td>
          </Link>
          
        </tr>
      </table>
    </div>
  );
}

export default MenuGrid;

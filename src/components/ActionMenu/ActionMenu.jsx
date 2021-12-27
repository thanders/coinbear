/* eslint-disable react/no-typos */

import React, { useState } from 'react';
import css from './actionMenu.module.css';
import Card from '../Card/Card';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const getLabelText = (menuType) => {
  if(menuType === 'portfolio') {
    return 'Delete selected assets';
  }
  if(menuType === 'portfolios') {
    return 'Delete selected portfolios'
  }
}

function ActionMenu({
  deleteSelected,
  disableDeleteSelectedBtn,
  show,
  toggleEditMode,
  menuType,
}) {

  const buttonLabel = getLabelText(menuType);

  const portfoliosMenu = (
    <div className={css.actionItems}>
      <button
        onClick={() => deleteSelected()}
        className={css.actionButton}
        disabled={disableDeleteSelectedBtn}
      >
        {buttonLabel}
      </button>

      <FormControlLabel className={css.labelStyles} control={<Switch onChange={toggleEditMode} disabled={menuType === 'portfolios'} />} label="Edit Mode" />
    </div>
    );
  if(!show) return null;
  return (
    <div className={css.menuContainer}>
      <Card>
          <div className={css.secondaryNavMenuContainerClosed}>
            {portfoliosMenu}
          </div>
      </Card>
    </div> 
  );
}

ActionMenu.propTypes = {
  deleteSelected: PropTypes.func,
  disableDeleteSelectedBtn: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func,
  menuType: PropTypes.string.isRequired,
}

ActionMenu.defaultProps = {
  deleteAllPortfoliosCallback: () => {},
  toggleEditMode: () => {},
}

export default ActionMenu;

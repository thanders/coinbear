/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import css from './snackBarRenderer.module.css';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';

function SnackBarRenderer({
    showSnackBar,
    snackBarMessage,
    hideSnackbarCallback
  }) {

  return (
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => hideSnackbarCallback()}
      >
        <div className={css.snackBar}>
          <CheckCircleIcon color='success' />
          <div className={css.spaceBlock} />
            <span>
              {snackBarMessage}
            </span>
        </div>
      </Snackbar>
  );
}

SnackBarRenderer.propTypes = {
  showSnackBar: PropTypes.bool.isRequired,
  snackBarMessage: PropTypes.string.isRequired,
  hideSnackbarCallback: PropTypes.func,
}

SnackBarRenderer.defaultProps = {
  hideSnackbarCallback: () => {},
}

export default SnackBarRenderer;

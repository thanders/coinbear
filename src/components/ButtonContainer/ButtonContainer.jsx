import React from 'react';
import css from './buttoncontainer.module.css';

export const AppContainer = ({primaryButton, secondaryButton}) =>

    <div className={css.App}>
      <div className={css.horizontalContainer}>
        <div className={css.buttonStyles}>
          {secondaryButton}
        </div>
        <div className={css.buttonStyles}>
          {primaryButton}
        </div>
      </div>
    </div>

export default AppContainer;
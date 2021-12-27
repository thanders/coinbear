import React, { useState } from 'react';
import BreadcrumbMenu from '../BreadcrumbMenu/BreadcrumbMenu';
import css from './navigation.module.css';

function Navigation() {
  const [isSecondaryNavVisible, setIsSecondaryNavVisible] = useState(false);
  
  return (
      <header className={css.navContainer}>
        <div className={css.navPrimary}>
          Placeholder for Logo
        </div>
        <div className={isSecondaryNavVisible ? css.navSecondary : null}>
          <BreadcrumbMenu isVisibleCallback={(value) => setIsSecondaryNavVisible(value)} />
        </div>
      </header>
  );
}

export default Navigation;

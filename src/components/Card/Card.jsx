import React from 'react';
import css from './card.module.css';

function Card({children}) {

  return (
        <div className={css.card}>
          <div class={css.container}>
            {children}
          </div>
        </div>
  );
}

export default Card;

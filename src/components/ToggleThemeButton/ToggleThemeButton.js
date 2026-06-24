"use client"
import React, {useState} from 'react';
import Cookie from 'js-cookie';

import styles from '../Header/Header.module.css';
import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '../VisuallyHidden';
import {LIGHT_TOKENS, DARK_TOKENS} from '@/constants';

function ToggleThemeButton({initialTheme}) {
  const [theme, setTheme] = useState(initialTheme);

  function handleToggleTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);

    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button onClick={handleToggleTheme} className={styles.action}>
      {theme === 'light' ?
        <Sun size="1.5rem" /> :
        <Moon size="1.5rem" />
      }
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  )
}

export default ToggleThemeButton;

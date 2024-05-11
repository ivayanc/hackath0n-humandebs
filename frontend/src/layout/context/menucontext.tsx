import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useState } from 'react';

export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

export const MenuContext = createContext({} as MenuContextProps);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState('');

  const value = {
    activeMenu,
    setActiveMenu
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

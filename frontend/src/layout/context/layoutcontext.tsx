'use client';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
};

export type LayoutConfig = {
  ripple: boolean;
  inputStyle: string;
  menuMode: string;
  colorScheme: string;
  theme: string;
  scale: number;
};

export interface LayoutContextProps {
  layoutConfig: LayoutConfig;
  setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
  layoutState: LayoutState;
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
  onMenuToggle: () => void;
  showProfileSidebar: () => void;
}

export const LayoutContext = createContext({} as LayoutContextProps);
export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
  });
  const isOverlay = () => {
    return layoutConfig.menuMode === 'overlay';
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const onMenuToggle = () => {
    if (isOverlay()) {
      setLayoutState(prevLayoutState => ({
        ...prevLayoutState,
        overlayMenuActive: !prevLayoutState.overlayMenuActive
      }));
    }

    if (isDesktop()) {
      setLayoutState(prevLayoutState => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive
      }));
    } else {
      setLayoutState(prevLayoutState => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive
      }));
    }
  };

  const showProfileSidebar = () => {
    setLayoutState(prevLayoutState => ({
      ...prevLayoutState,
      profileSidebarVisible: !prevLayoutState.profileSidebarVisible
    }));
  };

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    showProfileSidebar
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

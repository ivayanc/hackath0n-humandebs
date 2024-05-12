import React, { useContext } from 'react';

import type { AppMenuItem } from './AppMenuitem';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';

const AppMenu = () => {
  useContext(LayoutContext);

  const model: AppMenuItem[] = [
    {
      label: 'Дім',
      items: [
        { label: 'Дашборд', icon: 'pi pi-fw pi-home', to: '/volunteer' },
        {
          label: 'Створити маршрут',
          icon: 'pi pi-fw pi-home',
          to: '/volunteer/create-route'
        }
      ]
    }
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root index={i} key={item.label} />
          ) : (
            <li className="menu-separator" />
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;

'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, {
  type HTMLAttributeAnchorTarget,
  useContext,
  useEffect
} from 'react';
import { CSSTransition } from 'react-transition-group';

import { MenuContext } from './context/menucontext';

export interface MenuModel {
  label: string;
  icon?: string;
  items?: MenuModel[];
  to?: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  seperator?: boolean;
}

type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  item?: AppMenuItem;
};

export interface AppMenuItem extends MenuModel {
  items?: AppMenuItem[];
  badge?: 'UPDATED' | 'NEW';
  badgeClass?: string;
  class?: string;
  preventExact?: boolean;
  visible?: boolean;
  disabled?: boolean;
  replaceUrl?: boolean;
  command?: ({ originalEvent, item }: CommandProps) => void;
}

export interface AppMenuItemProps {
  item?: AppMenuItem;
  parentKey?: string;
  index?: number;
  root?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
}

const AppMenuitem = (props: AppMenuItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const { item } = props;
  const key = props.parentKey
    ? `${props.parentKey}-${props.index}`
    : String(props.index);
  const isActiveRoute = item!.to && pathname === item!.to;
  const active = activeMenu === key || activeMenu.startsWith(`${key}-`);
  const onRouteChange = (url: string) => {
    if (item!.to && item!.to === url) {
      setActiveMenu(key);
    }
  };

  useEffect(() => {
    onRouteChange(pathname);
  }, [pathname, searchParams]);

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (item!.disabled) {
      event.preventDefault();
      return;
    }

    if (item!.command) {
      item!.command({ originalEvent: event, item });
    }

    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root ? true : active}
      key={item!.label}
    >
      <ul>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <li
      className={classNames({
        'layout-root-menuitem': props.root,
        'active-menuitem': active
      })}
    >
      {props.root && item!.visible !== false && (
        <div className="layout-menuitem-root-text">{item!.label}</div>
      )}
      {(!item!.to || item!.items) && item!.visible !== false ? (
        <a
          href={item!.url}
          onClick={e => itemClick(e)}
          className={classNames(item!.class, 'p-ripple')}
          target={item!.target}
          tabIndex={0}
        >
          <i className={classNames('layout-menuitem-icon', item!.icon)} />
          <span className="layout-menuitem-text">{item!.label}</span>
          {item!.items && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />
          )}
          <Ripple />
        </a>
      ) : null}

      {item!.to && !item!.items && item!.visible !== false ? (
        <Link
          href={item!.to}
          replace={item!.replaceUrl}
          target={item!.target}
          onClick={e => itemClick(e)}
          className={classNames(item!.class, 'p-ripple', {
            'active-route': isActiveRoute
          })}
          tabIndex={0}
        >
          <i className={classNames('layout-menuitem-icon', item!.icon)} />
          <span className="layout-menuitem-text">{item!.label}</span>
          {item!.items && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler" />
          )}
          <Ripple />
        </Link>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;

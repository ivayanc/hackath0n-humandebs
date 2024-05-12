'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Button } from 'primereact/button';
import { StyleClass } from 'primereact/styleclass';
import { classNames } from 'primereact/utils';
import type { MutableRefObject, ReactNode } from 'react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import HomePageTemplate from '@/components/templates/HomePageTemplate';
import { LayoutContext } from '@/layout/context/layoutcontext';
import type { Dashboard } from '@/lib/services /DashboardService';
import { DashboardService } from '@/lib/services /DashboardService';

export type NodeRef = MutableRefObject<ReactNode>;

const LandingPage = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const menuRef = useRef<HTMLElement | null>(null);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await DashboardService.getDashboards();
        setDashboard(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboard();
  }, []);

  const toggleMenuItemClick = () => {
    setIsHidden(prevState => !prevState);
  };

  return (
    <div className="surface-0 justify-content-center flex">
      <div id="home" className="landing-wrapper overflow-hidden">
        <div className="align-items-center justify-content-between relative mx-0 flex p-4 md:mx-6 lg:static lg:mx-8 lg:px-8">
          <Link href="/" className="align-items-center flex">
            <span className="text-900 line-height-3 mr-8 text-2xl font-medium">
              {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </span>
          </Link>
          <StyleClass
            nodeRef={menuRef as NodeRef}
            selector="@next"
            enterClassName="hidden"
            leaveToClassName="hidden"
            hideOnOutsideClick
          >
            <i
              ref={menuRef}
              className="pi pi-bars text-700 block cursor-pointer text-4xl lg:hidden"
            />
          </StyleClass>
          <div
            className={classNames(
              'align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2',
              { hidden: isHidden }
            )}
            style={{ top: '100%' }}
          >
            <div className="justify-content-between border-top-1 lg:border-top-none surface-border mt-3 flex py-3 lg:mt-0 lg:block lg:py-0">
              <Link href="/login">
                <Button
                  label="Я волонтер"
                  text
                  rounded
                  className="line-height-2 border-none font-light text-blue-500"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-auto p-3">
          {dashboard && (
            <HomePageTemplate
              active_requests={dashboard.active_requests}
              active_volunteers={dashboard.active_volunteers}
              closed_requests={dashboard.closed_requests}
              listRegionData={dashboard.top5_regions}
            />
          )}
        </div>
        <div className="mx-0 mt-8 p-4 lg:mx-8">
          <div className="justify-content-between grid">
            <div className="col-12 md:col-2" style={{ marginTop: '-1.5rem' }}>
              <Link
                href="/"
                className="align-items-center justify-content-center md:justify-content-start mb-3 flex cursor-pointer flex-wrap md:mb-0"
              >
                <span className="text-900 text-3xl font-medium">
                  {process.env.NEXT_PUBLIC_PROJECT_NAME}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

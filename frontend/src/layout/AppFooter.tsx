import React from 'react';

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <span className="ml-2 font-medium">
        {process.env.NEXT_PUBLIC_PROJECT_NAME}
      </span>
    </div>
  );
};

export default AppFooter;

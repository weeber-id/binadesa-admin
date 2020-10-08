import React from 'react';
import './_page-wrapper.scss';

const PageWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className="page-wrapper">
      <div className="page-wrapper__dalem">{children}</div>
    </div>
  );
};

export default PageWrapper;

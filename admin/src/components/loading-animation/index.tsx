import React from 'react';
import './_loading-animation.scss';

const LoadingAnimation = () => {
  return (
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingAnimation;

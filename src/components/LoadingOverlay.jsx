import ReactDOM from 'react-dom';
import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

export const LoadingOverlay = () =>
  ReactDOM.createPortal(
    <div className="absolute left-0 top-0 h-screen w-screen z-50 loading-overlay">
      <ThreeCircles
        height="100"
        width="100"
        color="#6366f1"
        visible={true}
        ariaLabel="three-circles-rotating"
      />
    </div>,
    document.body
  );

// components/ErrorPage.js

import React from 'react';
import errorComponents from '../../components/!ErrorComps/100';

const ErrorPage = ({ errorCode }) => {
  const ErrorComponent = errorComponents[errorCode];

  if (!ErrorComponent) {
    return <div>Error: Unknown error code</div>;
  }

  return (
    <>
      <ErrorComponent />
    </>
  );
};

export default ErrorPage;

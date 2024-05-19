import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Error() {
  const location = useLocation();
  const { errorCode, errorMessage } = location.state || {
    errorCode: "Error",
    errorMessage: "An unexpected error occurred.",
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="text-center mt-4">
            <h1 className="display-1">{errorCode}</h1>
            <p className="lead">{errorMessage}</p>
            <Link to="/">
              <i className="fas fa-arrow-left me-1"></i>
              Volver a página principal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

const ErrorDisplay = ({ error, context = 'application' }) => {
  const getErrorMessage = () => {
    if (error.status === 'FETCH_ERROR') {
      return `Network error - check URLs in src/app/apiSlice.js`;
    }
    
    if (error.status && error.data?.message) {
      return `${error.status}: ${error.data.message} - check githubUsername in src/config.js`;
    }
    
    return `${error.status || 'Error'} - check ${context} configuration`;
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <h2>{getErrorMessage()}</h2>
    </Container>
  );
};

ErrorDisplay.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.shape({
      message: PropTypes.string,
    }),
  }).isRequired,
  context: PropTypes.string,
};

export default ErrorDisplay;
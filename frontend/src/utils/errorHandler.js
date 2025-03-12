
/**
 * Error handling utility functions
 */

// Display error message to user
export const handleError = (error, setError) => {
  if (error.response) {
    // The request was made and the server responded with an error status
    setError(error.response.data.message || 'Server error occurred');
  } else if (error.request) {
    // The request was made but no response was received
    setError('Network error. Please check your connection.');
  } else {
    // Something happened in setting up the request
    setError(error.message || 'An unexpected error occurred');
  }
  console.error('Error:', error);
};

// Clear error after some time
export const clearErrorAfterDelay = (setError, delay = 5000) => {
  setTimeout(() => {
    setError('');
  }, delay);
};

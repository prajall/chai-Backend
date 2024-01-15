function apiError(statusCode, message = "Something went wrong", errors = []) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  error.errors = errors;
  error.success = false;

  return error;
}

export { apiError };

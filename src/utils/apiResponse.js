function apiResponse(statusCode, message, data) {
  return {
    statusCode: statusCode,
    message: message,
    success: true,
    data: data,
  };
}
export { apiResponse };

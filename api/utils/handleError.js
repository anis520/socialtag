export const handleError = (error, req, res, next) => {
  // console.log('from handle erooro');
  const status = error.status || 500;
  const message = error.message || "server error";

  return res.status(status).json({
    message,
    status,
  });
};

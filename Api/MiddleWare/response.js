const errorResponse = (res, status, error,errmsg) => {
  return res.status(status || 500).json({
    error: error || {} || errmsg,
    status: status,
  });
};
module.exports = { errorResponse };

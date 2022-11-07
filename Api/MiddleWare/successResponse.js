const successResponse = (res, statusCode, message, data) => {
  return res.status(statusCode || 200).json({
    status: statusCode || 200,
    message: message || "success",
    data: data || {},
  });
};

module.exports = { successResponse };

const returnJson = (res, statusCode, status, message, data, meta_data) => {
  return res.status(statusCode).json({
    status: {
      status: status,
      message: message,
    },
    data: data,
    meta_data: meta_data ? meta_data : null,
  });
};

module.exports = {
  returnJson,
};

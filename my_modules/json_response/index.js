const returnJson = (res, statusCode, status, message, data, meta_data) => {
  const payload = {
    status: {
      status: status,
      message: message,
    },
    data: data,
  }

  if (meta_data) {
  payload.meta_data = meta_data;
}
  return res.status(statusCode).json(payload);
};

module.exports = {
  returnJson,
};

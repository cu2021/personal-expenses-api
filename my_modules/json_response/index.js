const returnJson = (res, statusCode, status, message, data, metaData) => {
  const payload = {
    status: {
      status: status,
      message: message,
    },
    data: data,
  }

  if (metaData) {
  payload.metaData = metaData;
}
  return res.status(statusCode).json(payload);
};

module.exports = {
  returnJson,
};

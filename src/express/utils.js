'use strict';

const sendPath = (req, res) => {
  const {baseUrl, route: {path}} = req;
  res.send(`${baseUrl}${path}`);
};

module.exports = {
  sendPath,
};

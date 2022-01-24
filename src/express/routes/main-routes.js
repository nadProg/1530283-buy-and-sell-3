'use strict';

const {Router} = require(`express`);
const {sendPath} = require(`../utils`);

const mainRouter = new Router();

mainRouter.get(`/`, sendPath);
mainRouter.get(`/register`, sendPath);
mainRouter.get(`/login`, sendPath);
mainRouter.get(`/search`, sendPath);

module.exports = mainRouter;

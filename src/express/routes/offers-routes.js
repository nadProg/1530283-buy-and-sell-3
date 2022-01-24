'use strict';

const {Router} = require(`express`);
const {sendPath} = require(`../utils`);

const offersRouter = new Router();

offersRouter.get(`/category/:id`, sendPath);
offersRouter.get(`/add`, sendPath);
offersRouter.get(`/edit/:id`, sendPath);
offersRouter.get(`/:id`, sendPath);

module.exports = offersRouter;

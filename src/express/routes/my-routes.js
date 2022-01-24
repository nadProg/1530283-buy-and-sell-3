'use strict';


const {Router} = require(`express`);
const {sendPath} = require(`../utils`);

const myRouter = new Router();

myRouter.get(`/`, sendPath);
myRouter.get(`/comments`, sendPath);

module.exports = myRouter;

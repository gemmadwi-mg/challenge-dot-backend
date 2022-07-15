const usergame = require('./usergames.controller');
const auth = require('./auth.controller');
const usergamebiodata = require('./usergamebiodata.controller');
const usergamehistory = require('./usergamehistory.controller');

const controller = {};

controller.usergame = usergame;
controller.auth = auth;
controller.usergamebiodata = usergamebiodata;
controller.usergamehistory = usergamehistory;

module.exports = controller;
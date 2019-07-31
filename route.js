const express = require('express');
const router = express.Router();
const {KKRouter} = require('./kk/router');
const {loginHandler} = require('./auth/login');
router.use('/kk', KKRouter);
router.post('/login', loginHandler);
module.exports.route = router;
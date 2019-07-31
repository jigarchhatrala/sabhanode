const express = require('express');
const router = express.Router();
const {GetAllKKRouter} = require('./getKK');
router.use(GetAllKKRouter);
module.exports.KKRouter = router;
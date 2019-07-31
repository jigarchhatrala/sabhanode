const express = require('express');
const router = express.Router();
router.post('/all', (req, res) => {
    res.send(req.body);
});
module.exports.GetAllKKRouter = router;
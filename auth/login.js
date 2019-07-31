const crypto = require('crypto');
const loginHandler = function (req, res, next) {
    const dbConnection = req.dbConnection;
    dbConnection.query("call login(?,?)", [req.body.username, req.body.password]).then(data => {
        if (data.results[0].length === 0) {
            res.send({
                code: -1,
                message: "Not Authenticated",
                data: null
            })
        } else {
            const user = data.results[0][0];
            const token = crypto.randomBytes(20).toString('hex');
            const currentTime = Math.trunc(new Date().getTime() / 1000);
            dbConnection.query("call addToken(?,?,?,?)", [req.body.username, token, currentTime, currentTime + 7200]).then(data => {
                user.token = token;
                user.expire = currentTime + 7200;
                res.send({
                    code: 1,
                    message: "Authenticated",
                    data: user
                })
            }).catch(err => {
                res.send({
                    code: 247,
                    message: "Unknown Error Occur",
                    data: null
                });
            });

        }
    }).catch(err => {
        res.send({
            code: 247,
            message: "Unknown Error Occur",
            data: null
        });
    });
};
module.exports.loginHandler = loginHandler;
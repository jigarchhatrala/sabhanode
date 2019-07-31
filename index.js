//const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer')();
const {route} = require('./route');
const {getDbConnection}  = require('./dbConnection');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer.array());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use('/api', [(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    getDbConnection().then(con => {
        req.dbConnection = con;
        con.release();
        next();
    }).catch(err => {
        let response = {
            code: 247,
            message: "Unknown Error Occur",
            data: []
        };
        res.send(response);
    });
}, route]);
app.use((req, res) => {
    res.send("Hello Working");
    //fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
}); // serve angular app
app.listen(11000, () => {
    console.log("http://localhost:11000");
});
//exports.app = functions.https.onRequest(app);

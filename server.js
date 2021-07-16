var compression = require('compression');
var bodyParser = require('body-parser');
const express = require('express');
const cluster = require('cluster');
var jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
var path = require('path');
const config = require('./config/params');
const totalCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {
    const app = express();
    app.use(express.json());
    app.use(compression());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    (async function init() {
        const sqlCon = require('./config/mysqlConnection');
        global.sql = sqlCon;

        global.appRoot = path.resolve(__dirname);
        global.rootPath = __dirname;

        app.use((req, res, next) => {
            console.log(req.url);
            next();
        });

        app.use('/files', express.static(__dirname + '/files'));

        app.use("/login", require('./v1.0/routes/login'));
        app.use("/v1.0", require('./v1.0/routes/initRouterLoader'));

        app.use(async function (req, res, next) {
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token != undefined) {
                if (token.startsWith('Bearer ')) {
                    token = token.slice(7, token.length);
                    jwt.verify(token, config.secret, function (err, userInfo) {
                        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
                        delete userInfo.iat;
                        req['user_info'] = userInfo;
                    });
                }
                else
                    return res.status(500).json({ error: "Unauthorized request" });
            }
            else
                return res.status(500).json({ error: "Unauthorized request" });
            next();
        });

        

        app.use(function (req, res, next) {
            let err = new Error('Not Found Endpoint');
            err.status = 404;
            next(err);
        });

        app.use((error, req, res, next) => {
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message
                }
            });
        });

        app.listen(config.port);
        console.log(`${config.port} is the magic port`);
    })();
}
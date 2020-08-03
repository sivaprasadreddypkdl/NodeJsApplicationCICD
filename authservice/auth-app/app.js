let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
let ctrl = require('./controller');
let port = 8080;
app.use(bodyParser.urlencoded({
    limit: '3mb',
    extended: true
}));
app.use(bodyParser.json({
    json: '3mb'
}));
app.use(router);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
    console.log('Application is listening to port number ' + port + ' .. :)');
});

app.get('/', (req, res) => {
    res.json({status: 0, msg: 'Yes, it is the demo api...'});
});

app.post('/authenticate', (req, res) => {
    ctrl.authUser(req.body, (error, result) => {
        if (!error) {
            res.json({status: 0, result: result});
        } else {
            res.json({status: 1, error: error});
        }
    });
});

app.post('/find', (req, res) => {
    ctrl.findTransaction(req.body, (error, result) => {
        if (!error) {
            res.json({status: 0, result: result});
        } else {
            res.json({status: 1, error: error});
        }
    });
});

app.post('/add', (req, res) => {
    ctrl.addUser(req, (error, result) => {
        res.send({status: 0, msg: 'yes it is demo\'s application.'});
    });
});

app.put('/update', (req, res) => {
    ctrl.updateUser(req, (error, result) => {
        res.send({status: 0, msg: 'yes it is demo\'s application.'});
    });
});

app.delete('/delete', (req, res) => {
    ctrl.deleteUser(req, (error, result) => {
        res.send({status: 0, msg: 'yes it is demo\'s application.'});
    });
});

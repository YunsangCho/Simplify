const express = require('express');
//const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser= require('body-parser');
//const corsOptions = {
//  origin: ["http://127.0.0.1:8080","http://localhost:8080"],
//  credentials: true
//}
//app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'js')))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.set(' engine', 'ejs');


app.listen(8080, function(){
    console.log('listening on 8080');
});

app.get('/', function(req, res){
    res.render(__dirname + '/views/index.ejs');
});

app.get('/main', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.render(__dirname + '/views/main.ejs');
});

app.get('/test', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.render(__dirname + '/views/addrSearchPopup.ejs');
});

require('dotenv').config();
const express = require('express');
const webRouters = require('./routes/web');
const apiRouter = require('./routes/api');
const app = express()
const port = process.env.PORT || 8080;
const hostname = process.env.HOST_NAME;

// config request.body
app.use(express.json()); // Used to parse JSON bodies 
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies 

const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');


configViewEngine(app);
app.use('/', webRouters);
app.use('/v1/api/', apiRouter);


connection();
app.listen(port, hostname, () => {
    console.log(`backend listening on port ${port}`)
})




//test connection
// connection.query(
//     'select * from Users ',
//     function (err, results, fields) {
//         console.log("+++results = ", results);

//     }
// )
const express = require("express");
const wibondRouter = require('./Routes/wibondRoutes');

let app = express();

app.use(express.json());

app.use('/api/wibond-checkout', wibondRouter)

app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on the server!`
    });
});

module.exports = app
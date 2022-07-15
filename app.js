const express = require('express');
const app = express();

const morgan = require('morgan')('dev');

const router = require('./server/routes/index.route');


// SWAGGER
const swaggerUi = require('swagger-ui-express');
const apiDocumentation = require('./server/api-documentation/swagger-autogen-output.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
// ENDSWAGGER

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan);
app.use('/api/v1', router);

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
        message: "Page not Found!"
    });
});

module.exports = app;

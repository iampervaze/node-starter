const express = require('express')
    , bodyParser = require('body-parser')    // pull information from HTML POST (express4)
    , methodOverride = require('method-override');    // simulate DELETE and PUT (express4)
var cors = require('cors');

const logger = require('util/logger');
const app = express();
app.use(cors());
app.use(require("morgan")("combined", {
    "stream": {
        write: (message, encoding) => {
            logger.info(message);
        }
    }
}));

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.use('/api', require('routes/index.routes'));
app.use((err, req, res, next) => {
    logger.error("error", err);

    res.status(err.status || 500);
    res.send(err.showMessage ? err.message : 'error');
});

module.exports = app;

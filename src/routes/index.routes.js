const express = require('express')
  , router = express.Router();

router.use('/profiles', require('routes/profile.routes'));

module.exports = router;

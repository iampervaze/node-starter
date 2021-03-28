const express = require('express')
  , router = express.Router()
  , ctrl = require('controllers/profile.controller');

router.route('/')
  .get(ctrl.list)
  .post(ctrl.create);

router.route('/:id')
  .get(ctrl.get)
  .put(ctrl.update)
  .delete(ctrl.remove);

module.exports = router;

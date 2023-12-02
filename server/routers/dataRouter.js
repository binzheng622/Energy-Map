const express = require('express');

const powerController = require('../controllers/powerController');

const router = express.Router();

router.post('/:state', powerController.loadState, (req, res) => {
  return res.status(200).json(res.locals.stateData);
});

module.exports = router;

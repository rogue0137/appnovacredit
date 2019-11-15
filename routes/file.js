const express = require('express');
const router = express.Router();


router.post('/phase1', function (req, res) {
  res.send('Hello World!')
});

router.post('/phase2', function (req, res) {
  res.send('Hello World 2!')
});

router.get('/:id', function (req, res) {
  res.send('Hello!')
});

module.exports = router;
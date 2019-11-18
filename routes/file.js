const express = require('express');
const router = express.Router();

// Require controller modules
const fileController = require('../controllers/fileController');

// Routes
router.post('/phase1', fileController.saveMetaData);
router.post('/phase2', fileController.saveFile);
router.get('/:id', fileController.getSavedFileInfo);

module.exports = router;
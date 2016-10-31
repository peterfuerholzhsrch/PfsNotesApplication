"use strict";
/**
 * Created by pfu on 26/10/16.
 *
 * The router module.
 */

var express = require('express');
var router = express.Router();
var notesController = require('../controller/notesController.js');

router.get("/api/notes", notesController.getNotes);
router.get("/api/notes/:id", notesController.getNote);
router.put("/api/notes/:id", notesController.saveNote);

module.exports = router;
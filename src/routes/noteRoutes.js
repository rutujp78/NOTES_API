const express = require("express");
const { createNote, updateNote, deleteNote, getNotes } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();

noteRouter.post('/', auth, createNote);
noteRouter.put("/:id", auth ,updateNote);
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.get("/", auth, getNotes);

module.exports = noteRouter;
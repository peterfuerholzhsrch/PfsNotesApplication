"use strict";

/**
 * Created by pfu on 09/10/16.
 *
 * Here we implement the module for managing Notes.
 */
var notesService = (function() {

    function createNote(msg) {
        return new note.Note(msg.title, msg.description, msg.severity, msg.creationDate, msg.dueDate, msg.finishedDate, msg._id);
    }

    /**
     * @return Promise on Array Returns persistent notes.
     */
    function publicGetNotes() {
        return window.restClient.getNotes().then(
            function (msg) {
                if (msg && msg.orders) {
                    var notes = [];
                    // msg.orders.forEach(new function(order) {
                    //    notes.push(createNote(order));
                    // }) //
                    for (var idx = 0; idx < msg.orders.length; ++idx) {
                        notes.push(createNote(msg.orders[idx]));
                    }
                    // return msg.orders.map(function(it) { createNote(it) });
                    return notes;
                }
                return null;
            },
            function (err) {
                console.log(err);
                return err;
            }
        );
    }

    /**
     *
     * @param id
     * @returns {*} @return Promise on found node.
     */
    function publicGetNote(id) {
        return window.restClient.getNote(id).then(
            function (msg) {
                return createNote(msg);
            },
            function (err) {
                console.log(err);
                throw err;
            }
        );
    }

    /**
     * @return Note A new Note (not persistent, call saveNote to make persistent)
     */
    function publicCreateNewNote() {
        return new note.Note('');
    }

    /**
     *
     * @param note
     * @returns {*} Promise on saved note
     */
    function publicSaveNote(note) {
        console.log('NotesService, saveNote', note);
        return window.restClient.saveNote(note).then(
            function (msg) {
                return msg;
            },
            function (err) {
                console.log("error", err);
                return err;
            }
        );
    }


    return {
        getNotes: publicGetNotes,
        getNote: publicGetNote,
        saveNote: publicSaveNote,
        createNewNote: publicCreateNewNote
    };
}());
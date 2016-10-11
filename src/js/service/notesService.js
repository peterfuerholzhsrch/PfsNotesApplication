"use strict";
/**
 * Created by pfu on 09/10/16.
 *
 * Here we implement the module for managing Notes.
 */
var notesService = (function($) {

    // used for generating next Note id
    var nextId = 0;

    var NOTES_PERSISTENCE_KEY = "pf-notes-persistence";

    // cache here to avoid parsing storage on each read
    var notes;

    /**
     * Run when page is ready.
     */
    $(function() {

        if (!getNotes()) {
            console.log("notesService: Create some dummy entries..."); // TODO

            //
            // fill with default /test data:
            //
            var note = new Note("CAS FEE Selbststudium / Projekt-Aufgabe erledigen", new Date(2016, 10, 20),
                "HTML für die Notes Application erstellen. CSS erstellen für die Notes Application...", 1,
                new Date(2016, 7, 17));
            note.finishedDate = new Date(2016, 8, 23);
            saveNote(note);

            note = new Note("Einkaufen", new Date(2016, 9, 12), "Butter<br>Eier<br>Brot<br>...", 2, new Date(2016, 8, 22));
            saveNote(note);

            note = new Note("Mami anrufen", null, "888 888 88 88...", 3, new Date(2016, 8, 19));
            saveNote(note);
        }
    });

    /**
     * @return Array Returns persistent notes.
     */
    function getNotes() {
        if (!notes) {
            var notesStr = localStorage.getItem(NOTES_PERSISTENCE_KEY);
            notes = notesStr ? JSON.parse(notesStr) : null;
        }
        return notes;
    }

    /**
     * @return Note A new Note (not persistent, call saveNote to make persistent)
     */
    function createNewNote() {
        return new Note('');
    }

    function saveNote(note) {
        // read notes if null; initialize with [] if null
        if (!notes) {
            notes = getNotes(); // read persistence
            if (!notes) {
                notes = [];
            }
        }

        if (note.id) {
            // already saved -> replace current saved entry
            var foundIndex;
            notes.forEach(function (n, idx) {
                if (n.id === note.id) {
                    foundIndex = idx;
                }
            });
            if (!foundIndex) {
                throw new Error('Note=' + note + ' not found in persistent data! Could not be updated!')
            }
            notes[foundIndex] = note;
        }
        else {
            // save as new note
            note.id = nextId++;
            notes.push(note);
        }
        localStorage.setItem(NOTES_PERSISTENCE_KEY, JSON.stringify(notes));
    }

    function editNote(id) {
        var note = _seekNoteById(id);
        return note;
    }

    function _seekNoteById(id) {
        console.log('_seekNoteById', id, ' typeof id=', typeof id);
        var _note = null;
        notes.forEach(function (note) {
            if (note.id === id) {
                _note = note;
            }
        });
        return _note;
    }


    return {
        getNotes: getNotes,
        createNewNote: createNewNote,
        saveNote: saveNote,
        editNote: editNote
    };
}(jQuery));
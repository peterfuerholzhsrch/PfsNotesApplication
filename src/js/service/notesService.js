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

    var STYLE_PERSISTENCE_KEY = "pf-style-persistence";

    // cache here to avoid parsing storage on each read
    var notes;


    //
    // methods for saving / loading notes:
    //

    /**
     * Run when page is ready.
     */
    $(function() {

        if (!publicGetNotes()) {
            console.log("notesService: Create some dummy entries...");

            //
            // fill with default /test data:
            //
            var note = new Note("CAS FEE Selbststudium / Projekt-Aufgabe erledigen", new Date(2016, 10, 20),
                "HTML für die Notes Application erstellen. CSS erstellen für die Notes Application...", 1,
                new Date(2016, 7, 17));
            note.finishedDate = new Date(2016, 8, 23);
            publicSaveNote(note);

            note = new Note("Einkaufen", new Date(2016, 9, 12), "Butter<br>Eier<br>Brot<br>...", 2, new Date(2016, 8, 22));
            publicSaveNote(note);

            note = new Note("Mami anrufen", null, "888 888 88 88...", 3, new Date(2016, 8, 19));
            publicSaveNote(note);
        }
    });


    /**
     * @return Array Returns persistent notes.
     */
    function publicGetNotes() {
        if (!notes) {
            var notesStr = localStorage.getItem(NOTES_PERSISTENCE_KEY);
            notes = notesStr ? JSON.parse(notesStr) : null;
        }
        return notes;
    }

    /**
     * @return Note A new Note (not persistent, call saveNote to make persistent)
     */
    function publicCreateNewNote() {
        return new Note('');
    }

    function publicSaveNote(note) {
        // read notes if null; initialize with [] if null
        if (!notes) {
            notes = publicGetNotes(); // read persistence
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

    function publicEditNote(id) {
        var note = privateSeekNoteById(id);
        return note;
    }

    function privateSeekNoteById(id) {
        console.log('_seekNoteById', id, ' typeof id=', typeof id);
        var _note = null;
        notes.forEach(function (note) {
            if (note.id === id) {
                _note = note;
            }
        });
        return _note;
    }


    //
    // methods for saving / loading current style:
    //

    /**
     * @return String Returns persistent style, null if not available.
     */
    function publicGetStyle() {
        return localStorage.getItem(STYLE_PERSISTENCE_KEY);
    }

    function publicSetStyle(style) {
        localStorage.setItem(STYLE_PERSISTENCE_KEY, style);
    }


    return {
        getNotes: publicGetNotes,
        createNewNote: publicCreateNewNote,
        saveNote: publicSaveNote,
        editNote: publicEditNote,
        getStyle: publicGetStyle,
        setStyle: publicSetStyle
    };
}(jQuery));
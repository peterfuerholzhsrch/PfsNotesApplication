"use strict";
/**
 * Created by pfu on 26/10/16.
 *
 * The notes store (= persistence layer).
 */

var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });
var Note = require('../public/js/model/note.js').Note;


/**
 * set true to create some initial entries (applies only when notes collection is empty)
 * @type {boolean}
 */
var FILL_INITIAL_ENTRIES = false;


//
// methods for saving / loading notes:
//

function fillInitialEntries() {
    console.log("notesService: Create some dummy entries...");

    //
    // fill with default /test data:
    //
    var notes = [];

    var note = new Note("CAS FEE Selbststudium / Projekt-Aufgabe erledigen", new Date(2016, 10, 20),
        "HTML für die Notes Application erstellen.<br>CSS erstellen für die Notes Application<br>TODO<br>TODO", 1,
        new Date(2016, 7, 17));
    note.finishedDate = new Date(2016, 8, 23);
    publicSaveNote(note);

    note = new Note("Einkaufen", new Date(2016, 9, 12), "Butter<br>Eier<br>Brot<br>...", 2, new Date(2016, 8, 22));
    publicSaveNote(note);

    note = new Note("Mami anrufen", null, "888 888 88 88<br>Termin vereinbaren<br>Weihnachtsgeschenke<br>Ferienabwesenheit besprechen", 3, new Date(2016, 8, 19));
    publicSaveNote(note);
}

/**
 * @return Array Returns persistent notes.
 */
function publicGetNotes(callback) {
    console.log("srv.getNotes");

    db.find({},
        function (err, docs) {
            console.log("find() called, err=", err, " docs=", docs);

            if (FILL_INITIAL_ENTRIES) {
                try {
                    if (!docs || docs.length === 0) {
                        fillInitialEntries();
                        publicGetNotes(callback); // single recursion
                        callback = null; // avoid sending response twice!
                    }
                }
                catch (exception) {
                    console.log(exception);
                    err = exception;
                }
            }

            if (callback) {
                callback(err, docs);
            }
        });
}


function publicGetNote(id, callback)
{
    db.findOne({ _id: id }, function(err, foundDoc){
        console.log("notesStore.publicGetNote", "id", id, "found", foundDoc);
        if (callback){
            callback(err, foundDoc);
        }
    });
}


function publicSaveNote(note, callback) {
    if (note._id) {
        db.update({_id: note._id}, note, {}/*options*/, function(err, numReplaced) {
            if (err) {
                console.log("error", err);
            }
            if (numReplaced) {
                console.log('Documents updated: ', numReplaced);
            }
            if (callback) {
                callback(err, numReplaced);
            }
        } );
    }
    else {
        db.insert(note, function(err, newDoc) {
            if (err) {
                console.log("error", err);
            }
            if (newDoc) {
                console.log('Documents inserted: ', newDoc);
            }
            if (callback) {
                callback(err, newDoc);
            }
        });
    }
}


module.exports = { getNotes : publicGetNotes, saveNote : publicSaveNote, getNote : publicGetNote };
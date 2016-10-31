"use strict";
/**
 * Created by pfu on 26/10/16.
 *
 * The controller module.
 */

var store = require("../services/notesStore.js");


module.exports.getNotes = function(req, res)
{
    store.getNotes(function(err, docs) {
        if (err) {
            console.log('ctr.getNotes', 'error =', err);
            throw err;
        }
        console.log('ctr.getNotes', 'docs =', docs);
        res.type('application/json');
        res.write("{ \"orders\" : ");
        res.write(JSON.stringify(docs));
        res.end("}");
    });
};


module.exports.getNote = function(req, res)
{
    // 'id' reference to the router pattern: '/api/notes/:id' !
    store.getNote(req.params.id,
        function(err, doc) {
            if (err) {
                console.log('ctr.getNote', 'error =', err);
                throw err;
            }
            console.log('ctr.getNote', 'doc =', doc);
            res.type('application/json');
            res.end(JSON.stringify(doc));
        });
};


module.exports.saveNote = function(req, res)
{
    console.log("notesController", "req.body", req.body); // tODO

    store.saveNote(req.body,
        function(err, doc) {
            if (err) {
                console.log('ctr.saveNote', 'error =', err);
                throw err;
            }
            console.log('ctr.saveNote', 'doc =', doc);
            res.type('application/json');
            res.end(JSON.stringify(doc));
        });
};

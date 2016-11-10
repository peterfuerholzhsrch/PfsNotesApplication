"use strict";
/**
 * Created by pfu on 27/10/16.
 *
 * Implements the REST interface to the Express sserver.
 */


(function() {

    var ajaxUtil = window.ajax;
    var token = undefined;


    /**
     *
     * @returns {*} Promise on JSON object from the server
     */
    function publicGetNotes() {
        return ajaxUtil.ajax("GET", "/api/notes/", null).
            then(function (msg) {
                    console.log("notes loaded: ", msg);
                    return msg;
                },
                function (err) {
                    throw err;
                });
    }


    /**
     * @param id
     * @returns {*} Promise on JSON object from the server
     */
    function publicGetNote(id) {
        return ajaxUtil.ajax("GET", "/api/notes/" + id, null).then(function (msg) {
                if (!msg) {
                    throw new Error("Note not found!");
                }
                console.log("Note loaded: ", msg);
                return msg;
            },
            function (err) {
                console.log("Note not loaded: ", err);
                throw err;
            });
    }

    /**
     * @param note JSON object
     * @returns {*} Promise on JSON object from the server
     */
    function publicSaveNote(note) {
        return ajaxUtil.ajax("PUT", "/api/notes/" + note._id, note/*data*/, null/*header*/).then(function (msg) {
            console.log("note saved: ", msg);
            return msg;
        });
    }


    window.restClient = { getNotes : publicGetNotes, getNote : publicGetNote, saveNote : publicSaveNote };
}());
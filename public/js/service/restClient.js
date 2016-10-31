"use strict";
/**
 * Created by pfu on 27/10/16.
 *
 * Implements the REST interface to the Express sserver.
 */


(function($) {

    var ajaxUtil = window.ajax;
    var token = undefined;


    /**
     *
     * @returns {*} Promise on JSON object from the server
     */
    function publicGetNotes() {
        return ajaxUtil.ajax("GET", "/api/notes/", null).
            then(function (msg) {
                    console.log("notes: ", msg); // TODO
                    return msg;
                },
                function (err) {
                    throw err; // TODO TEST
                });
    }


    /**
     * @param id
     * @returns {*} Promise on JSON object from the server
     */
    function publicGetNote(id) {
        return ajaxUtil.ajax("GET", "/api/notes/" + id, null).then(function (msg) {
            console.log("note: ", msg); // TODO
            return msg;
        });
    }

    /**
     * @param note JSON object
     * @returns {*} Promise on JSON object from the server
     */
    function publicSaveNote(note) {
        return ajaxUtil.ajax("PUT", "/api/notes/" + note._id, note/*data*/, null/*header*/).then(function (msg) {
            console.log("note: ", msg); // TODO
            return msg;
        });
    }


    window.restClient = { getNotes : publicGetNotes, getNote : publicGetNote, saveNote : publicSaveNote };
}(jQuery));
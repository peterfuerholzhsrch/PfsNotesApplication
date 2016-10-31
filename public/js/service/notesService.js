"use strict";

/**
 * Created by pfu on 09/10/16.
 *
 * Here we implement the module for managing Notes.
 */
var notesService = (function($) {

    var STYLE_PERSISTENCE_KEY = "pf-style-persistence";


    /**
     * @return Promise on Array Returns persistent notes.
     */
    function publicGetNotes() {
        return window.restClient.getNotes().then(
            function (msg) {
                return msg ? msg.orders : null;
            },
            function (err) {
                console.log.error(err);
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
                return msg;
            },
            function (err) {
                console.log.error(err);
                return err;
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
        getNote: publicGetNote,
        saveNote: publicSaveNote,

        createNewNote: publicCreateNewNote,

        getStyle: publicGetStyle,
        setStyle: publicSetStyle
    };
}(jQuery));
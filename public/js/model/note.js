"use strict";

/**
 * Created by pfu on 09/10/16.
 *
 * The model class is used on the client as well as partly on the server side.
 */
var note = (function() {

    var MIN_SEVERITY = 1;
    var MAX_SEVERITY = 5;

    /**
     * This function is defined here since note.js is used on the server side as well. severity.js needs jQuery which is
     * currently not needed on the server side.
     * @param severity
     */
    function checkSeverityRange(severity) {
        if (!severity || severity < MIN_SEVERITY || severity > MAX_SEVERITY) {
            throw new Error('severity value=' + severity + ' out of range: [' + MIN_SEVERITY +'..' + MAX_SEVERITY + ']');
        }
    }


    /**
     * @param title
     * @param description '' if unset
     * @param severityValue 1 if unset
     * @param creationDate new Date() if unset
     * @param dueDate new Date() if unset
     * @param finishedDate undefined if unset
     * @param id
     * @constructor
     */
    function Note(title, description, severityValue, creationDate, dueDate, finishedDate, id) {
        var self = this;
        // var _id = id;
        this._id = id;
        this.title = title;

        self.setDueDate = function(date) {
            if (typeof date === "string") {
                date = new Date(date);
            }
            console.log('set dueDate', date);
            self.dueDate = date;
        };
        self.setFinishedDate = function(date) {
            if (typeof date === "string") {
                date = new Date(date);
            }
            console.log('set finishedDate', date);
            self.finishedDate = date;
        };

        this.setDueDate(dueDate || new Date());
        this.description = description || '';
        severityValue = severityValue || 1
        checkSeverityRange(severityValue);
        this.severity = severityValue;
        this.creationDate = creationDate || new Date();
        this.setFinishedDate(finishedDate);
    }

    return {
        Note: Note
    };
}());
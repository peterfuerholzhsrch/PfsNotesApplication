"use strict";

/**
 * Created by pfu on 09/10/16.
 *
 * This class uses ES2015 classes. Hence we see errors in WebStorm with current settings.
 */

//(function(exports){
//(function(window){
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

//exports.Note =
    class Note {

    constructor(title, dueDate = new Date(), description = '', severityValue = 1, creationDate = new Date()) {
        this._id = undefined;  // set by NeDB!
        this.title = title;
        this.dueDate = dueDate;
        // if (dueDate instanceof String) {
        //     this.dueDate = new Date(this.dueDate);
        // }
        this.description = description;
        checkSeverityRange(severityValue);
        this.severity = severityValue;
        this.creationDate = creationDate;
        this.finishedDate = null;
    }
}

// The class Note is used within the server as well as on the client. On the server we have modules but none the client.
// With following code we can bring both 'world' together (see
// http://stackoverflow.com/questions/3225251/how-can-i-share-code-between-node-js-and-the-browser):
// }(typeof exports === 'undefined' ? this.share = {} : exports));

    return {
        Note: Note
    };
}());
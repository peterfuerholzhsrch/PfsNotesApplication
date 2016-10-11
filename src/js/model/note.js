"use strict";
/**
 * Created by pfu on 09/10/16.
 *
 * This class uses ES2015 classes. Hence we see errors in WebStorm with current settings.
 */

class Note {

    constructor(title, dueDate = new Date(), description = '', severityValue = 1, creationDate = new Date()) {
        this.id = null;
        this.title = title;
        this.dueDate = dueDate;
        this.description = description;
        severity.checkSeverityRange(severityValue);
        this.severity = severityValue;
        this.creationDate = creationDate;
        this.finishedDate = null;
    }

}
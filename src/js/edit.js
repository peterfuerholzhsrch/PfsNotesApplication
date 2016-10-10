"use strict";
/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:		base Javascript
 ********************************************************************************************************/


// TODO variables should not be public!

var note;

/**
 * Run when page is ready.
 */
$(function() {

    // set listeners on menu buttons:
    $("#saveNotesBtn").on("click", function(event) { saveEdit(); routeToOverview(); });
    $("#cancelBtn").on("click", routeToOverview);

    // eval URL parameter to find out which item to edit:
    var paramValue = _getUrlParameter('id');

    console.log('edit: paramValue=', paramValue);

    if (paramValue) {
        // (try to) edit note with id=paramValue
        note = notesService.editNote(parseInt(paramValue));
    }
    else {
        // create new note
        note = notesService.createNewNote();
    }

    console.log('edit: note=', note);

    //
    // show current content of note:
    //
    $('#title-input').val(note.title);
    $('#description-input').val(note.description);
    $('#date-input').val(new Date(note.dueDate).toISOString().slice(0, 10));  // format: yyyy-MM-dd
    //$('#title-input').value = note.title;
    // replace 'div' with severity widget:
    installSeverityWidgetOn("#severity-widget", note, true); // TODO real value!!!

    // TODO catch error and show it!!!
});

function _getUrlParameter(param) {
    // taken from http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == param)
        {
            return sParameterName[1];
        }
    }
}


function routeToOverview() {
    window.location.assign("index.html");
}


function saveEdit() {
    // update note / take over changes from the UI:
    note.title = $('#title-input').val();
    note.description = $('#description-input').val();
    note.dueDate = $('#date-input').val();
    //$('#title-input').value = note.title;
    // severity is updated by the widget...

    // save it:
    notesService.saveNote(note);
    note = null;
}
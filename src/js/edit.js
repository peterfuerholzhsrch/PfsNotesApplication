"use strict";
/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:		base Javascript
 ********************************************************************************************************/


(function($) {

    var note;

    /**
     * Run when page is ready.
     */
    $(function() {

        // set listeners on menu buttons:
        $("#saveNotesBtn").on("click", function(event) {
            if (privateSaveEdit()) {
                privateRouteToOverview();
            }
        });
        $("#cancelBtn").on("click", privateRouteToOverview);

        // eval URL parameter to find out which item to edit:
        var paramValue = privateGetUrlParameter('id');

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
        severity.installSeverityWidgetOn("#severity-widget", note, true, "severity-widget");

        // TODO catch error and show it!!!
    });

    function privateGetUrlParameter(param) {
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


    function privateRouteToOverview() {
        window.location.assign("index.html");
    }


    /**
     * @return false if there are validation errors
     */
    function privateSaveEdit() {

        // check values:
        var titleInput = $('#title-input');
        // call '[0]' since validateField expects DOM object (not jQuery-obj)
        if (!validation.validateField(titleInput[0])) {
            return false; // validation error
        }
        var descriptionTextarea = $('#description-input');
        if (!validation.validateField(descriptionTextarea[0])) {
            return false; // validation error
        }
        var duedateInput = $('#date-input');
        if (!validation.validateField(duedateInput[0])) {
            return false; // validation error
        }

        // update note / take over changes from the UI:
        note.title = titleInput.val();
        note.description = descriptionTextarea.val();
        note.dueDate = duedateInput.val();
        //$('#title-input').value = note.title;
        // severity is updated by the widget...

        // save it:
        notesService.saveNote(note);
        note = null;
        return true;
    }

    return {
        // nothing
    };
}(jQuery));
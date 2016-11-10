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
    var DATE_FORMAT = "dd.mm.yy";

    /**
     * Run when page is ready.
     */
    $(function() {

        // set listeners on menu buttons:
        $("#saveNotesBtn").on("click", function() {
            if (privateSaveEdit()) {
                privateRouteToOverview();
            }
        });
        $("#cancelBtn").on("click", privateRouteToOverview);

        // install jquery-ui datepicker and configure date format:
        var datepickerWidget = $("#date-input");
        datepickerWidget.datepicker();
        datepickerWidget.datepicker("option", "dateFormat", DATE_FORMAT);

        // eval URL parameter to find out which item to edit:
        var paramValue = privateGetUrlParameter('id');

        console.log('edit: paramValue=', paramValue);

        if (paramValue) {
            // (try to) edit note with id=paramValue
            notesService.getNote(paramValue).
                then(privateFillUi).
                catch(function(err) {
                    console.log(err);
                    $('.error').css('display', 'block'); // make visible
                    $('#error-msg').html("No note found under set ID!");
                    $('#error-sub-msg').html(err);
                    $('#saveNotesBtn').attr("disabled", "true");
                });
        }
        else {
            // create new note and show this:
            privateFillUi(notesService.createNewNote());
        }
    });

    function privateFillUi(noteToFillUi) {
        note = noteToFillUi;
        console.log('edit: note=', note);

        //
        // show current content of note:
        //
        $('#title-input').val(note.title);
        $('#description-input').val(note.description);
        var dateStr = $.datepicker.formatDate(DATE_FORMAT, note.dueDate);
        $('#date-input').val(dateStr);
        // replace 'div' with severity widget:
        severity.installSeverityWidgetOn("#severity-widget", note, true, "severity-widget");
    }


    function privateGetUrlParameter(param) {
        // taken from http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
        var pageUrl = window.location.search.substring(1);
        var urlVariables = pageUrl.split('&');
        for (var i = 0; i < urlVariables.length; i++)
        {
            var parameterName = urlVariables[i].split('=');
            if (parameterName[0] == param)
            {
                return parameterName[1];
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

        var dueDate = $.datepicker.parseDate(DATE_FORMAT, duedateInput.val());
        note.setDueDate(dueDate);

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
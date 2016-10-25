"use strict";
/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:		base Javascript
 ********************************************************************************************************/


(function($) {

    var sortOrder = 0; // 0=Finish Date, 1=Creation Date, 2=Importance
    var filterFinishedActive = false;

    var createNotesHtml;


    /**
     * Run when page is ready.
     */
    $(function() {
        HandlebarsIntl.registerWith(Handlebars);
        // The checked-attribute on input tells with its presence (not its value) whether checkbox shall be selected or not.
        // Handlebars does not support that out of the box so we use following handler.
        // - see here: http://stackoverflow.com/questions/22794710/handlebars-conditionally-add-attribute
        // - unfortunately we cannot place JS code into the handlebar code -> helper here less generic
        Handlebars.registerHelper('checkedIfTrue', function (trueValue) {
            return trueValue ? 'checked' : '';
        });

        Handlebars.registerHelper('editBtnListener', function (id) {
            // passing over which one to edit via URL parameter (other way e.g. via LocaleSession):
            return '"event.preventDefault(); window.location.assign(\'edit.html?id=' + id + '\')"';
        });
        createNotesHtml = Handlebars.compile(document.getElementById("notes-template").innerText);

        // set listeners on menu buttons:
        $("#new-notes-btn").on("click", privateRouteToEdit);

        var filterFinishedBtn = $("#filter-finished-btn");
        filterFinishedBtn.on("click", privateToggleFilterOnFinished);

        var sortByFinishDateBtn = $("#sort-by-finish-date-btn");
        sortByFinishDateBtn.on(  "click", { sortOrder: 0}, privateSetSortOrder);
        var sortByCreationDateBtn = $("#sort-by-creation-date-btn");
        sortByCreationDateBtn.on("click", { sortOrder: 1}, privateSetSortOrder);
        var sortByImportanceBtn = $("#sort-by-importance-btn");
        sortByImportanceBtn.on(  "click", { sortOrder: 2}, privateSetSortOrder);
        privateUpdateSortOrderUi();

        // set listener on notes-container to listen for 'finished' actions:
        var notesContainerDiv = $("#notes-container");
        notesContainerDiv.on("click", function(event) {
            var id = event.target.getAttribute("data-id");
            if (!id) {
                return;  // not clicked onto checkbox...
            }
            var note = notesService.editNote(parseInt(id));
            if (note.finishedDate) {
                note.finishedDate = null;
            }
            else {
                note.finishedDate = new Date();
            }
            notesService.saveNote(note);

            privateRenderNotes(); // rerender to show updated finished-timestamp
        });

        privateRenderNotes();
    });


    function privateRouteToEdit() {
        window.location.assign("edit.html")
    }


    function privateRenderNotes () {
        $("#notes-container").html(createNotesHtml(getNotes(), { data: {intl: { locales: 'de-CH'}}}));

        // replace elements with class='pf-severity-widget' with severity widget:
        var severityWidgetsPlaceholders = $('.pf-severity-widget');

        // severityWidgetsPlaceholders and getNotes() MUST have same length!

        // Doesn't work: for (var i in severityWidgetsPlaceholders){
        // severityWidgetsPlaceholders has additional property 'length' which does not get overread -> getNotes()['length']
        // produces error!
        for (var i=0; i<severityWidgetsPlaceholders.length; ++i){
            severity.installSeverityWidgetOnEl($(severityWidgetsPlaceholders[i]), getNotes()[i], false/*editable*/);
        }
    }

    function privateSetSortOrder(event) {
        var sortNb = event.data.sortOrder;
        if (sortNb === sortOrder) {
            return; // avoid rerendering
        }
        sortOrder = sortNb;
        privateUpdateSortOrderUi();
    }

    function privateUpdateSortOrderUi() {
        // update UI:
        var sortByFinishDateBtn = $("#sort-by-finish-date-btn");
        sortOrder == 0 ? sortByFinishDateBtn.addClass("pf-btn-pressed") : sortByFinishDateBtn.removeClass("pf-btn-pressed");
        var sortByCreationDateBtn = $("#sort-by-creation-date-btn");
        sortOrder == 1 ? sortByCreationDateBtn.addClass("pf-btn-pressed") : sortByCreationDateBtn.removeClass("pf-btn-pressed");
        var sortByImportanceBtn = $("#sort-by-importance-btn");
        sortOrder == 2 ? sortByImportanceBtn.addClass("pf-btn-pressed") : sortByImportanceBtn.removeClass("pf-btn-pressed");
        privateRenderNotes();
    }

    function privateGetSortOrder() {
        return sortOrder;
    }

    function privateToggleFilterOnFinished() {
        privateSetFilterOnFinishedActive(!filterFinishedActive);
    }

    function privateSetFilterOnFinishedActive(active) {
        if (filterFinishedActive === active) {
            return; // avoid rerendering
        }
        $("#filter-finished-btn").toggleClass("pf-btn-pressed");

        filterFinishedActive = active;
        privateRenderNotes();
    }

    function privateIsFilterFinishedActive() {
        return filterFinishedActive;
    }


    function privateSortNotesByFinishDate(notes) {
        var compareByFinishDate = function compareNotes(s1, s2) {
            return s1.dueDate < s2.dueDate;
        };
        return notes.sort(compareByFinishDate);
    }

    function privateSortNotesByCreationDate(notes) {
        var compareByCreationDate = function compareNotes(s1, s2) {
            return s1.creationDate < s2.creationDate;
        };
        return notes.sort(compareByCreationDate);
    }

    function privateSortNotesByImportance(notes) {
        var compareByImportance = function compareNotes(s1, s2) {
            return s1.severity < s2.severity;
        };
        return notes.sort(compareByImportance);
    }

    /**
     *
     * @param filterOnFinishedActive If true only the finished notes are returned. If false <b>all notes</b> are returned.
     * @returns {*}
     */
    function privateFilterOnFinished(filterOnFinishedActive) {
        return filterOnFinishedActive ?
            notesService.getNotes().filter(function(note) { return !!note.finishedDate; } ) : notesService.getNotes();
    }

    function getNotes() {
        var notes = privateFilterOnFinished(filterFinishedActive);

        switch (sortOrder) {
            case 0:
                notes = privateSortNotesByFinishDate(notes);
                break;
            case 1:
                notes = privateSortNotesByCreationDate(notes);
                break;
            case 2:
                notes = privateSortNotesByImportance(notes);
                break;
            default:
                console.error("sortOrder out of range: ", sortOrder);
        }

        return notes;
    }

    return {
        // nothing
    };
}(jQuery));


/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:		base Javascript
 ********************************************************************************************************/


// TODO variables should not be public!

var sortOrder = 0; // 0=Finish Date, 1=Creation Date, 2=Importance
var filterFinishedActive = false;

var notes = [
    {
        id: 1,
        creationDate: new Date(2016, 8, 20),
        title: "CAS FEE Selbststudium / Projekt-Aufgabe erledigen",
        description: "HTML für die Notes Application erstellen. CSS erstellen für die Notes Application...",
        severity: 1,
        dueDate: new Date(2016, 7, 17),
        finishedDate: new Date(2016, 8, 23) },
    {
        id: 2,
        creationDate: new Date(2016, 8, 22),
        title: "Einkaufen",
        description: "Butter<br>Eier<br>Brot<br>...",
        severity: 2,
        dueDate: new Date(2016, 9, 4),
        finishedDate: null },
    {
        id: 3,
        creationDate: new Date(2016, 8, 19),
        title: "Mami anrufen",
        description: "888 888 88 88...",
        severity: 3,
        dueDate: null,
        finishedDate: false },
];

var createNotesHtml;




/**
 * Run when page is ready.
 */
$(function() {
    // The checked-attribute on input tells with its presence (not its value) whether checkbox shall be selected or not.
    // Handlebars does not support that out of the box so we use following handler.
    // - see here: http://stackoverflow.com/questions/22794710/handlebars-conditionally-add-attribute
    // - unfortunately we cannot place JS code into the handlebar code -> helper here less generic
    Handlebars.registerHelper('checkedIfTrue', function (trueValue) {
        return trueValue ? 'checked' : '';
    });
    createNotesHtml = Handlebars.compile(document.getElementById("notes-template").innerText);

    // set listeners on menu buttons:

    var filterFinishedBtn = $("#filter-finished-btn");
    filterFinishedBtn.on("click", toggleFilterOnFinished);

    var sortByFinishDateBtn = $("#sort-by-finish-date-btn");
    sortByFinishDateBtn.on(  "click", { sortOrder: 0}, setSortOrder);
    var sortByCreationDateBtn = $("#sort-by-creation-date-btn");
    sortByCreationDateBtn.on("click", { sortOrder: 1}, setSortOrder);
    var sortByImportanceBtn = $("#sort-by-importance-btn");
    sortByImportanceBtn.on(  "click", { sortOrder: 2}, setSortOrder);
    updateSortOrderUi();

    // set listener on notes-container to listen for 'finished' actions:
    var notesContainerDiv = $("#notes-container");
    notesContainerDiv.on("click", function(event) {
        // console.log('click', event); // TODO
        var id = event.target.getAttribute("data-id");
        if (!id) {
            return;  // not clicked onto checkbox...
        }
        var note = seekNodeById(parseInt(id));
        if (note.finishedDate) {
            note.finishedDate = null;
        }
        else {
            note.finishedDate = new Date();
        }
        renderNotes(); // rerender to show updated finished-timestamp
    });

    renderNotes();
});

function renderNotes () {
    $("#notes-container").html(createNotesHtml(getNotes(), { data: {intl: { locales: 'de-CH'}}}));
}

function seekNodeById(id) {
    console.log('seekNodeById', id, ' typeof id=', typeof id);
    var _note = null;
    notes.forEach(function (note) {
        if (note.id === id) {
            _note = note;
        }
    });
    return _note;
}


function setSortOrder(event) {
    var sortNb = event.data.sortOrder;
    if (sortNb === sortOrder) {
        return; // avoid rerendering
    }
    sortOrder = sortNb;
    updateSortOrderUi();
}

function updateSortOrderUi() {
    // update UI:
    var sortByFinishDateBtn = $("#sort-by-finish-date-btn");
    sortOrder == 0 ? sortByFinishDateBtn.addClass("pf-btn-pressed") : sortByFinishDateBtn.removeClass("pf-btn-pressed");
    var sortByCreationDateBtn = $("#sort-by-creation-date-btn");
    sortOrder == 1 ? sortByCreationDateBtn.addClass("pf-btn-pressed") : sortByCreationDateBtn.removeClass("pf-btn-pressed");
    var sortByImportanceBtn = $("#sort-by-importance-btn");
    sortOrder == 2 ? sortByImportanceBtn.addClass("pf-btn-pressed") : sortByImportanceBtn.removeClass("pf-btn-pressed");
    renderNotes();
}

function getSortOrder() {
    return sortOrder;
}

function toggleFilterOnFinished() {
    setFilterOnFinishedActive(!filterFinishedActive);
}

function setFilterOnFinishedActive(active) {
    if (filterFinishedActive === active) {
        return; // avoid rerendering
    }
    $("#filter-finished-btn").toggleClass("pf-btn-pressed");

    filterFinishedActive = active;
    renderNotes();
}

function isFilterFinishedActive() {
    return filterFinishedActive;
}


function sortNotesByFinishDate(notes) {
    var compareByFinishDate = function compareNotes(s1, s2) {
        return s1.dueDate < s2.dueDate;
    }
    return notes.sort(compareByFinishDate);
}

function sortNotesByCreationDate(notes) {
    var compareByCreationDate = function compareNotes(s1, s2) {
        return s1.creationDate < s2.creationDate;
    }
    return notes.sort(compareByCreationDate);
}

function sortNotesByImportance(notes) {
    var compareByImportance = function compareNotes(s1, s2) {
        return s1.severity < s2.severity;
    }
    return notes.sort(compareByImportance);
}

/**
 *
 * @param filterOnFinishedActive If true only the finished notes are returned. If false <b>all notes</b> are returned.
 * @returns {*}
 */
function filterOnFinished(filterOnFinishedActive) {
    return filterOnFinishedActive ? notes.filter(function(note) { return !!note.finishedDate; } ) : notes;
}

function getNotes() {
    // console.log('getNotes', 'filterFinishedActive', filterFinishedActive, 'sortOrder', sortOrder);
    var _notes = filterOnFinished(filterFinishedActive);

    switch (sortOrder) {
        case 0:
            _notes = sortNotesByFinishDate(_notes);
            break;
        case 1:
            _notes = sortNotesByCreationDate(_notes);
            break;
        case 2:
            _notes = sortNotesByImportance(_notes);
            break;
        default:
            console.error("sortOrder out of range: ", sortOrder);
    }
    return _notes;
}




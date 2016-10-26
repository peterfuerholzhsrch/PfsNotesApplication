"use strict";
/**
 * Created by pfu on 26/10/16.
 */

var handleBars = (function($) {
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
    });

    return {
        // nothing
    };
}(jQuery));
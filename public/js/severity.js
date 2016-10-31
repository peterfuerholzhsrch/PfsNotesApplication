"use strict";
/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:		Javascript for severity "component"
 ********************************************************************************************************/


var severity = (function($) {

    /**
     *
     * @param enabled boolean
     * @param id element id (optional)
     */
    function privateCreateHtml(enabled, id) {
        var disabledStr = enabled ? '' : 'disabled';
        var idString = id ? " id='" + id + "'" : "";
        // button used for CGAG
        var template = '<div class="pf-severity"' + idString + '>'
            + '  <button class="pf-severity-cell" data-value="1" ' + disabledStr + '>*</button>'
            + '  <button class="pf-severity-cell" data-value="2" ' + disabledStr + '>*</button>'
            + '  <button class="pf-severity-cell" data-value="3" ' + disabledStr + '>*</button>'
            + '  <button class="pf-severity-cell" data-value="4" ' + disabledStr + '>*</button>'
            + '  <button class="pf-severity-cell" data-value="5" ' + disabledStr + '>*</button>'
            + '</div>';
        return template;
    }

    /**
     * Replaces an element (or multiple) defined by cssPath by the 'severity widget'.
     *
     * @param cssPath element(s) which inner content shall be replaced by the severity widget
     * @param setGetValue where the severity is to be set/read; accesses 'severity' property
     * @param editable true: severity widget is editable; otherwise read-only
     * @param id element id (optional)
     */
    function publicInstallSeverityWidgetOn(cssPath, setGetValue, editable, id) {
        var elements = $(cssPath);
        publicInstallSeverityWidgetOnEl(elements, setGetValue, editable, id);
    }

    /**
     * Replaces elements (typically only one) by the 'severity widget'.
     *
     * @param elements one or more jQuery elements
     * @param setGetValue setGetValue where the severity is to be set/read; accesses 'severity' property
     * @param editable true: severity widget is editable; otherwise read-only
     * @param id element id (optional)
     */
    function publicInstallSeverityWidgetOnEl(elements, setGetValue, editable, id) {
        elements.on("click", function (event) {
            event.preventDefault();
            var value = event.target.getAttribute("data-value");
            privateSetSeverity(elements, setGetValue, value, editable);
        });

        // render all severity-"components":
        elements.each(function (idx, element) {
            $(element).html(privateCreateHtml(editable, id));
            privateUpdateSeverity(elements, setGetValue.severity, editable);
        });

        // show bold when editable (must be done *after* element got rendered!)
        if (editable) {
            elements.find(".pf-severity-cell").hover(
                /*in*/
                function (event) {
                    $(event.target).addClass('pf-severity-cell-editable');
                },
                /*out*/
                function (event) {
                    $(event.target).removeClass('pf-severity-cell-editable');
                }
            )
        }
    }


    /**
     * @param id
     * @param value
     */
    function privateSetSeverity(elements, setGetValue, value) {
        if (setGetValue.severity === value) {
            return;
        }
        setGetValue.severity = value;
        privateUpdateSeverity(elements, value);
    }


    /**
     *
     * @param cssPath
     * @param value
     */
    function privateUpdateSeverity(elements, value, editable) {
        // update UI:
        var levelItems = elements.find(".pf-severity-cell");
        levelItems.each(function (idx, levelItem) {
            if (idx < value) {
                $(levelItem).addClass('pf-severity-marked');
            }
            else {
                $(levelItem).removeClass('pf-severity-marked');
            }
        });
    }

    return {
        installSeverityWidgetOn: publicInstallSeverityWidgetOn,
        installSeverityWidgetOnEl: publicInstallSeverityWidgetOnEl
    };
}(jQuery));

"use strict";
/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:		Javascript for severity "component"
 ********************************************************************************************************/


var severity = (function($) {

    var MIN_SEVERITY = 1;
    var MAX_SEVERITY = 5;


    function publicCheckSeverityRange(severity) {
        if (!severity || severity < MIN_SEVERITY || severity > MAX_SEVERITY) {
            throw new Error('severity value=' + severity + ' out of range: [' + MIN_SEVERITY +'..' + MAX_SEVERITY + ']');
        }
    }


    /**
     *
     * @param enabled boolean
     */
    function privateCreateHtml(enabled) {
        var disabledStr = enabled ? '' : 'disabled';
        // button used for CGAG
        var template = '<div class="pf-severity">'
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
     */
    function publicInstallSeverityWidgetOn(cssPath, setGetValue, editable) {
        var elements = $(cssPath);
        publicInstallSeverityWidgetOnEl(elements, setGetValue, editable);
    }

    /**
     * Replaces elements (typically only one) by the 'severity widget'.
     *
     * @param elements one or more jQuery elements
     * @param setGetValue setGetValue where the severity is to be set/read; accesses 'severity' property
     * @param editable true: severity widget is editable; otherwise read-only
     */
    function publicInstallSeverityWidgetOnEl(elements, setGetValue, editable) {
        elements.on("click", function (event) {
            event.preventDefault();
            //var id = event.delegateTarget.getAttribute("data-id");
            var value = event.target.getAttribute("data-value");
            privateSetSeverity(elements, setGetValue, value, editable);
        });

        // render all severity-"components":
        elements.each(function (idx, element) {
            $(element).html(privateCreateHtml(editable));
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
        // console.log('_updateSeverity: elements', elements, ' value', value);

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
        checkSeverityRange: publicCheckSeverityRange,
        installSeverityWidgetOn: publicInstallSeverityWidgetOn,
        installSeverityWidgetOnEl: publicInstallSeverityWidgetOnEl
    };
}(jQuery));
"use strict";
/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:	    Javascript for change styling. This code must be included in every HTML page supporting switchable
                styling. The stylesheet links must have a 'title'-attribute defined, e.g.:
 <code>
     <link rel="stylesheet"           type="text/css" title="style-bw"    href="css/bw.css">
     <link rel="alternate stylesheet" type="text/css" title="style-blues" href="css/blues.css">
 </code

 The current setting is saved in the localStorage object.
 ********************************************************************************************************/


(function($) {

    var STYLE_PERSISTENCE_KEY = "pf-style-persistence";


    /**
     * Run on startup
     */
    $(function() {
        var style = privateInitStyle();

        // register on style selector widget (if available):
        var styleSelector = document.querySelector("#styles-select");
        if (styleSelector) {
            styleSelector.addEventListener("change", function (event) {
                console.log("event.target.value=", event.target.value);
                privateSwitchStyle(event.target.value);
            });
            styleSelector.value = style; // UI shall reflect current value
        }
        // else: current document hasn't got a selector (e.g. edit.html)
    });


    /**
     * This function enables / disables the stylesheet of the current document according to set cssTitle.
     * @param cssTitle
     */
    function privateSwitchStyle(cssTitle)
    {
        // Following code bases on following template:
        //
        // You may use this script on your site free of charge provided
        // you do not remove this notice or the URL below. Script from
        // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
        var linkTags = document.getElementsByTagName("link");
        for (var i = 0; i < linkTags.length ; i++ ) {
            var linkTag = linkTags[i];
            if ((linkTag.rel.indexOf("stylesheet") >= 0) && linkTag.title) {
                linkTag.disabled = true;
                if (linkTag.title == cssTitle) {
                    linkTag.disabled = false;
                }
            }
        }
        privateSetStyleStorage(cssTitle);
    }


    /**
     * @returns initial style
     */
    function privateGetFirstAvailableStyle()
    {
        var linkTags = $('link[rel*="stylesheet"][title]');
        if (linkTags.length == 0) {
            throw new Error("The styling modul expects at least one stylesheet link with a title attribute set!");
        }
        return linkTags[0].title;
    }


    /**
     * @return string  current style (= locale storage value)
     */
    function privateInitStyle()
    {
        var cssTitle = privateGetStyleStorage();
        if (!cssTitle) {
            cssTitle = privateGetFirstAvailableStyle();
            privateSetStyleStorage(cssTitle);
        }
        privateSwitchStyle(cssTitle);
        return cssTitle;
    }


    /**
     * @return String Returns persistent style, null if not available.
     */
    function privateGetStyleStorage() {
        return localStorage.getItem(STYLE_PERSISTENCE_KEY);
    }

    function privateSetStyleStorage(style) {
        localStorage.setItem(STYLE_PERSISTENCE_KEY, style);
    }


    return {
        // nothing
    };
}(jQuery));
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
 ********************************************************************************************************/


(function($) {

    /**
     * Run on startup
     */
    $(function() {
        var styleSelector = document.querySelector("#styles-select");
        var style = privateSetStyleFromCookie();
        if (styleSelector) {
            styleSelector.addEventListener("change", privateSetStyle);
            styleSelector.value = style; // UI shall reflect current value
        }
        // else: current document hasn't got a selector (e.g. edit.hmtl)
    });

    function privateSetStyle(event) {
        console.log("event.target.value=", event.target.value);
        switchStyle(event.target.value);
    }


    /**
     * Following code is copied from http://www.thesitewizard.com/javascripts/change-style-sheets.shtml and updated
     * that the current setting is saved in localStorage instead of a cookie:
     * This code allows to switch dynamically a stylesheet.
     */

    /**
     * This function enables / disables the stylesheet of the current document according to set css_title.
     * @param css_title
     */
    function switchStyle ( css_title )
    {
        // You may use this script on your site free of charge provided
        // you do not remove this notice or the URL below. Script from
        // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml
        var i, link_tag ;
        for (i = 0, link_tag = document.getElementsByTagName("link") ;
             i < link_tag.length ; i++ ) {
            if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
                link_tag[i].title) {
                link_tag[i].disabled = true ;
                if (link_tag[i].title == css_title) {
                    link_tag[i].disabled = false ;
                }
            }

            notesService.setStyle(css_title);
        }
    }

    /**
     * @return current style (= cookie value)
     */
    function privateSetStyleFromCookie()
    {
        var css_title = notesService.getStyle();
        if (css_title && css_title.length) {
            switchStyle( css_title );
        }
        return css_title;
    }

    return {
        // nothing
    };
}(jQuery));
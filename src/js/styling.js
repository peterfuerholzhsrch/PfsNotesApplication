/********************************************************************************************************
 created by:    Peter Fuerholz
 project:		HSR CAS FEE
 date:			09/2016
 version:		0.1
 function:	    Javascript for change styling
 ********************************************************************************************************/

function setStyle(event) {
    console.log("event.target.value=", event.target.value); // TODO
    switch_style(event.target.value);
}

$(function() {
    var styleSelector = document.querySelector("#stylesSelect");
    styleSelector.addEventListener("change", setStyle);
    var style = set_style_from_cookie();
    styleSelector.value = style; // UI shall reflect current value
});



/**
 * Following code is copied almost 1:1 from http://www.thesitewizard.com/javascripts/change-style-sheets.shtml:
 * This code allows to switch dynamically a stylesheet.
 */

// *** TO BE CUSTOMISED ***

var style_cookie_name = "style" ;
var style_cookie_duration = 30 ; // days
var style_domain = "peterfuerholzhsrch.github.com" ;

// *** END OF CUSTOMISABLE SECTION ***
// You do not need to customise anything below this line

function switch_style ( css_title )
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
        set_cookie( style_cookie_name, css_title,
            style_cookie_duration, style_domain );
    }
}
/**
 * @return current style (= cookie value)
 */
function set_style_from_cookie()
{
    var css_title = get_cookie( style_cookie_name );
    if (css_title && css_title.length) {
        switch_style( css_title );
    }
    return css_title;
}
function set_cookie ( cookie_name, cookie_value,
                      lifespan_in_days, valid_domain )
{
    // console.log('set_cookie', cookie_name, cookie_value, lifespan_in_days, valid_domain);

    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var domain_string = valid_domain ? ("; domain=" + valid_domain) : '' ;

    var cookieString = cookie_name + "=" + encodeURIComponent( cookie_value );
    // commented out since Chrome does not set cookies on local server (http://stackoverflow.com/questions/8105135/cannot-set-cookies-in-javascript)
    // +
    //     "; max-age=" + 60 * 60 * 24 * lifespan_in_days +
    //     "; path=/" + domain_string;
    document.cookie = cookieString;
}
function get_cookie ( cookie_name )
{
    // http://www.thesitewizard.com/javascripts/cookies.shtml
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        // \s = whitespaces
        var cookie_value = cookie_string.match('(^|;)[\\s]*' + cookie_name + '=([^;]*)');
        // console.log('get_cookie, cookie_string="', cookie_string, '" cookie_value=', cookie_value); // TODO
        if (!cookie_value) {
            return null;
        }
        var value = decodeURIComponent ( cookie_value[cookie_value.length-1] ) ;

        // console.log('get_cookie', cookie_name, value);
        return value;
    }
    return '' ;
}

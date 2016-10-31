"use strict";
/**
 * Created by pfu on 27/10/16.
 *
 * Ajax helper method from HSR course. Bases on jQuery.
 */


;(function($) {

    function ajax(metod, url, data, headers) {

        var jqPromise = $.ajax({
            dataType: "json",
            contentType: "application/json",
            headers: headers,
            method: metod,
            url: url,
            data: data ? JSON.stringify(data) : undefined
        });

        // use JavaScript Promise (see https://developers.google.com/web/fundamentals/getting-started/primers/promises)
        return Promise.resolve(jqPromise);
    }
    window.ajax = { ajax : ajax };
}(jQuery));
"use strict";
/**
 * Created by pfu on 20/10/16.
 *
 * Input validation based on https://www.sitepoint.com/instant-validation/
 *
 * If you include this code it automatically listens to 'change' events and checks in this case if input / textarea
 * fields have a constraint defined and checks against them. You have to call validateField to check explicit fields.
 * Errors are shown by adding the style 'aria-invalid'.
 */

var validation = (function() {

    /**
     * Run when page is ready.
     */
    $(function() {
        privateAddEvent(document, 'change', function(e, target)
        {
            publicValidateField(target);
        });
    });


    function privateAddEvent(node, type, callback)
    {
        if(node.addEventListener)
        {
            node.addEventListener(type, function(e)
            {
                callback(e, e.target);

            }, false);
        }
        else if(node.attachEvent)
        {
            node.attachEvent('on' + type, function(e)
            {
                callback(e, e.srcElement);
            });
        }
    }

    function privateShouldBeValidated(field)
    {
        return (
            !(field.getAttribute('readonly') || field.readonly)
            &&
            !(field.getAttribute('disabled') || field.disabled)
            &&
            (field.getAttribute('pattern') || field.hasAttribute('required'))
        );
    }


    /**
     * @param field
     * @return false if field has error(s)
     */
    function publicValidateField(field)
    {
        if (privateShouldBeValidated(field))
        {
            var invalid =
                (
                    (field.hasAttribute('required') && !field.value)
                    ||
                    (
                        field.getAttribute('pattern')
                        &&
                        field.value
                        &&
                        !new RegExp(field.getAttribute('pattern')).test(field.value)
                    )
                );

            if(!invalid && field.getAttribute('aria-invalid'))
            {
                field.removeAttribute('aria-invalid');
            }
            else if(invalid && !field.getAttribute('aria-invalid'))
            {
                field.setAttribute('aria-invalid', 'true');
                return false;
            }
        }
        return true;
    }

    return {
        validateField : publicValidateField
    }
}(jQuery));
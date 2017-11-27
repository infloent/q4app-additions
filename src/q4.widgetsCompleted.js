/**
 * Adds the functioanlity to run a callback function when all the choosen <code>q4.widgets</code> have completed.
 * 
 * teest12345
 * 
 * @version 1.0.0
 * 
 * @class  q4.widgetsCompleted
 * @type {object}
 * @extends q4.defaults
 * @example
 * q4Defaults.widgetsCompleted({
 *       widgets: [{
 *           $element: $('.module-financial-quarter .module_container--inner'),
 *           events: "financialscomplete"
 *       }, {
 *           $element: $('.module-financial-year'),
 *           events: "financialscomplete"
 *       }],
 *       completed: function(events) {
 *           console.log(this);
 *           console.dir(events);
 *       }
 *  });
 *  
 */
$.extend(true, q4Defaults, /** @lends q4.widgetsCompleted */ {
    /**
     * Runs a callback function when all the choosen <code>q4.widgets</code> have completed.
     * 
     * @param [obj] {object}  object literal that will be used as an paramenter when calling <code>'widgetsCompleted'</code> method. 
     * <br><br>
     * This object has the following properties and methods:
     * @param [completed] {function} Callback f
     * @param [widgets] {array<objects>}  <br><br>Array of object containing two properties:
     * 
     * @param [$element] {element} Element on which a <code>q4.widget</code> was initialized
     * @param [events] {event} Name of the event triggered by the <code>q4.widget</code> when completed.
     * 
     */
    widgetsCompleted: function(obj) {
        var widgetsPromises = [];
        $.each(obj.widgets, function(i, widget) {
            var def = new $.Deferred();

            widget.$element.on(widget.events, function(event) {
                def.resolve(event);
            });

            widgetsPromises.push(def);
        });
        // apply widgetsPromises array as arguments to $.when method
        $.when.apply($, widgetsPromises).then(function() {
            //call 'completed' callback which will receive as a parameter the arguments array from '.then' calback function method 
            obj.completed(arguments);
        });
    }
});


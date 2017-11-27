/**
 * Adds functionality to set <code>'headerOffset'</code> based on multiple elements and resolution breakpoins.
 * 
 * @version 1.0.0
 * 
 * @class q4.getTopOffset
 * @type {object}
 * @extends q4.defaults
 * 
 * @example 
 * <script src="/files/js/q4.getTopOffset.1.0.0.min.js"></script>
 * <script>
 * var q4App = $.extend(true, q4Defaults, {
 *     options: {
 *         //these tow options below are available here since 'q4.getTopOffset' extends 'q4.defaults'
 *         
 *         // this array sould be set to all element that are fixed at the top to calculate the top scroll offset based on this elements.
 *         
 *         offsetTopElem: [$('.pane--header .pane_outer'), $('.pane--navigation .pane_outer')],
 *         
 *         // Because one of the offset element will be used as a mobile navigation on resolutions equal or less than 1023px this element will be hidden and not a fixed element anymore; and
 *         // Because on resolutions equal or less than 768px the remaining fixed element will not be fixed anymore, 'offsetTopBreakPoint' sould be set like in the example below:
 *         
 *         offsetTopBreakPoint: [{
 *             breakPoint: 1023,
 *             offsetTopElem: [$('.pane--header .pane_outer']
 *         },{
 *             breakPoint: 768,
 *             offsetTopElem: []
 *         }]
 *     },
 *     init: function() {
 *         var app = this,
 *             q4Options: this.options;
 *             
 *         
 *         app.setHeaderOffset();
 *         //...
 *         //default q4 inits found already in main scripts here below
 *         //...
 *     }
 * });
 * q4App.init();
 * </script>
 */

$.extend(true, q4Defaults, /** @lends q4.getTopOffset */ {
    options: {
        /**
         * Array of elements that will be used to set <code>'headerOffset'</code> with <code>'setHeaderOffset'</code> method.
         * @type {array<elements>}
         * @example
         *     offsetTopElem: [$('.pane--header'), $('.pane--banner')] // 'getTopOffset' will return the sum of these two elements heights.
         * @default [] //empty array for no offset top
         */
        offsetTopElem: [],
        /**
         * An array of objects containing two properties <code>'breakPoint'</code> and <code>'offsetTopElem'</code> that will be used to set <code>'headerOffset'</code> with <code>'setHeaderOffset'</code> method one ore more given breakpoint resolutions.
         * <br>
         * @type {array<object>}
         * @param [breakPoint] {number}
         * @param [offsetTopElem] {array<elements>}
         * @example
         * offsetTopBreakPoint: [{
         *     breakPoint: 1024,
         *     offsetTopElem: [$('.pane--header')] // 'getTopOffset' will return this element's height
         *   },{
         *     breakPoint: 768,
         *     offsetTopElem: [] //empty array for no offset top at resolutions below or equal tp 768px
         * }]
         * @default [] //empty array. In this case will calculte the offset only based on 'offsetTopElem'
         */
        offsetTopBreakPoint: [],
    },
    /**
     * Method that returns the top offset number based on <code>'offsetTopElem'</code> array and <code>'offsetTopBreakPoint'</code> array of objects.
     * <br><br>
     * This method also checks if the elements passed to the <code>'offsetTopElem</code>' array exists before calculating the offset. 
     * <br>
     * In this way <code>'offsetTopElem'</code>, <code>'offsetTopBreakPoint'</code>, <code>'setHeaderOffset'</code> can be initialized globally and will not throw an error if a sticky element it's not a global element and only shows on some pages.
     *
     * @type {function}
     * @param {array} [_offsetElem] If not set this methotd will use <code>'this.offsetTopElem'</code>
     * @param {array<object>} [_offsetBreakPoint] If not set this methotd will use <code>'this.offsetTopBreakPoint'</code>
     * 
     * @return number
     * 
     */
    getTopOffset: function(_offsetElem, _offsetBreakPoint) {
        var inst = this,
            windoWidth = $(window).width(),
            offsetElem = typeof _offsetElem !== "undefined" ? _offsetElem : inst.offsetTopElem,
            offsetBreakPoint = typeof _offsetBreakPoint !== "undefined" ? _offsetBreakPoint : inst.offsetTopBreakPoint,
            topOffsetScroll = 0;
        // calculate top offset from offsetTopElem:     
        // - if offsetTopBreakPoint is set and window width is greater the first break point 
        // - or if offsetTopBreakPoint is not set;
        if ((offsetBreakPoint.length && windoWidth > offsetBreakPoint[0].breakPoint) || !offsetBreakPoint.length) {
            if (offsetElem.length) {
                $.each(offsetElem, function(i, thisOffsetelem) {
                    topOffsetScroll += thisOffsetelem.length ? thisOffsetelem.outerHeight() : 0;
                });
            }
        }
        // calculate top offset from offsetTopBreakPoint.offsetTopElem:     
        // - if offsetTopBreakPoint is set and window width is smaller or equal with the first break point 
        else {
            $.each(offsetBreakPoint, function(i, thisBreakPoint) {
                var index = offsetBreakPoint.length - 1,
                    next = i + 1;

                // if there are more that 1 breakPoint in offsetTopBreakPoint
                // for the current breakPoint verify if the window width is smaller or equal than the next breakpoint 
                // and calculate top offset only if this is not true
                // to prevent calculation that will be overwritten.
                if (!(index > 0 && index > i && windoWidth <= offsetBreakPoint[next].breakPoint)) {
                    if ($(window).width() <= thisBreakPoint.breakPoint && thisBreakPoint.offsetTopElem.length) {
                        $.each(thisBreakPoint.offsetTopElem, function(j, thisOffsetelem) {
                            topOffsetScroll += thisOffsetelem.length ? thisOffsetelem.outerHeight() : 0;
                        });
                    }
                }
            });
        }
        return topOffsetScroll;
    },
    /**
     * Method that sets <a href="q4.defaults.html#option-headerOffset"><code>'headerOffset'</code></a> by calling on resize the <a href="q4.getTopOffset.html#method-getTopOffset"><code>'getTopOffset'</code></a> method.
     * <br><br>
     * This is useful for scripts that are using the <a href="q4.defaults.html#option-headerOffset"><code>'headerOffset'</code></a> option like the <a href="q4.defaults.html#method-scrollTo"><code>'scrollTo'</code></a> method from <a href="q4.defaults.html"><code>'q4.defaults.js'</code></a> that is used on other methods from <code>'q4.defaults.js'</code>.
     * 
     * @type {function}
     * @example 
     * initialization:
     * - this should be called first in  q4App.init method.
     * 
     * var q4App = $.extend(true, q4Defaults, {
     *     init: function() {
     *      var app = this;
     *      
     *      app.setHeaderOffset();
     *          
     *      //followed by default methods that comes from blank
     * 
     *      }
     *   });
     *  
     */
    setHeaderOffset: function() {
        var inst = this,
            q4Options = this.options;
        $(window).on('resize.headerOffset', function() {
            q4Options.headerOffset = inst.getTopOffset(q4Options.offsetTopElem, q4Options.offsetTopBreakPoint);
        }).trigger('resize.headerOffset');
    }
});
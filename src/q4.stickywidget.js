(function ($) {
    $.widget('q4.sec', $.q4.api, /** @lends q4.sec */ {
        options: {
            /**
                     * Element that will get sticky, with by having a <code>'js--sticky'</code> class added.
                     * 
                     * @type {element}
                     * 
                     * @example  $('.nav--main') 
                     * @example
                     * default styles for 'js-sitcky' class should be
                     * 
                     * .js-sitcky {
                     *     position: fixed;
                     *     left: 0;
                     *     right:0;
                     * }
                     * 
                     * 'top' property it is added dinamically by the script based on 'offsetTopElem' and 'offsetTopBreakPoint' options from below
                     * @default null
                     */
                    $stickyElem: null,
                    /**
                     * Functionality needs to be triggered by the position of a parent of <code>'$stickyElem'</code> that will remain in the place where the <code>'$stickyElem'</code> was before getting position fixed.
                     * <br><br>
                     * To prevent content jumps when <code>'$stickyElem'</code> gets position fixed, <code>'$stickyElemTrigger'</code> will have the height set to <code>'$stickyElem'</code>s height by the script.
                     * @type {element}
                     */
                    $stickyElemTrigger: null,
                    /**
                     * Sets a class that will be added tot the <code>'.layout'</code> element when the <code>'$stickyElem'</code> get's sticky.
                     * <br><br>
                     * Add this class if you need to change style of other elements on the page when the <code>'$stickyElem'</code> get's sticky.
                     * 
                     * @type {?string}
                     *
                     * @example "js--sticky-nav--main"
                     * @example "js--sticky-nav--secondary"
                     * 
                     * @default  null
                     */
                    layoutStickyActiveCls: null,
                    /**
                     * Break point at witch the sticky functionality will be disabled depending on the value <code>'stopStickySwitchCondition'</code>.
                     * @type {?number}
                     *
                     * @example 1024
                     *
                     * @default null
                     */
                    stopStickyBreakPoint: null,
                    /**
                     * For <code>'stopStickyBreakPoint'</code> to work this should be set to either <code>true</code> or <code>false</code>.
                     * 
                     * @type {?boolean}
                     *
                     * @example true 
                     * in this case sticky functionalilty will stop if window width it is equal or less than 'stopStickyBreakPoint'
                     * @example false 
                     * in this case sticky functionalilty will stop if window width greater than 'stopStickyBreakPoint'
                     * 
                     * @default null
                     */
                    stopStickySwitchCondition: null,
                    offsetTopElem: [],
                    offsetTopBreakPoint: [],
                    getTopOffset: generalOpt.getTopOffset,
                    afterSticky: function(event) {},
                    beforeSticky: function(event) {},
                    onStopSticky: function(event) {}
        }
})(jQuery);
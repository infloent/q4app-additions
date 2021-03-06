/**
 * Adds sticky element fucntionality.
 * 
 * @version 1.0.0
 * 
 * @class  q4.stickyOld
 *
 * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
 * 
 * @extends q4.defaults 
 *
 * @example  
 * <script src="/files/js/q4.getTopOffset.1.0.0.min.js"></script>
 * <script src="/files/js/q4.stickyOld.1.0.0.min.js"></script>
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
 *         app.setHeaderOffset();
 *         //...
 *         //default q4 inits found already in main scripts here in between
 *         //...
 *         
 *         //This sticky element has a top offset of zero because there is no other fixed element above it so 'offsetTopElem' and 'offsetTopBreakPoint' will not be set.
 *         
 *         app.sticky({
 *            $stickyElem: $('.pane--header .pane_outer'),
 *            $stickyElemTrigger: $('.pane--header'),
 *            layoutStickyActiveCls: 'js-sticky--pane-header' //optional; use if needed to style other elements on the page when this element get's fixed.
 *         });
 *         
 *         // Because there is already a fixed element above this navigation 'offsetTopElem' will be set to that element. There is no need to set 'offsetTopBreakPoint' because the offset element will not change when the resolution changes.
 *         // This sticky navigation will be used as a mobile navigation on resolutions equal or less than 1023px. 
 *         // In this case we set 'stopStickyBreakPoint: 1023' and 'stopStickySwitchCondition: true' to stop the sticky functionality so it no interfier with the mobile design of the navigation.
 *         
 *         app.sticky({
 *            $stickyElem: $('.pane--navigation .pane_outer'),
 *            $stickyElemTrigger: $('.pane--navigation'),
 *            layoutStickyActiveCls: 'js-sticky--pane-navigation', //optional; use if needed to style other elements on the page when this element get's fixed. 
 *            stopStickyBreakPoint: 1023, 
 *            stopStickySwitchCondition: true,
 *            offsetTopElem: [$('.pane--header .pane_outer')] 
 *         });
 *     }
 * });
 * q4App.init();
 * </script>
 */
$.extend(q4Defaults, /** @lends q4.stickyOld */ {
    /**
     * Use this method to add stiky functionality to an element.
     * 
     * @type {function} 
     * 
     * @param  {object} [options] Object of options used to initialize <code>'sticky'</code> method
     */
    sticky: function(settings) {

        var generalOpt = this.options,
            /** @lends q4.stickyOld.stickyOld */
            sticky = {
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
                },
                init: function(options) {
                    $.extend(this.options, options);
                    var inst = this;
                    inst._onScroll();
                    inst._onResize();
                },
                _onScroll: function() {
                    var inst = this;
                    $(window).on('scroll.navSticky', function(e) {
                        inst._addRemoveSticky(e);
                    }).trigger('scroll.navSticky');
                },
                _onResize: function() {
                    var inst = this,
                        o = inst.options;
                    $(window).on('resize.navSticky', function(e) {
                        inst._addRemoveSticky(e);
                        if (o.stopStickySwitchCondition === ($(window).width() <= o.stopStickyBreakPoint)) {
                            o.$stickyElem.removeClass('js--sticky').add(o.$stickyElemTrigger).removeAttr('style');
                            if (o.layoutStickyActiveCls) $('.layout').removeClass(o.layoutStickyActiveCls);
                            o.onStopSticky(e);
                        }
                    });
                },
                _addRemoveSticky: function(_event) {
                    var inst = this,
                        o = inst.options,
                        condition = o.stopStickySwitchCondition === ($(window).width() <= o.stopStickyBreakPoint);
                    if (!condition) {
                        var curentScroll = $(window).scrollTop(),
                            topOffset = o.getTopOffset();
                        stickyElemWrapper_offsetTop = o.$stickyElemTrigger.offset().top - topOffset;
                        o.$stickyElemTrigger.css('height', o.$stickyElem.outerHeight());
                        if (curentScroll > stickyElemWrapper_offsetTop) {
                            o.$stickyElem.addClass('js--sticky').css("top", topOffset + 'px');
                            if (o.layoutStickyActiveCls) $('.layout').addClass(o.layoutStickyActiveCls);
                            o.afterSticky(_event);
                        } else {
                            o.$stickyElem.removeClass('js--sticky').removeAttr('style');
                            if (o.layoutStickyActiveCls) $('.layout').removeClass(o.layoutStickyActiveCls);
                            o.beforeSticky(_event);
                        }
                    }
                }
            };
        sticky.init(settings);
    }
});


(function($) {
    /**
     * Adds sticky element fucntionality.
     * 
     * @version 1.0.0
     * 
     * @class  q4.stickyWidget
     *
     * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
     * 
     */
    $.widget('q4.stickyWidget', /** @lends q4.stickyWidget */ {
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
            stickyElem: null,
            /*
             * Functionality needs to be triggered by the position of a parent of <code>'stickyElem'</code> that will remain in the place where the <code>'stickyElem'</code> was before getting position fixed.
             * <br><br>
             * To prevent content jumps when <code>'stickyElem'</code> gets position fixed, <code>'$widget'</code> will have the height set to <code>'stickyElem'</code>s height by the script.
             * @type {string}
             */
            // $widget: null,
            /**
             * Sets a class that will be added tot the <code>'.layout'</code> element when the <code>'stickyElem'</code> get's sticky.
             * <br><br>
             * Add this class if you need to change style of other elements on the page when the <code>'stickyElem'</code> get's sticky.
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
            getTopOffset: q4Defaults.getTopOffset,
            onSticky: function(event) {},
            onUnSticky: function(event) {},
            afterSticky: function(event) {},
            beforeSticky: function(event) {},
            responsive: [{
                breakpoint: 1024,
                settings: {

                }
            }, {
                breakpoint: 768,
                settings: {

                }
            }]
        },
        _create: function() {
            var inst = this,
                o = inst.options;
            inst._globalVariables();

            // console.log(this);

            inst._stickyOnScroll();
            inst._stickyOnResize();

        },

        _init: function() {
            var inst = this,
                o = inst.options;
            inst.$window.trigger('scroll' + inst.eventNamespace);
            inst.$window.trigger('resize' + inst.eventNamespace);

        },
        _setOption: function(key, value) {
            var inst = this;

            inst._super();
            inst._stickyOnScroll();
            inst.$window.trigger('resize' + inst.eventNamespace);
            console.log('setOpt');
            console.log(this);

        },
        _destroy: function() {
            var inst = this;

            inst.$window.off(inst.eventNamespace);
            this.isStickyDisabled = false;
            inst._disableSticky();
            // base destroy
            inst._super();
        },

        /*
         *===== custom methods =====
         */
        _globalVariables: function() {
            var inst = this,
                o = inst.options;
            //create chached element to be used inside all widget's methods.
            this.$widgetElem = $(this.element);
            this.$stickyElem = o.stickyElem !== null ? $(stickyElem) : $("> *:first", this.element);
            this.$window = $(window);
            this.throttleDelay = 0;
            this.isSticky = false;
            this.isStickyDisabled = false;

        },

        _setOptionsResponsive: function() {
            var inst = this,
                o = inst.options;
            if (o.responsive &&
                o.responsive.length &&
                o.responsive !== null) {
                for (var i = 0; i <= o.responsive.length; i++) {

                }

            }
        },

        _stickyOnScroll: function() {
            var inst = this;

            inst.$window.on('scroll' + inst.eventNamespace, function(e) {
                //run '_addRemoveSticky' on 'scroll'

                inst._addRemoveSticky(e);
            });
        },

        _stickyOnResize: function() {
            var inst = this,
                o = inst.options;

            inst.$window.on('resize' + inst.eventNamespace, inst._throttle(function(e) {

                //run '_addRemoveSticky' on 'resize'
                inst._addRemoveSticky(e);

                // if stop condition is 'true' disable sticky functionality.
                if (o.stopStickySwitchCondition === (inst.$window.width() <= o.stopStickyBreakPoint)) {

                    inst._disableSticky();
                    inst.isStickyDisabled = true;

                }
                //if stop condition is 'false' add back the sticky functionality.
                else {
                    if (inst.isStickyDisabled) {
                        inst._stickyOnScroll();
                        inst.isStickyDisabled = false;

                    }
                }
            }, inst.throttleDelay));
        },

        _addRemoveSticky: function(_event) {
            var inst = this,
                o = inst.options,
                curentScroll = inst.$window.scrollTop(),
                topOffset = o.getTopOffset(),
                widgetElem_offsetTop = inst.$widgetElem.offset().top - topOffset,
                condition = o.stopStickySwitchCondition === (inst.$window.width() <= o.stopStickyBreakPoint);

            //add height to '$widgetElem' to prevent content jumps when "$stickyElem" will get fixed position.
            //height will be updated on 'scroll' and 'resize'
            if (!condition) {

                inst._setElemHeight();

                if (curentScroll > widgetElem_offsetTop) {

                    if (!inst.isSticky) inst._trigger("onSticky", _event);

                    inst._addSticky(topOffset);

                    // trigger 'stickyWidgetafterSticky' event on '$widgetElem'
                    inst._trigger("afterSticky", _event);

                } else {

                    if (inst.isSticky) inst._trigger("onUnSticky", _event);

                    inst._removeSticky();

                    // trigger 'stickyWidgetbeforeSticky' event '$widgetElem'
                    inst._trigger("beforeSticky", _event);

                }
            }
        },

        _setElemHeight: function() {
            this.$widgetElem.css('height', this.$stickyElem.outerHeight());
        },

        _addSticky: function(_topOffset) {
            var inst = this,
                o = inst.options;

            inst.$stickyElem.css("top", _topOffset + 'px');

            if (!inst.isSticky) {
                inst.isSticky = !inst.isSticky;
                inst.$stickyElem.addClass('js--sticky');
                if (o.layoutStickyActiveCls) $('.layout').addClass(o.layoutStickyActiveCls);
            }

        },

        _removeSticky: function() {
            var inst = this,
                o = inst.options;
            if (inst.isSticky) {
                inst.isSticky = !inst.isSticky;
                inst.$stickyElem.removeClass('js--sticky').removeAttr('style');
                if (o.layoutStickyActiveCls) $('.layout').removeClass(o.layoutStickyActiveCls);
            }

        },

        _disableSticky: function() {
            var inst = this,
                o = inst.options;
            if (!inst.isStickyDisabled) {
                inst.$window.off('scroll' + inst.eventNamespace);
                inst.$stickyElem.removeClass('js--sticky').add(inst.$widgetElem).removeAttr('style');
                if (o.layoutStickyActiveCls) $('.layout').removeClass(o.layoutStickyActiveCls);
            }

        },

        //when using repetive events like "scroll", "resize", "mousemove" etc to prevent the callback function to run too manny times and hitting the performance, a 'throttled' callback should be used.
        _throttle: function(fn, threshhold, scope) {
            threshhold || (threshhold = 250);
            var last,
                deferTimer;
            return function() {
                var context = scope || this;
                var now = +new Date,
                    args = arguments;
                if (last && now < last + threshhold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function() {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        }
    });
})(jQuery);


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
     * {@tutorial}.
     */
    /*
     * ====TO DO=====
     * -If there are images in the stickyElem set height after image load . done
     * 
     * -Manage to set the widget when options are changed.
     * 
     * -Implement the destroy method
     */
    $.widget('q4.stickyWidget', /** @lends q4.stickyWidget */ {
        options: {
            version: "1.0.0",
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
            // 
            layoutElem: '.layout',
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
             * Break point at witch the sticky functionality will be disabled depending on the value <code>'disableStickySwitchCondition'</code>.
             * @type {?number}
             *
             * @example 1024
             *
             * @default null
             */
            disableStickyBreakPoint: null,
            /**
             * For <code>'disableStickyBreakPoint'</code> to work this should be set to either <code>true</code> or <code>false</code>.
             * 
             * @type {?boolean}
             *
             * @example true 
             * in this case sticky functionalilty will stop if window width it is equal or less than 'disableStickyBreakPoint'
             * @example false 
             * in this case sticky functionalilty will stop if window width greater than 'disableStickyBreakPoint'
             * 
             * @default null
             */
            disableStickySwitchCondition: null,
            offsetTopElem: [],
            offsetTopBreakPoint: [],
            getTopOffset: q4Defaults.getTopOffset,
            onSticky: function(event) {},
            onUnSticky: function(event) {},
            afterSticky: function(event) {},
            beforeSticky: function(event) {},
            disabled: false,
            classes: {
                "js--sticky": "js--sticky-nav"
            }
        },

        /*============== build in methods ===============*/

        _create: function() {
            this._widgetVariables();
            if (!('disabled' in this.options) || (('disabled' in this.options) && !(this.options.disabled === true))) {
                this._stickyOnScroll();
                this._stickyOnResize();
            }
        },

        _init: function() {
            this._enableDisableSticky();
        },

        _setOption: function(key, value) {
            if (key === 'disabled') {
                var prevDisabledVal = this.option('disabled');
                if (value === true && prevDisabledVal === false) {
                    this.isStickyDisabled = false;
                    this._removeStickyOnResize();
                    this._disableSticky();
                } else if (value === false && prevDisabledVal === true) {
                    this.isStickyDisabled = true;
                    this._stickyOnResize();
                    this._enableDisableSticky();
                    this._addRemoveSticky();
                }
            }
            this._super(key, value);
        },

        _destroy: function() {

            //this.disableSticky();
            // base destroy
            this._super();
            this._removeWidgetElemHeight();
            this.removeSticky();
            if ($('.js_sticky-appended', this.element).length) {
                $('.js_sticky-appended', this.element).children().unwrap();
            }
        },

        /*=============== custom methods ================*/

        _setStickyElem: function() {
            var stickyElem;

            if (this.element.children().length === 1 && this.options.stickyElem === null) {

                stickyElem = this.element.children().first();

            } else if (this.element.children().length === 0 || this.options.stickyElem === "append") {

                stickyElem = this.element.wrapInner('<div class="js_sticky-appended"></div>').children().first();

            } else if ((typeof this.options.stickyElem === "string") && (this.options.stickyElem !== "append")) {

                stickyElem = $("> " + this.options.stickyElem, this.element);

            } else {
                throw new Error('"stickyElem" options not corectely set');
            }

            this._addClass(stickyElem, 'js_sticky-elem');

            return stickyElem;

        },

        _widgetVariables: function() {
            //create chached element to be used inside all widget's methods.
            this.$layout = $(this.options.layoutElem);
            this.$stickyElem = this._setStickyElem();
            this.throttleDelay = 0;
            this.isSticky = false;
            this.isStickyDisabled = false;
        },
        // not needed
        _setOptionsResponsive: function() {

            if (this.options.responsive &&
                this.options.responsive.length &&
                this.options.responsive !== null) {
                for (var i = 0; i <= this.options.responsive.length; i++) {

                }
            }
        },

        disableCondititon: function() {
            return this.options.disableStickySwitchCondition === (this.window.width() <= this.options.disableStickyBreakPoint);
        },

        topOffset: function() {
            return this.options.getTopOffset();
        },

        _setStickyElemHeightToWidgetElem: function(e) {

            //add "$stickyElem" height to 'this.element' to prevent content jumps when "$stickyElem" will get fixed position.
            this.element.css('height', this.$stickyElem.outerHeight());
        },

        _setWidgetElemHeight: function() {
            var $visibleImgs = $("img:visible", this.element);

            this._setStickyElemHeightToWidgetElem();

            //if there are visible images in the element update height on image load.
            if ($visibleImgs.length) {

                this._on($visibleImgs, {
                    load: "_setStickyElemHeightToWidgetElem"
                });
            }
        },
        _removeWidgetElemHeight: function() {
            this.element.css('height', '');
        },

        addSticky: function() {

            //add top position here to update even when the element it's already sticky if the 'offset' top changes.
            this.$stickyElem.css("top", this.topOffset() + 'px');

            //no need to run this after gets sticky
            if (!this.isSticky) {
                this.isSticky = !this.isSticky;

                this._addClass(this.$stickyElem, 'js--sticky');
                if (this.options.layoutStickyActiveCls) this._addClass(this.$layout, this.options.layoutStickyActiveCls);
            }

        },

        removeSticky: function() {

            //no need to run this after sticky was removed
            if (this.isSticky) {
                this.isSticky = !this.isSticky;

                this._removeClass(this.$stickyElem.css('top', ''), 'js--sticky');

                if (this.options.layoutStickyActiveCls) this._removeClass(this.$layout, this.options.layoutStickyActiveCls);
            }

        },

        _addRemoveSticky: function(_event) {

            var curentScroll = this.window.scrollTop(),
                widgetElem_offsetTop = this.element.offset().top - this.topOffset();

            if (!this.disableCondititon()) {
                console.log("addrenove" + this.eventNamespace);
                //height will be updated on 'scroll' and 'resize'
                this._setWidgetElemHeight();

                if (curentScroll > widgetElem_offsetTop) {

                    // TRIGGER 'stickyWidgetonSticky' event on 'this.element'
                    if (!this.isSticky) this._trigger("onSticky", _event);

                    this.addSticky();

                    // TRIGGER 'stickyWidgetafterSticky' event on 'this.element'
                    this._trigger("afterSticky", _event);

                } else {

                    // TRIGGER 'stickyWidgetonUnSticky' event on 'this.element'
                    if (this.isSticky) this._trigger("onUnSticky", _event);

                    this.removeSticky();

                    // TRIGGER 'stickyWidgetbeforeSticky' event on 'this.element'
                    this._trigger("beforeSticky", _event);

                }
            }
        },

        //run '_addRemoveSticky' on 'scroll'
        _stickyOnScroll: function() {
            /*
             * Use the build in '._on()' method for automatic event unbind on 'destroy'. 
             * Inside the event callbacks 'this' points to the 'widget' not the 'element' on which the 'event' was called on.
             * The element on which the 'event' was called on can be accessed with the 'target' property from the 'event' object passed to the callback 
             */

            this._on(this.window, {
                scroll: "_addRemoveSticky"
            });
        },
        _removeStickyOnScroll: function() {
            this._off(this.window, 'scroll');
        },

        _disableSticky: function() {
            if (!this.isStickyDisabled) {

                this.isStickyDisabled = !this.isStickyDisabled;
                this._removeStickyOnScroll();
                this._removeWidgetElemHeight();
                this.removeSticky();
            }
        },

        _enableSticky: function() {
            if (this.isStickyDisabled) {

                this._stickyOnScroll();
                this.isStickyDisabled = !this.isStickyDisabled;

            }
        },

        _enableDisableSticky: function(_event) {

            // if 'disableCondititon' is 'true' disable sticky functionality.
            if (this.disableCondititon()) {

                this._disableSticky(true);
            }
            //if 'disableCondititon' is 'false' add back the sticky functionality.
            else {

                this._enableSticky(true);
            }
        },
        //run sticky on 'resize'
        _stickyOnResize: function() {

            this._on(this.window, {
                resize: this._throttle(function(e) {

                    this._addRemoveSticky(e);
                    this._enableDisableSticky(e);

                }, this.throttleDelay)
            });

        },
        _removeStickyOnResize: function() {
            this._off(this.window, 'resize');
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


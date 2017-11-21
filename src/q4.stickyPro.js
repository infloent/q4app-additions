(function($) {
    /**
     * Adds sticky element functionality.
     * 
     * @version 0.1.0
     * 
     * @class  q4.stickyPro
     * @extends q4.sticky
     * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
     * @requires   [q4.sticky.js](q4.sticky.html) 
     * 
     * {@tutorial}.
     */
    /*
     * ====TO DO=====
     * 
     * 
     */

    $.widget('q4.stickyPro', $.q4.sticky, /** @lends q4.stickyPro */ {
        options: {
            showHide: false,
            stickyClass: "js--sticky-pro-active",
            triggerOffsetElemHeightAddSticky: null,
            triggerOffsetElemHeightRemoveSticky: null,
            stickyOptions: {
                stickyClass: "js--sticky",
                layoutStickyActiveClass: null,
                triggerOffsetAddSticky: 0,
                triggerOffsetRemoveSticky: 0,
                triggerOffsetElemHeightAddSticky: null,
                triggerOffsetElemHeightRemoveSticky: null,
                positionOffsetElemHeight: null,
                classes: {
                    "js--sticky": "js--sticky--pro"
                },
            }
        },
        _create: function() {
            var optionss = this.options,
                optionsSticky = this.options.stickyOptions;
            this.element.sticky(optionss);
            this.element.sticky('option', optionsSticky);

            this._super();
        },
        //extend base method to react depending on option values.
        _setOption: function(key, value) {
            // react to changes of 'disabled' option
            if (key === 'disabled') {
                var prevDisabledVal = this.option('disabled');
                // if the value that will be set is 'true' and the previous value was 'false' run disable functionality. 
                // if the previous value already 'true' means it's already disabled
                if (value === true && prevDisabledVal === false) {
                    this.element.sticky('disable');

                }
                // if the value that will be set is 'false' and the previous value was 'true' run enable functionality. 
                // if the previous value already 'false' means it's already enabled
                else if (value === false && prevDisabledVal === true) {
                    this.element.sticky('enable');
                }
            }
            //run the base functionality to set the options.
            this._super(key, value);
        },
        _destroy: function() {
            this.element.sticky("destroy");
            this._super();
        },
        //remove base functionality
        _setWidgetElemHeight: function() {},
        _setStickyElemPosition: function() {},
        _removeStickyElemPosition: function() {},
        //end remove base functionality

        lastScrollTop: 0,

        _showHide: function(_event) {
            if (this.window.scrollTop() <= this.lastScrollTop) {
                this.addSticky(_event);
            } else {
                this.removeSticky(_event);
            }

            this.lastScrollTop = this.currentScroll();
        },

        // adds or removes the sticky state based on a sticky condition
        _addRemoveSticky: function(_event) {

            if (!this.disableCondititon()) {

                //height will be updated on 'scroll' and 'resize'
                this._setWidgetElemHeight();

                if (this.addCondition()) {
                    if (this.options.showHide) {

                        this._showHide();

                    } else this.addSticky(_event);
                } else if (this.removeCondition()) {

                    console.log(this.removeCondition());
                    this.removeSticky(_event);

                }
            }
        },
    });
    /**
     * Adds sticky element functionality with a slide down effect and show/hide  on scrool up/down.
     * 
     * @class  q4.stickySlide
     * @extends q4.stickyPro
     * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
     * @requires   [q4.sticky.js](q4.sticky.html) 
     * 
     */
    $.widget('q4.stickySlide', $.q4.stickyPro, /** @lends q4.stickySlide */ {
        options: {
            showHide: false,
            triggerOffsetAddSticky: -200,
            triggerOffsetRemoveSticky: -200,
            stickyClass: "js--slide-active",
            triggerOffsetElemHeightAddSticky: "negative",
            triggerOffsetElemHeightRemoveSticky: "negative",
            stickyOptions: {
                stickyClass: "js--sticky",
                layoutStickyActiveClass: null,
                triggerOffsetAddSticky: 0,
                triggerOffsetRemoveSticky: 0,
                triggerOffsetElemHeightAddSticky: "negative",
                triggerOffsetElemHeightRemoveSticky: "negative",
                positionOffsetElemHeight: "negative",
                classes: {
                    "js--sticky": "js--slide"
                },
            }
        }
    });
    /**
     * Adds sticky element functionality with a slide down effect and show/hide  on scrool up/down.
     * 
     * @class  q4.stickySlideIn
     * @extends q4.stickyPro
     * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
     * @requires   [q4.sticky.js](q4.sticky.html) 
     * 
     */
    $.widget('q4.stickySlideIn', $.q4.stickyPro, /** @lends q4.stickySlideIn */ {
        options: {
            showHide: false,
            triggerOffsetAddSticky: -200,
            triggerOffsetRemoveSticky: 0,
            stickyClass: "js--slide-active",
            triggerOffsetElemHeightAddSticky: "negative",
            stickyOptions: {
                stickyClass: "js--sticky",
                layoutStickyActiveClass: null,
                triggerOffsetAddSticky: 0,
                triggerOffsetRemoveSticky: 0,
                triggerOffsetElemHeightAddSticky: "negative",
                positionOffsetElemHeight: "negative",
                classes: {
                    "js--sticky": "js--slide"
                },
            }
        }
    });
    /**
     * Adds sticky element functionality with a slide down effect and show/hide  on scrool up/down.
     * 
     * @class  q4.stickyShowHide
     * @extends q4.stickyPro
     * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
     * @requires   [q4.sticky.js](q4.sticky.html) 
     * 
     */
    $.widget('q4.stickyShowHide', $.q4.stickyPro, /** @lends q4.stickyShowHide */ {
        options: {
            showHide: true,
            triggerOffsetAddSticky: -200,
            triggerOffsetRemoveSticky: 0,
            stickyClass: "js--slide-active",
            triggerOffsetElemHeightAddSticky: "negative",
            stickyOptions: {
                stickyClass: "js--sticky",
                layoutStickyActiveClass: null,
                triggerOffsetAddSticky: 0,
                triggerOffsetRemoveSticky: 0,
                triggerOffsetElemHeightAddSticky: "negative",
                positionOffsetElemHeight: "negative",
                classes: {
                    "js--sticky": "js--slide"
                },
            }
        }
    });
})(jQuery);


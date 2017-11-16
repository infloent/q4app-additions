(function($) {
    /**
     * Adds sticky element functionality with a slide down effect and show/hide  on scrool up/down.
     * 
     * @version 1.0.0
     * 
     * @class  q4.stickySlide
     * @extends q4.stickyWidget
     * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
     * 
     * {@tutorial}.
     */
    /*
     * ====TO DO=====
     * 
     * 
     */

    $.widget('q4.stickySlide', $.q4.stickyWidget, /** @lends q4.stickySlide */ {
        options: {
            showHide: false,
            triggerOffset: -200,
            stickyClass: "js--slide-active",
            triggerOffsetElemHeightAddSticky: "negative",
            triggerOffsetElemHeightRemoveSticky: "negative",
            stickyOptions: {
                showHide: false,
                stickyClass: "js--sticky",
                layoutStickyActiveClass: null,
                triggerOffset: 0,
                triggerOffsetElemHeightAddSticky: "negative",
                triggerOffsetElemHeightRemoveSticky: "negative",
                positionOffsetElemHeight: "negative",
                classes: {
                    "js--sticky": "js--slide"
                },
            }
        },
        _create: function() {
            var optionss = this.options,
                optionsSticky = this.options.stickyOptions;
            this.element.stickyWidget(optionss);
            this.element.stickyWidget('option', optionsSticky);

            this._super();
        },
        //extent base method to react dependion on option values.
        _setOption: function(key, value) {
            // react to changes of 'disabled' option
            if (key === 'disabled') {
                var prevDisabledVal = this.option('disabled');
                // if the value that will be set is 'true' and the previous value was 'false' run disable functionality. 
                // if the previous value already 'true' means it's already disabled
                if (value === true && prevDisabledVal === false) {
                    this.element.stickyWidget('disable');

                }
                // if the value that will be set is 'false' and the previous value was 'true' run enable functionality. 
                // if the previous value already 'false' means it's already enabled
                else if (value === false && prevDisabledVal === true) {
                    this.element.stickyWidget('enable');
                }
            }
            //run the base functionality to set the options.
            this._super(key, value);
        },
        _destroy: function() {
            this.element.stickyWidget("destroy");
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

            this.lastScrollTop = this.window.scrollTop();
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
})(jQuery);

/**
 * Adds scroll to section functionality for navigations.
 *  
 * @version 1.0.0
 * 
 * @class q4.scrollToSection
 * 
 * @requires   [q4.getTopOffset.js](q4.getTopOffset.html) 
 * 
 * @extends q4.defaults
 * 
 * @example  
 * <script src="/files/js/q4.getTopOffset.1.0.0.min.js"></script>
 * <script src="/files/js/q4.scrollToSection.1.0.0.min.js"></script>
 * <script>
 * var q4App = $.extend(true, q4Defaults, {
 *     options: {
 *         //these tow options are available here since 'q4.getTopOffset' extends 'q4.defaults'
 *         offsetTopElem: [$('.pane--navigation .pane_outer')],
 *         offsetTopBreakPoint: [{
 *             breakPoint: 1023,
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
 *         app.scrollToSection({
 *            menu: '.nav--main',
 *            level: '.level2',
 *            sectionClass: '.js__section--',
 *            hrefId: '#section=',
 *            scrollOnLoad: true,
 *            updateHrefHash: true,
 *            addActiveClass: true,
 *            closeMobileNav: true,
 *            offsetTopElem: q4Options.offsetTopElem,
 *            offsetTopBreakPoint: q4Options.offsetTopBreakPoint
 *         });
 *     }
 * });
 * q4App.init();
 * </script>
 */
$.extend(true, q4Defaults, /** @lends q4.scrollToSection */ {
    /**
     * Use this method to add scroll to section functionality to a navigation.
     * 
     * @type {function} 
     * 
     * @param  {object} [options] Object of options used to initialize <code>'scrollToSection'</code> method
     */
    scrollToSection: function(options) {
        var q4Options = this.options;
        //add this property as a global options to q4.defaults
        q4Options.prevent_make_section_active = false;

        /** @lends q4.scrollToSection.scrollToSection */
        var scrollToSection = {
            options: {
                /**
                 * Navigation element class.<br>
                 * If there are more navigation that use the same page sections for scroll and all the other options will be the same they can be intialize all at oance.
                 * 
                 * @type {?string}
                 * 
                 * @example ".nav--main"
                 * @example ".nav--main, .nav--secondary, .nav--mobile"
                 * 
                 * @default null
                 */
                menu: null,
                /**
                 * Level class at which the scroll links will be displayed.<br>
                 * This is used to limit the script to check only the link from the selected link's child level.
                 * 
                 * @type {?string}
                 * 
                 * @default null
                 */
                level: null,
                /**
                 * Element common in all the section that will get focused after the scroll to active section finishes. This is <code>required</code> for <code>accesibility</code>.
                 * <br><br>
                 * This should be one of the top most element in the section, no other focusable elemenet should exist above <code>'sectionFocusElem'</code> in the section.
                 * @type {string}
                 *
                 * @default
                 */
                sectionFocusElem: '.module_title',
                /**
                 * 
                 * Page section should have BEM like css class from a <code>module(general)</code> part and a <code>modifier(unique)</code>.<br>
                 * These classes can start with a <code>'js_'</code> prefix to point out that they will be used by a <code>JavaScript</code>.
                 * <pre>
                 * Example: 
                 * js_scroll-section--intro
                 * js_scroll-section--events
                 * js_scroll-section--news
                 * </pre>
                 * 
                 * <sup>*</sup>Particular case:<br>
                 * If a section has it's own scroll navigation with subsections this option should be unique for each subsections group and so on.<br>
                 * And <code>'scrollToSection'</code> should be initialized for each of these sections navigation.
                 * <pre>
                 * Example:
                 * js_scroll-sectionintro--about
                 * js_scroll-sectionintro--why-invest
                 * js_scroll-sectionintro--legal
                 * </pre>
                 * <br>
                 * This option should be set with the <code>module(general)</code> part of the css class and <code>include</code> the modifier delimiter hence the <code>two hyphens</code>.
                 * @example "js_scroll-section--"
                 * @example "js_scroll-sectionintro--"
                 * 
                 * @type {string} 
                 * 
                 * @default null
                 */
                sectionClass: null,
                /**
                 * Each navigation link that will scroll to a section needs to have an <code>href id</code> at the end formed from a <code>general part</code> and a <code>unique one</code>.
                 * <pre>
                 * Example:
                 * /events/default.aspx#section=intro
                 * /events/default.aspx#section=events
                 * /events/default.aspx#section=news
                 * </pre>
                 *
                 * <sup>*</sup>Particular case:<br>
                 * If a section has a it's own scroll navigation with subsections this option should be unique for each subsections group and so on.<br>
                 * And <code>'scrollToSection'</code> should be initialized for each of these sections navigation.
                 * <pre>
                 * Example:
                 * /home/default.aspx#sectionintro=about
                 * /home/default.aspx#sectionintro=why-invest
                 * /home/default.aspx#sectionintro=legal
                 * </pre>
                 * 
                 * @example "#section="
                 * @example "#sectionintro="
                 * 
                 * @type {?string}
                 * 
                 * @default null
                 */
                hrefId: null,
                /**
                 * Set scroll speed. By default it inherits the default <code>'scrollSpeed'</code> from <code>'q4.defaults'</code>.
                 * <br><br>
                 * Either change the default <code>'scrollSpeed'</code> from <code>'q4.defaults'</code> to affect all scroll animation using this setting or set this on initialization to a different number.
                 * 
                 * @type {number}
                 * 
                 * @default q4Options.scrollSpeed //q4Options points to general options from q4.defaults
                 */
                scrollSpeed: q4Options.scrollSpeed,
                /**
                 * Activates scroll to section on page load when a link has a <code>hrefId</code> pointing to a section.
                 * <br><br>
                 * 
                 * <sup>*</sup>Particular case:
                 * <br>
                 * If there are more initializations of <code>'scrollToSection'</code> for the same sections with this option set to <code>'true'</code> only the <code>first initalization</code> will actualy <code>run</code> this functionality to <code>prevent conflicts</code>.
                 * 
                 * @type {Boolean}
                 * 
                 * @default 
                 */
                scrollOnLoad: false,
                /**
                 * Adds the complete <code>'hredId'</code> to the window href when scroll links are clicked and dynamically on scroll for the current section in view port that's most near the top.
                 * <br><br>
                 * 
                 * This is useful to share links that point to a section.
                 * <br><br> 
                 * 
                 * <sup>*</sup>Particular case:
                 * <br>
                 * If there are more initializations of <code>'scrollToSection'</code> for the same sections with this option set to <code>'true'</code> only the <code>first initalization</code> will actualy <code>run</code> this functionality on scroll to <code>prevent conflicts</code>.
                 * 
                 * @type {Boolean}
                 * 
                 * @default 
                 */
                updateHrefHash: false,
                /**
                 * With this set to <code>'true'</code> a <code>'js--active'</code> class will be added on the currently clicked scroll link, also the class will pe dinamically added on scroll for the section that it's top most closer to the top of the window. 
                 * 
                 * @type {Boolean}
                 */
                addActiveClass: false,
                /**
                 *  <sup>*</sup> not implemented
                 * @type {Boolean}
                 */
                addScrollEvent: false,
                /**
                 * A way to add a number offset at which the scroll will stop from the top.
                 * <br>
                 * This can be either <code>positive</code> or <code>negative</code> number.
                 * 
                 * @type {Number}
                 */
                scrollSectionOffset: 0,
                /**
                 * Array of elements that will be used to set scroll offset with <code>'getTopOffset'</code> option.
                 * <br><br>
                 * 
                 * An option with the same name it's also available in the options from <code>'q4.getTopOffset.js'</code>.
                 * <br>
                 * <sup>*</sup>If the value of <code>'offsetTopElem'</code> for the current initialization matches the one in the general options then it should point to the general option. <a href="#examples">See example at top of the page.</a> 
                 * 
                 * @type {array<elements>}
                 * 
                 * @example
                 * offsetTopElem: [$('.pane--header'), $('.pane--banner')] // 'getTopOffset' will return the sum of these two elements heights.
                 *     
                 * @default [] //empty array for no offset top
                 */
                offsetTopElem: [],
                /**
                 * An array of objects containing two properties <code>'breakPoint'</code> and <code>'offsetTopElem'</code> the will be used to set set scroll offset with <code>'getTopOffset'</code> option, on one or more given breakpoint resolutions.
                 * <br><br>
                 * 
                 * An option with the same name it's also available in the options from <code>'q4.getTopOffset.js'</code>.
                 * <br>
                 * <sup>*</sup>If the value of <code>'offsetTopBreakPoint'</code> for the current initialization matches the one in the general options then it should point to the general option. <a href="#examples">See example at top of the page.</a> 
                 *
                 * @type {array<object>}
                 * 
                 * @param [breakPoint] {number}
                 * @param [offsetTopElem] {array<elements>}
                 * 
                 * @example
                 * offsetTopBreakPoint: [{
                 *     breakPoint: 1024,
                 *     offsetTopElem: [$('.pane--header')] // 'getTopOffset' will return this element's height
                 *   },{
                 *     breakPoint: 768,
                 *     offsetTopElem: [] //empty array for no offset top at resolutions below or equal tp 768px
                 * }]
                 * 
                 * @default [] //empty array. In this case will calculte the offset only based on 'offsetTopElem'
                 */
                offsetTopBreakPoint: [],
                /**
                 * This option points to the method with the same name from <code>'q4.getTopOffset.js'</code> and inheriths it's fucntionality. <a href="q4.getTopOffset.html#method-getTopOffset">Click here for more details</a>
                 * <br><br>
                 * 
                 * This has no parameters set on init so it will use the local options <code>'offsetTopElem'</code> and <code>'offsetTopBreakPoint'</code>.
                 * <br><br>
                 * 
                 * <sup>*</sup>Particular case:
                 * <br>
                 * If for some reason the <code>default implementation</code> of this method it's not enought, it can be <code>completely rewriten</code> on initialization.
                 * 
                 * @type {function}
                 * 
                 * @param {array} [_offsetElem] If not set this methotd will use <code>'this.offsetTopElem'</code>
                 * @param {array<object>} [_offsetBreakPoint] If not set this methotd will use <code>'this.offsetTopBreakPoint'</code>
                 * 
                 * @return number
                 */
                getTopOffset: this.getTopOffset,
                /**
                 * Adds the ability to trigger the <code>'js--active'</code> class on scroll sooner or later that it would by default.
                 * <br>
                 * This cand be either <code>positive</code> or <code>negative</code> number.
                 *  
                 * @type {number}
                 * 
                 * @default
                 */
                addActiveClassScrollTolerance: 0,
                /**
                 * Activates the functionality from <code>'onClosePopup'</code> that by default will close the mobile navigation when a scroll link it's clicked.
                 * <br><br>
                 *
                 * By default the mobile nav it's opened by adding a <code>'js--mobile'</code> class to the <code>'.layout'</code> element.
                 * <br><br>
                 * For other pop-ups to close with this default functionality, build them in the same way by adding a class to the <code>'.layout'</code> element.
                 * <br>
                 * e.g. a search pop-up should be opend with a <code>'js--search'</code> class added to the <code>'.layout'</code> element.
                 * 
                 * @type {Boolean}
                 * 
                 * @default
                 */
                closePopup: false,
                /**
                 * Class that will be removed with <code>'onClosePopup'</code> method from the <code>'.layout'</code> element.
                 * <br>
                 * You can pass more classes separated by a space to this option.
                 *  
                 * @type {String}
                 *
                 * @example "js--mobile js--search js--custompopup" 
                 * if one or more of these classes are found on the '.layout' element they will be removed when a scroll link it is clicked
                 * 
                 * @default
                 */
                popupShowingClass: 'js--mobile',
                /**
                 * When <code>'closePopup'</code> it's <code>'true'</code> removes the classes passed to <code>'popupShowingClass'</code> option.
                 * <br><br>
                 *
                 * <sup>*</sup>Particular case:
                 * <br>
                 * If for some reason a custom popup was not implemented in the default way an can not be close with the defualt <code>'onClosePopup'</code> functionality, more functionality cand be added on initialization by rewriting this method.
                 * @type {function}
                 * 
                 */
                onClosePopup: function() {
                    $('.layout').removeClass(this.popupShowingClass);
                },
                /**
                 * This callback will run when a scroll navigation link is clicked.
                 * 
                 * @param  [event] {event} The triggering event of this function
                 * @param  [data] {object}  Object containg the data available to use in this function to extend or add functionality.
                 * <br><br><br>
                 * 
                 * The following paramenters are the properties available in the 'data' object:
                 * @param [$selectedLevelItemsLinks] {element}
                 * @param [$clickedLink] {element}
                 * @param [$sectionSelected] {element}
                 * @param [sectionSpecificCls] {string}
                 * 
                 */
                onClick: function(event, data) {},
                /**
                 * This callback will run on scroll in a loop for each section available in the page.
                 * 
                 * @param  {event} [event] The triggering event of this function
                 * @param  {object} [data] Object containg the data available to use in this function to extend or add functionality.<br><br><br>
                 * 
                 * The following paramenters are the properties available in the 'data' object:
                 * @param [$sectionsElem] {element}
                 * @param [$selectedLevel] {element}
                 * @param [$selectedLevelItems] {element}
                 * @param [sectionCommonCls] {string}
                 * @param [hasEventNameSpace] {boolean}
                 * @param [$currentSection] {element}
                 * @param [curentScroll] {number}
                 * @param [currentSectionHeight] {number}
                 * @param [currentSectionOffsetTop] {number}
                 * @param [inViewPort] {boolean}
                 * @param [notAboveViewPort] {boolean}
                 * 
                 */
                onScrollEachSection: function(event, data) {},
                /**
                 * This callback will run on scroll and will only apply for the current active section.
                 * 
                 * @param  {event} [event] The triggering event of this function
                 * @param  {object} [data] Object containg the data available to use in this function to extend or add functionality.<br><br><br>
                 * 
                 * The following paramenters are the properties available in the 'data' object:<br><br>
                 * - inherits all paramenters of 'data' object from 'onScrollEachSection' plus the ones below
                 * @param [sectionSpecificCls] {string}
                 * @param [$selectedLevelActiveItem] {element}
                 */
                onScrollActiveSection: function(event, data) {}
            },
            init: function(options) {
                var inst = this,
                    o = inst.options;
                $.extend(inst.options, options);
                if (o.menu && o.level && o.sectionClass && o.hrefId) {
                    var initID = inst._asignInitID();
                    inst._accesibleSection();
                    $(o.menu).attr('data-scrolltosection', initID).addClass('js--scroll-to-section');
                    inst._onClick(initID);
                    inst._onScroll(initID);
                    inst._onLoad(initID);
                }
            },
            _accesibleSection: function() {
                $('[class*="' + this.options.sectionClass.substr(1) + '"]').attr('tabindex', 0);
            },
            _asignInitID: function() {
                var inst = this,
                    o = inst.options,
                    getHrefId = o.hrefId.slice(1, -1),
                    initName = 'scrollTo' + getHrefId,
                    index = $('[data-scrolltosection^="' + initName + '"]').length;
                return ('scrollTo' + getHrefId + "-" + index);
            },
            _onClick: function(_initID) {
                var inst = this,
                    o = inst.options,
                    $selectedLevelItemsLinks = $(o.menu).find(".selected > " + o.level + ' > li > a[href*="' + o.hrefId + '"]');
                $selectedLevelItemsLinks.on('click.' + _initID, function(e) {
                    var $this = $(this),
                        sectionSpecificCls = $this.attr("href").split(o.hrefId).pop(),
                        $sectionSelected = $(o.sectionClass + sectionSpecificCls);
                    e.preventDefault();
                    o.onClick(e, {
                        $selectedLevelItemsLinks: $selectedLevelItemsLinks,
                        $clickedLink: $this,
                        $sectionSelected: $sectionSelected,
                        sectionSpecificCls: sectionSpecificCls,
                    });
                    inst._scrollTo($sectionSelected);
                    if (o.updateHrefHash) location.hash = o.hrefId + sectionSpecificCls;
                    if (o.closePopup) o.onClosePopup();
                    if (o.addActiveClass) $this.parent('li').addClass('js--active').siblings().removeClass('js--active');
                });
            },
            _onScroll: function(_initID) {
                var inst = this,
                    o = inst.options,
                    elemHasEventNamespace = !inst._elemHasEventNamespace(window, 'scroll', _initID);
                if (o.addActiveClass || o.updateHrefHash || o.addScroll) {
                    //cache element before triggering scroll event
                    var sectionCommonCls = o.sectionClass.substr(1), //remove point from begining of class
                        $sectionsElem = $('[class*="' + sectionCommonCls + '"]'),
                        $selectedLevel = $(o.menu).find(".selected > " + o.level),
                        $selectedLevelItems = $(o.menu).find(" .selected > " + o.level + ' > li');
                    $(window).on('scroll.' + _initID, function(e) {
                        //only run if physical scroll and not on animation scroll achived by changing q4Options.prevent_make_section_active value in _scrollTo function.
                        if (q4Options.prevent_make_section_active === false) {
                            inst._make_section_active(e, $sectionsElem, $selectedLevel, $selectedLevelItems, sectionCommonCls, elemHasEventNamespace);
                        }
                    });
                }
            },
            _onLoad: function(_initID) {
                var inst = this,
                    o = inst.options,
                    elemHasEventNamespace = !inst._elemHasEventNamespace(window, 'load', _initID);
                if (o.scrollOnLoad && elemHasEventNamespace) {
                    $(window).on('load.' + _initID, function() {
                        inst._scroll_to_sec_load(o.sectionClass, o.hrefId, o.scrollSpeed);
                    });
                }
            },
            _make_section_active: function(_event, _$sectionsElem, _$selectedLevel, _$selectedLevelItems, _sectionCommonCls, _eventNamespace) {
                var inst = this,
                    o = inst.options,
                    curentScroll = $(window).scrollTop() + o.addActiveClassScrollTolerance,
                    offsetTop = o.getTopOffset(); //cache value before running each.
                _$sectionsElem.each(function() {
                    var $this = $(this),
                        currentSectionOffsetTop = $this.offset().top - offsetTop - o.scrollSectionOffset,
                        currentSectionHeight = $this.outerHeight(),
                        inViewPort = curentScroll >= currentSectionOffsetTop,
                        notAboveViewPort = curentScroll < currentSectionOffsetTop + currentSectionHeight,
                        eachData = {
                            $sectionsElem: _$sectionsElem,
                            $selectedLevel: _$selectedLevel,
                            $selectedLevelItems: _$selectedLevelItems,
                            sectionCommonCls: _sectionCommonCls,
                            hasEventNameSpace: _eventNamespace,
                            $currentSection: $this,
                            curentScroll: curentScroll,
                            currentSectionHeight: currentSectionHeight,
                            currentSectionOffsetTop: currentSectionOffsetTop,
                            inViewPort: inViewPort,
                            notAboveViewPort: notAboveViewPort
                        };
                    if (_eventNamespace) o.onScrollEachSection(_event, eachData);
                    // verify only sections that are in viewport
                    if (inViewPort && notAboveViewPort) {
                        var sectionSpecificCls = $this.attr("class").split(_sectionCommonCls).pop().split(" ").shift(),
                            $selectedLevelActiveItem = _$selectedLevel.find('a[href$="' + sectionSpecificCls + '"]').parent();
                        if (_eventNamespace) {
                            o.onScrollActiveSection(_event, $.extend({
                                sectionSpecificCls: sectionSpecificCls,
                                $selectedLevelActiveItem: $selectedLevelActiveItem
                            }, eachData));
                        }
                        if (o.addActiveClass) {
                            _$selectedLevelItems.removeClass('js--active');
                            $selectedLevelActiveItem.addClass('js--active');
                        }
                        if (o.updateHrefHash && _eventNamespace) location.hash = o.hrefId + sectionSpecificCls;
                    }
                });
            },
            _scroll_to_sec_load: function(sectionClass, hrefId, scrollSpeed) {
                var inst = this,
                    o = inst.options;
                if (location.hash.indexOf(o.hrefId) > -1) {
                    var $sectionFromHref = $(o.sectionClass + location.hash.split(o.hrefId).pop());
                    inst._scrollTo($sectionFromHref);
                }
            },
            _elemHasEventNamespace: function(elem, event, namespace) {
                var events = $._data(elem, 'events'),
                    checkEvent = events.hasOwnProperty(event) ? events[event] : false,
                    result = 0;
                if (checkEvent) {
                    $.each(checkEvent, function(i, event) {
                        if (event.namespace.split("-").shift() == namespace.split("-").shift()) {
                            result++;
                        }
                    });
                }
                if (result > 0) return true;
                else return false;
            },
            _scrollTo: function($section) {
                var inst = this;
                o = inst.options;
                
                if (history) {
                    history.scrollRestoration = 'manual';
                }
                //prevent make_section_active function to run while page is animating scroll when the links are clicked
                q4Options.prevent_make_section_active = true;
                $('html,body').animate({
                    scrollTop: $section.offset().top - o.getTopOffset() - o.scrollSectionOffset
                }, o.scrollSpeed, function() {
                    if (!$(this).is(':animated')) {
                        //restore make_section_active fucntion to run when the animated scroll stopped
                        q4Options.prevent_make_section_active = false;
                        //focus section
                        $section.find(o.sectionFocusElem).focus();
                    }
                });
            }
        };
        scrollToSection.init(options);
    }
});


/**
 * Adds <code>accesible level slide</code> functionality for <code>q4 navigation module</code>.
 * 
 * @version 1.0.0
 * 
 * @class  q4.navLevelSlide
 * @type {object}
 * @requires   [q4.navLevelSlide.css](https://github.com/infloent/q4app-additions/tree/master/src/q4.navLevelSlide.css) 
 * 
 * @extends q4.defaults
 *
 */
$.extend(true, q4Defaults, /** @lends q4.navLevelSlide */ {
    /**
     * Use this method to add stiky functionality to an element.
     * 
     * @type {function} 
     * 
     * @param  {object} [options] Object of options used to initialize <code>'navLevelSlide'</code> method
     */
    navLevelSlide: function(options) {
        /** @lends q4.navLevelSlide.navLevelSlide */
        var navLevelSlide = {
            options: {
                /**
                 * Navigation element
                 * 
                 * @type {element}
                 * 
                 * @example $('.nav--mobile')
                 * 
                 * @default  null
                 */
                $nav: null, 
                /**
                 * <sup>*</sup> not implemented
                 * <br>
                 * This allows to se set the level class from which the functionality will be added.
                 * <br><br>
                 * <sup>*</sup>This solves the problem when the 'home' page is set to show in nav, or when the '.level1' items are corporate link and the navigation it's styles to only show Investor relations items which are .level2 elements.
                 * 
                 * @type {String}
                 * 
                 * @example '.level2'
                 * 
                 * @default 
                 */
                startLevel: '.level1', 
                /**
                 * Defines a css class modifier from the default slide classes that can be uset to create custom slide animation using css.
                 *
                 * <pre>By default the following css classes will be used:
                 * js--nav_slide-in
                 * js--nav_slide-out</pre>
                 * There are three slide style animation available in  <code>'q4.navLevelSlide.css'</code>
                 * <br>
                 * One with the default css classes.
                 * <br>
                 * And two more available by setting <code>'slideStyle'</code> to <code>"over"</code> or <code>"stack"</code>. See examples below.
                 * @type {string} 
                 * @example "over"
                 * this will modify the default css slide classes to 'js--nav_slide-in--over' and 'js--nav_slide-out--over'
                 * @example "stack" 
                 * this will modify the default css slide classes to 'js--nav_slide-in--stack' and 'js--nav_slide-out--stack'
                 * 
                 * 
                 * @default null 
                 */
                slideStyle: null,
                /**
                 * Adds the element defined in <code>'nextArrowTpl'</code> after each anchor that has children in the <code>'$nav'</code>.
                 * <br><br>
                 * If <code>true</code> the slide next functionality will be triggered by the element that has the class from <code>'nextArrowCls'</code> option.
                 * <br>
                 * If <code>false</code> the silde next functionality will be triggered by each anchor that has children in the <code>'startLevel'</code>.
                 * 
                 * @type {Boolean}
                 * 
                 * @default
                 */
                nextArrow: true,
                /**
                 * Class that will be use to trigger the slide next functionality on 'click' if <code>'nextArrow'</code> it's <code>true</code>.
                 * <br><br>
                 * This class is available to be use in <code>'nextArrowTpl'</code> as <code>'{{nextArrowTpl}}'</code>.
                 * @type {string}
                 *
                 * @default
                 */
                nextArrowCls: '.nav_next-level',
                /**
                 * This class is used to add a arrow icon to <code>'nextArrow'</code> button
                 * <br>
                 * If another arrow icon is needed to be used, change this class without the need to change <code>'nextArrowTpl'</code> default template.
                 * @type {String}
                 * @default
                 */
                nextArrowIconCls: '.q4-icon_chevron-right',
                /**
                 * If the default template need to be changed a <code>button</code> element with the <code>'nextArrowCls'</code> class should always be used.
                 * <br><br>
                 * A <code>button</code> element <code>is required</code> for accesibility because it's a focusable element and also emulates <code>'click'</code> event handler by default on <code>'enter'</code> keypress.
                 * <br>
                 * The <code>'nextArrowCls'</code> class <code>is required</code> to be set on the <code>'button'</code> because this class trigger the functionality.
                 * <br><br>
                 * The <code>default</code> template it's buid to be <code>accesible</code>, when creating a <code>custom template</code> please follow the <code>accesiblity requirements</code>.
                 * @type {string}
                 *
                 * @param {string} '{{nextArrowCls}}' the defined class for the slide next button element
                 * @param {string} '{{nextArrowIconCls}}' the defined next arrow icon class
                 * @param {string} '{{sectionTitle}}' in the default template this is included in a sr-only span for accesibility in the default
                 * 
                 * 
                 * @default 
                 * '<button class="{{nextArrowCls}}" type="button">' +
                 *      '<i class="{{nextArrowIconCls}}"></i>' +
                 *      '<span class="sr-only">Open submenu ({{sectionTitle}})</span>' +
                 *  '</button>'
                 */
                nextArrowTpl: (
                    /* beautify preserve:start */
                    '<button class="{{nextArrowCls}}" type="button">' +
                        '<i class="{{nextArrowIconCls}}"></i>' +
                        '<span class="sr-only">Open submenu ({{sectionTitle}})</span>' +
                    '</button>'
                    /* beautify preserve:end */
                ),
                /**
                 * Text that will be used in <code>'menuHeaderTpl'</code> to display a menu name.
                 * @type {?string}
                 *
                 * @example "menu"
                 * @example "Investors Relation"
                 *
                 * @default null
                 */
                mainMenuName: null,
                /**
                 * Class that will be used in <code>'menuHeaderTpl'</code> and <code>'levelHeaderTpl'</code> to define the menu header element
                 * 
                 * @type {String}
                 * 
                 * @default
                 */
                navHeaderCls: '.nav_header',
                /**
                 * The elements defined in this option will be prepended to the <code>'startLevel'</code> element if the <code>'mainMenuName'</code> has a <code>string value</code>
                 * 
                 * @type {string}
                 * 
                 * @param {string} '{{navHeaderCls}}'
                 * @param {string} '{{mainMenuName}}'
                 *
                 * @default 
                 * '<li class="{{navHeaderCls}}">' +
                 *      '<span class="nav_level-title">{{mainMenuName}}</span>' +
                 * '</li>' 
                 */
                menuHeaderTpl: (
                    /* beautify preserve:start */
                    '<li class="{{navHeaderCls}}">' +
                        '<span class="nav_level-title">{{mainMenuName}}</span>' +
                    '</li>'
                    /* beautify preserve:end */
                ),
                /**
                 * Adds the text of link that have children to <code>'levelHeaderTpl'</code> as a title for their child level header.
                 * 
                 * @type {boolean}
                 *
                 * @default
                 */
                addTopSectionName: false,
                /**
                 * Includes the section title in the slide back button from <code>'levelHeaderTpl'</code> so the slide back functionality can be triggerd by clicking on the title too.
                 * @type {Boolean}
                 *
                 * @default
                 */
                topSectionNameTriggerBack: false,
                /**
                 * Class that will be use to trigger the slide back functionality on 'click'
                 * <br><br>
                 * This class is available to be used in <code>'levelHeaderTpl'</code> as <code>'{{backArrowCls}}'</code>.
                 * @type {string}
                 *
                 * @default
                 */
                backArrowCls: '.nav_back-level',
                /**
                 * This class is used to add a arrow icon to the slide back button from <code>'levelHeaderTpl'</code>
                 * <br>
                 * If another arrow icon is needed to be used, change this class without the need to change <code>'levelHeaderTpl'</code> default template.
                 * @type {String}
                 * @default
                 */
                backArrowIconCls: '.q4-icon_chevron-left',
                /**
                 *
                 * The <code>default</code> template it's buid to be <code>accesible</code>, when creating a <code>custom template</code> please follow the <code>accesiblity requirements</code>.
                 * 
                 * @type {string}
                 *
                 * @param {string} '{{navHeaderCls}}'
                 * @param {boolean} '{{topSectionNameTriggerBack}}'
                 * @param {string} '{{backArrowCls}}'
                 * @param {string} '{{backArrowIconCls}}'
                 * @param {string} '{{parentSectionTitle}}' in the default template this is included in a sr-only span for accesibility in the default template.
                 * @param {string} '{{levelName}}'
                 * 
                 * @default 
                 * '<li class="{{navHeaderCls}}">' +
                 *      '{{^topSectionNameTriggerBack}}' +
                 *          '<button class="{{backArrowCls}}" type="button">' +
                 *              '{{#backArrowIconCls}}<i class="{{backArrowIconCls}}"></i>{{/backArrowIconCls}}' +
                 *              '<span class="sr-only">Go back ({{parentSectionTitle}} menu)</span>' +
                 *          '</button>' +
                 *      '   {{#levelName}}<span class="nav_level-title">{{levelName}}</span>{{/levelName}}' +
                 *      '{{/topSectionNameTriggerBack}}' +
                 *      '{{#topSectionNameTriggerBack}}' +
                 *          '<button class="{{backArrowCls}} {{backArrowCls}}--name" type="button">' +
                 *              '{{#backArrowIconCls}}<i class="{{backArrowIconCls}}"></i>{{/backArrowIconCls}}' +
                 *              '<span class="sr-only">Go back ({{parentSectionTitle}} menu)</span>' +
                 *              '{{#levelName}}<span class="nav_level-title">{{levelName}}</span>{{/levelName}}' +
                 *          '</button>' +
                 *      '{{/topSectionNameTriggerBack}}' +
                 *  '</li>'
                 */
                levelHeaderTpl: (
                    /* beautify preserve:start */
                    '<li class="{{navHeaderCls}}">' +
                        '{{^topSectionNameTriggerBack}}' +
                            '<button class="{{backArrowCls}}" type="button">' +
                                '{{#backArrowIconCls}}<i class="{{backArrowIconCls}}"></i>{{/backArrowIconCls}}' +
                                '<span class="sr-only">Go back ({{parentSectionTitle}} menu)</span>' +
                            '</button>' +
                        '   {{#levelName}}<span class="nav_level-title">{{levelName}}</span>{{/levelName}}' +
                        '{{/topSectionNameTriggerBack}}' +
                        '{{#topSectionNameTriggerBack}}' +
                            '<button class="{{backArrowCls}} {{backArrowCls}}--name" type="button">' +
                                '{{#backArrowIconCls}}<i class="{{backArrowIconCls}}"></i>{{/backArrowIconCls}}' +
                                '<span class="sr-only">Go back ({{parentSectionTitle}} menu)</span>' +
                                '{{#levelName}}<span class="nav_level-title">{{levelName}}</span>{{/levelName}}' +
                            '</button>' +
                        '{{/topSectionNameTriggerBack}}' +
                    '</li>'
                    /* beautify preserve:end */
                ),
                addDestroyBreakpoint: null,
                addDestroyConditionSwitch: true
            },
            init: function(options) {
                $.extend(this.options, options);
                var inst = this,
                    o = inst.options,
                    nextTrigger = o.nextArrow ? 'li.has-children >' + o.nextArrowCls : 'li.has-children > a',
                    slideStyleCls = o.slideStyle ? "--" + o.slideStyle : "";
                if (o.addDestroyBreakpoint == null) inst._initNav(nextTrigger, slideStyleCls);
                else inst._addDestroyResize(nextTrigger, slideStyleCls);
            },
            _initNav: function(_nextTrigger, _slideStyleCls) {
                var inst = this,
                    o = inst.options;
                inst._buitlHtml();
                inst._accessibilizeNav(_nextTrigger, o.backArrowCls);
                inst._slideNext(_nextTrigger, _slideStyleCls);
                inst._slideBack(_nextTrigger, _slideStyleCls);
            },
            _accessibilizeNav: function(_nextTrigger, _backTrigger) {
                var inst = this,
                    o = inst.options;
                if (!o.nextArrow) $(_nextTrigger).attr('role', 'button');
                $(_nextTrigger).attr('aria-haspopup', 'true');
                $(_backTrigger).attr('aria-haspopup', 'true');
            },
            _buitlHtml: function() {
                var inst = this,
                    o = inst.options,
                    $nav = o.$nav;

                o.$nav.addClass('js--nav--slide').wrapInner('<div class="nav_container"></div>').find(o.startLevel).addClass('js--nav_active');
                //add menu title
                if (o.mainMenuName) {
                    $nav.find(o.startLevel).prepend(Mustache.render(o.menuHeaderTpl, {
                        navHeaderCls: o.navHeaderCls.substr(1),
                        mainMenuName: o.mainMenuName
                    }));
                }
                $nav.find(o.startLevel +' li.has-children').each(function() {
                    var $this = $(this),
                        levelText = $this.find('> a').text(),
                        parentSection = $this.parent().closest('.has-children').find('> a');
                    //add next arrow
                    if (o.nextArrow) {
                        $this.addClass('js--nav_has-arrow').find('> a').after(Mustache.render(o.nextArrowTpl, {
                            nextArrowCls: o.nextArrowCls.substr(1),
                            nextArrowIconCls: o.nextArrowIconCls.substr(1),
                            sectionTitle: levelText
                        }));
                    } else {
                        $this.find('> a').addClass(o.nextArrowIconCls.substr(1));
                    }
                    //add back arrow
                    $this.find('> ul').prepend(Mustache.render(o.levelHeaderTpl, {
                        navHeaderCls: o.navHeaderCls.substr(1),
                        levelName: o.addSectionName ? levelText : null,
                        topSectionNameTriggerBack: o.topSectionNameTriggerBack && o.addSectionName ? true : false,
                        backArrowCls: o.backArrowCls.substr(1),
                        backArrowIconCls: o.backArrowIconCls.substr(1),
                        parentSectionTitle: parentSection.length ? parentSection.text() : o.mainMenuName ? o.mainMenuName : "main"
                    }));
                });
            },
            _slideNext: function(_nextTrigger, _slideStyleCls) {
                var inst = this,
                    o = inst.options;

                o.$nav.find(o.startLevel).on('click.navSlideNext', _nextTrigger, function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        $closestUl = $this.closest('ul');
                    $this.next('ul').addClass('js--nav_slide-in' + _slideStyleCls).addClass('js--nav_active');
                    $closestUl.clearQueue().addClass('js--nav_slide-out' + _slideStyleCls).removeClass('js--nav_active');
                    //accessibilize
                    //remove aria expanded from previus active nextTrigger
                    $closestUl.parent().parent().find(">" + _nextTrigger).removeAttr('aria-expanded');
                    //remove aria expanded from previous active backTrigger
                    $this.siblings('ul').children().find('> ' + o.backArrowCls).removeAttr('aria-expanded');
                    $this.attr('aria-expanded', 'true');
                });
            },
            _slideBack: function(_nextTrigger, _slideStyleCls) {
                var inst = this,
                    o = inst.options;
                o.$nav.find(o.startLevel).on('click.navSlideBack', o.backArrowCls, function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        $closestUl = $this.closest('ul');
                    $closestUl.removeClass('js--nav_slide-in' + _slideStyleCls).removeClass('js--nav_active');
                    $closestUl.parent().closest('ul').removeClass('js--nav_slide-out' + _slideStyleCls).delay(1000).queue(function(next) {
                        $(this).addClass('js--nav_active');
                        next();
                    });
                    //accessibilize
                    //remove aria expanded from previus active nextTrigger
                    $closestUl.parent().parent().find(">" + _nextTrigger).removeAttr('aria-expanded');
                    //remove aria expanded from previous active backTrigger
                    $this.parent().siblings().find(o.backArrowCls).removeAttr('aria-expanded');
                    $this.attr('aria-expanded', 'true');

                });
            },
            _destroy: function($nav, _nextTrigger, _slideStyleCls) {
                var inst = this,
                    o = inst.options;
                $nav.removeClass('js--nav--slide').find('.level1').unwrap();
                $nav.find(o.navHeaderCls).remove();
                $nav.find(o.nextArrowCls).remove();
                $nav.find('ul').removeClass('js--nav_slide-in' + _slideStyleCls);
                $nav.find('ul').removeClass('js--nav_slide-out' + _slideStyleCls);
                $nav.find(_nextTrigger).off('click.navSlideNext');
                $nav.find(o.backArrowCls).off('click.navSlideBack');
            },
            _addDestroyResize: function(_nextTrigger, _slideStyleCls) {
                var inst = this,
                    o = inst.options;
                if (o.addDestroyBreakpoint !== null) {
                    $(window).on('resize.addDestroyNavSlide', function() {
                        if (o.addDestroyConditionSwitch === ($(window).width() >= o.addDestroyBreakpoint)) {
                            if (o.$nav.hasClass('js--nav--slide')) inst._destroy(o.$nav, _nextTrigger, _slideStyleCls);
                        } else {
                            if (!o.$nav.hasClass('js--nav--slide')) inst._initNav(_nextTrigger, _slideStyleCls);
                        }
                    }).resize();
                }
            }
        };
        nav_slide.init(options);
    }
});
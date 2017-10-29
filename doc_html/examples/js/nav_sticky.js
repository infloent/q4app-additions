var q4App = {
    init: function() {
        var app = this;

        // top nav
        app.stickyNav({
            $stickyElemTrigger: $('.js__sticky-intro'),
            $stikyElem: $('.js__sticky-intro .level1')
        });

        app.scroll_to_section_menu({
            menu: '.js__sts-intro',
            level: '.level2',
            sectionClass: '.js__sts-intro-section--',
            addActiveClass: true,
            addActiveClassScrollTolerance: 0,
            menuIsSticky_desktop: true
        });

        // intro sticky nav
        app.stickyNav({
            $stickyElemTrigger: $('.js__sticky-example'),
            $stikyElem: $('.js__sticky-example .level1'),
            $offsetTopElem_desktop: $('.js__sticky-intro .level1.js--sticky')
        });
        app.stackStikyNav($('.js__sticky-example .level1'), $('.pane--content'), $('.js__sticky-intro .level1'));
        app.scroll_to_section_menu({
            menu: '.js__sts-sticky',
            level: '.level2',
            sectionClass: '.js__sts-sticky-section--',
            hrefId: "#section-sticky=",
            addActiveClass: true,
            addActiveClassScrollTolerance: 0,
            menuIsSticky_desktop: true,
            $offsetTopElem_desktop: $('.js__sticky-intro .level1')
        });


        // intro scroll nav
        app.stickyNav({
            $stickyElemTrigger: $('.js__sticky-scroll'),
            $stikyElem: $('.js__sticky-scroll .level1'),
            $offsetTopElem_desktop: $('.js__sticky-intro .level1'),
            // $offsetTopElem_desktop2: $('.js__sticky-example .level1'),
            // getTopOffset: function() {
            //     var inst = this,
            //         topOffsetScroll = 0;
            //     if ($(window).width() > inst.offsetBreakPoint_mobile || inst.offsetBreakPoint_mobile === false) {
            //         topOffsetScroll = inst.$offsetTopElem_desktop ? inst.$offsetTopElem_desktop.outerHeight() + inst.$offsetTopElem_desktop2.outerHeight() : 0;
            //     } else {
            //         topOffsetScroll = inst.$offsetTopElem_mobile ? inst.$offsetTopElem_mobile.outerHeight() : 0;
            //     }
            //     return topOffsetScroll;
            // }

        });
        app.scroll_to_section_menu({
            menu: '.js__sts-scroll',
            level: '.level2',
            sectionClass: '.js__sts-scroll-section--',
            hrefId: "#section-scroll=",
            addActiveClass: true,
            addActiveClassScrollTolerance: 0,
            menuIsSticky_desktop: true,
            $offsetTopElem_desktop: $('.js__sticky-intro .level1')
        });

    },
    scroll_to_section_menu: function(options) {
        var sts = {
            settings: {
                menu: false,
                level: false,
                sectionClass: false,
                hrefId: "#section=",
                addActiveClass: false,
                addActiveClassScrollTolerance: 10,
                closeMobileNav: false,
                //offset settings can be modified or redefined on init together with the getTopOffset() function to create adapted offset calculation.
                menuIsSticky_desktop: false,
                menuIsSticky_mobile: false,
                $offsetTopElem_desktop: false,
                $offsetTopElem_mobile: false,
                offsetBreakPoint_mobile: false,
                // offsetClass: false,
                getTopOffset: function() {
                    var inst = this,
                        topOffsetScroll = 0;
                    if ($(window).width() > inst.offsetBreakPoint_mobile || inst.offsetBreakPoint_mobile === false) {
                        topOffsetScroll = inst.menuIsSticky_desktop ? $(inst.menu).outerHeight() : 0;
                        topOffsetScroll += inst.$offsetTopElem_desktop ? inst.$offsetTopElem_desktop.outerHeight() : 0;
                    } else {
                        topOffsetScroll = inst.menuIsSticky_mobile ? $(inst.menu).outerHeight() : 0;
                        topOffsetScroll = inst.$offsetTopElem_mobile ? inst.$offsetTopElem_mobile.outerHeight() : 0;
                    }
                    return topOffsetScroll;
                }
            },
            init: function(settings) {
                $.extend(this.settings, settings);
                var inst = this,
                    o = inst.settings,
                    $menuLevel = $(o.menu + " .selected > " + o.level),
                    $navScrollLink = $(o.menu + " .selected > " + o.level + ' > li > a[href*="' + o.hrefId + '"]'),
                    $sectionElem = $('[class*="' + o.sectionClass.substr(1) + '"]'),
                    $menuItems = $(o.menu + " .selected > " + o.level + ' > li');
                if (o.menu && o.level && $navScrollLink.length) {
                    inst._scroll_to_section($navScrollLink, o.sectionClass, o.closeMobileNav, o.hrefId);
                    $(window).on('load', function() {
                        inst._scroll_to_sec_load(o.sectionClass, o.hrefId);
                    });
                    if (o.addActiveClass === true) {
                        $(window).on('scroll', function(e) {
                            inst._make_section_active($sectionElem, $menuLevel, $menuItems, o.sectionClass, o.addActiveClassScrollTolerance);
                        }).scroll();
                    }
                }
            },
            _getTopOffset: function() {
                var inst = this,
                    o = inst.settings,
                    $offsetClass = $(o.offsetClass);
                ofs = 0;
                if ($(window).width() > 1024) {
                    ofs = $offsetClass.length ? $offsetClass.outerHeight() : 0;
                    ofs = o.menuIsSicky ? ofs + $(o.menu).outerHeight() : ofs;
                } else {
                    ofs = o.menuIsSicky ? ofs + $(o.menu).outerHeight() : ofs;
                }
                return ofs;
            },
            _prevent_make_section_active: false,
            _closeMobileNav: function(closeMobileNav) {},
            _scroll_to_section: function($navScrollLink, sectionClass, closeMobileNav, hrefId) {
                var inst = this;
                $navScrollLink.on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this),
                        $parent = $this.parent(),
                        hrefSection = $this.attr("href").split(hrefId).pop(),
                        section = sectionClass + hrefSection;
                    $this.parent('li').siblings().removeClass('js--active');
                    $parent.addClass('js--active');
                    location.hash = hrefId + hrefSection;
                    //prevent make_section_active function to run while page is animating scroll when the links are clicked
                    inst._prevent_make_section_active = true;
                    $('html,body').animate({
                        scrollTop: $(section).offset().top - inst.settings.getTopOffset()
                    }, 400, function() {
                        if (!$(this).is(':animated')) {
                            //restore make_section_active fucntion to run when the animated scroll stopped
                            inst._prevent_make_section_active = false;
                        }
                        closeMobileNav == true ? $('.layout').triggerHandler('click') : null;
                    });
                });
            },
            _make_section_active: function($sectionElem, $menuLevel, $menuItems, sectionClass, scrollTolerance) {
                //only run if physical scroll and not on animation scroll achived by changing _prevent_make_section_active value in _scroll_to_section function.
                if (this._prevent_make_section_active == false) {
                    var inst = this,
                        curentScroll = $(window).scrollTop() + scrollTolerance,
                        sectionCls = sectionClass.substr(1); //remove point from begining
                    $sectionElem.each(function() {
                        var $this = $(this),
                            scrollToTop = $this.offset().top;
                        if (curentScroll >= scrollToTop - inst.settings.getTopOffset()) {
                            var section = $this.attr("class").split(sectionCls).pop().split(" ").shift(),
                                $activeMenuItemParent = $menuLevel.find('a[href$="' + section + '"]').parent();
                            $menuItems.filter('.js--active').removeClass('js--active');
                            $activeMenuItemParent.not($('.js--active')).addClass('js--active');
                            // location.hash = 'section=' + section;

                            // console.log(section);

                        }
                    });
                }
            },
            _scroll_to_sec_load: function(sectionClass, hrefId) {
                if (location.hash.indexOf(hrefId) > -1) {
                    var inst = this,
                        section = sectionClass + location.hash.split(hrefId).pop();
                    console.log(section);
                    $('html,body').animate({
                        scrollTop: $(section).offset().top - inst.settings.getTopOffset()
                    });
                }
            }
        }
        sts.init(options);
    },
    // Sticky Nav Functionality
    stickyNav: function(options) {
        var o = {
            //* type = jQ object
            //** the offsetTop of this element triggers when the $stikyElem si set to position fixed by the css class .js--sticky .
            // this element needs to have it's height set to pixels in css to prevent content from juming up when the child element $stikyElem will be set to positon fixed.
            $stickyElemTrigger: false,
            //
            //* type = jQ object
            //** the element that is contained by $stickyElemTrigger and will be sticky.
            $stikyElem: false,
            //
            //** type = jQ object
            //** this should be set to the element that is already sticky above the current one.
            //* if set $stikyElem will get trigered to be stiky when the top the $stickyElemTrigger touches the bottom of $offsetTopElem_desktop
            //* if not set $stikyElem will get trigered to be stiky when the top the $stickyElemTrigger touches the top side of the browser window.
            $offsetTopElem_desktop: false,
            //
            //** type = jQ object
            //** this should be set if on mobile the already sticky element above the current one is different from the one on desktop.
            //** To work $offsetTopElem_mobile is required to be set to a number representing the resolution at which this sould take effect.
            $offsetTopElem_mobile: false,
            //
            //** type = number
            //set 'offsetBreakPoint_mobile' in the followig cases:
            // -- if on mobile the offset element is different then the '$offsetTopElem_desktop' element and the '$offsetTopElem_mobile' needs to be set.
            // -- if on mobile there is NO already stiky element above the current one, then set 'offsetBreakPoint_mobile' to the resolution where $offsetTopElem_mobile needs to stop setting the offset and leave '$offsetTopElem_mobile = false'.
            // -- if on desktop there is no already sticky element abobe the current one bun on mobile is one, then leave '$offsetTopElem_desktop = false,' set the $offsetTopElem_mobil element and set 'offsetBreakPoint_mobile' to the resolution at which this sould tale effect
            offsetBreakPoint_mobile: false,
            //
            //* stop sticky functionality
            //* type = string
            //* values:
            //** "never" to be always sticky **Default**.
            //** "mobile" to be stiky when resoliton it's less or equal to stopStickyBreakPoint.
            //** "desktop" to be stiky when resoliton it's greater than stopStickyBreakPoint.
            stopStiky: "never",
            //
            //* stopStickyBreakPoint 
            //** type = number
            //** if "stopStiky" is either "desktop" or "mobile" is required that this to be set to a number.
            // if this sticky menu is visible only on desktop and on mobile is set to 'display:none' then set 'stopStiky = "mobile"' and 'stopStickyBreakPoint' to the resolution to where the menu is hidden to stop the functionlity from working on a hidden element. This applies the other way around with the appropiate settings if visible only on mobile and hidden on desktop.
            stopStickyBreakPoint: false,
            //
            //* type = function
            //** calculates heights for '$offsetTopElem_desktop' and '$offsetTopElem_desktop' based on the 'offsetBreakPoint_mobile' to set the offset for the when the '$stikyElem' will get sticky.
            //** the functionality of this function and the following properties:
            // -- '$offsetTopElem_desktop', 
            // -- '$offsetTopElem_desktop', 
            // -- 'offsetBreakPoint_mobile' 
            // can be modified on initialization to set offsets for more breakpoints or for more elements that set the offset by breakpoint
            // 
            // example on initialization
            // 
            // app.stickyNav({
            //     $stickyElemTrigger: $('.nav--secondary'),
            //     $stikyElem: $('.nav--secondary .level1'),
            //     offsetTopElem: [$('.pane--banner')],
            //     breakPointOffset: [{
            //         breakPoint: 1024,
            //         offsetTopElem: [$('.pane--banner'), $('.pane--header')]
            //     }, {
            //         breakPoint: 768,
            //         offsetTopElem: [$('.pane--header')]
            //     }],
            //     stikyOffsetTop_calc: function() {
            //         var inst = this,
            //             topOffsetScroll = 0;
            //         if ($(window).width() > inst.breakPointOffset[0].breakPoint || !inst.breakPointOffset.length) {
            //             if (inst.offsetTopElem.length) {
            //                 $.each(inst.offsetTopElem, function(i, elem) {
            //                     topOffsetScroll += elem.outerHeight();
            //                 });
            //             }
            //         } else {
            //             $.each(inst.breakPointOffset, function(i, thisBreak) {
            //                 if ($(window).width() <= thisBreak.breakPoint) {
            //                     $.each(thisBreak.offsetTopElem, function(j, elem) {
            //                         topOffsetScroll += elem.outerHeight();
            //                     });
            //                 }
            //             });
            //         }
            //         return topOffsetScroll;
            //     }
            // });
            getTopOffset: function() {
                var inst = this,
                    topOffsetScroll = 0;
                if ($(window).width() > inst.offsetBreakPoint_mobile || inst.offsetBreakPoint_mobile === false) {
                    topOffsetScroll = inst.$offsetTopElem_desktop ? inst.$offsetTopElem_desktop.outerHeight() : 0;
                } else {
                    topOffsetScroll = inst.$offsetTopElem_mobile ? inst.$offsetTopElem_mobile.outerHeight() : 0;
                }
                return topOffsetScroll;
            }
        };
        $.extend(o, options);
        if (o.$stikyElem.length) {
            function mobileOrDesktop() {
                var condition;
                switch (o.stopStiky) {
                    case 'never':
                        condition = true
                        break;
                    case 'desktop':
                        $(window).width() <= o.stopStickyBreakPoint ? condition = true : condition = false;
                        break;
                    case 'mobile':
                        $(window).width() > o.stopStickyBreakPoint ? condition = true : condition = false;
                        break;
                }
                return condition;
            }
            $(window).on('scroll', function(e) {
                if (mobileOrDesktop()) {
                    var curentScroll = $(window).scrollTop(),
                        stickyElemWrapper_offsetTop = o.$stickyElemTrigger.offset().top - o.getTopOffset();
                    if (curentScroll >= stickyElemWrapper_offsetTop) {
                        o.$stikyElem.addClass('js--sticky');
                    } else {
                        o.$stikyElem.removeClass('js--sticky');
                    }
                }
            }).scroll();
            if (o.stopStickyBreakPoint) {
                $(window).on('resize', function() {
                    if (!mobileOrDesktop()) {
                        o.$stikyElem.removeClass('js--sticky');
                    } else if (!o.$stikyElem.hasClass('js--sticky')) {
                        var curentScroll = $(window).scrollTop(),
                            stickyElemWrapper_offsetTop = o.$stickyElemTrigger.offset().top - o.getTopOffset();
                        if (curentScroll >= stickyElemWrapper_offsetTop) {
                            o.$stikyElem.addClass('js--sticky');
                        }
                    }
                });
            }
        }
    },
    stackStikyNav: function($stickyElem, $triggerStackElem, $offsetElem) {
        if ($stickyElem.length) {
            $(window).on('scroll', function(e) {
                var CurentScroll = $(window).scrollTop(),
                    stickyElemHeight = $stickyElem.outerHeight(),
                    offsetElemHeight = $offsetElem ? $offsetElem.outerHeight() : 0,
                    positionTrigger = $triggerStackElem.offset().top;
                //trigger stack at the bottom of the stiky element by adding it's height to the CurrentScroll
                if (CurentScroll + stickyElemHeight + offsetElemHeight > positionTrigger) {
                    $stickyElem.addClass('js--stacked');
                } else {
                    $stickyElem.removeClass('js--stacked');
                }
            }).scroll();
        }
    },
};
q4App.init();

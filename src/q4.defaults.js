/**
 * Reuseable functions used on Q4app Websites
 * 
 * @class q4.defaults
 * 
 * @version 1.0.0
 * 
 */

/** @lends q4.defaults */
var q4Defaults = {
    options: {
        /**
         * Scroll speed for `scrollTo`.
         * @type {string}
         * @default
         */
        scrollSpeed: 1000,
        /**
         * Offset used with the `scrollTo` method to account for fixed headers.
         * @type {string}
         * @default
         */
        headerOffset: 0, 
        /**
         * Any mailing list with this class will have their validation overwritten.
         * @type {string}
         * @default
         */
        mailingListSignupCls: '.module-subscribe--fancy',
        /**
         * Error message to display (i.e. mailing list signup / unsubscribe)
         * @type {string}
         * @default
         */
        errorMessage: 'The following errors must be corrected',
        /**
         * Text to display if an item is required for validation
         * @type {string}
         * @default
         */
        requiredText: 'is required',
        /**
         * Text to display if an entry is invalid and failed validation
         * @type {string}
         * @default
         */
        invalidText: 'is invalid',
        /**
         * Text to display if captcha is required. `requiredText` and `invalidText` will often proceed this text (i.e Code is required)
         * @type {string}
         * @default
         */
        captchaValidationText: 'Code',
        /**
         * Text used if a code is required.
         * @type {string}
         * @default
         */
        provideCodeText: 'Please provide the code',
        /**
         * Custom template for email validation
         * @type {string}
         * @default
         * '<p class="module_message module_message--error">{{errorMessage}}</p>' +
         *  '<ul>' +
         *      '{{#errors}}' +
         *          '<li>{{name}} {{message}}</li>' +
         *      '{{/errors}}' +
         *  '</ul>'
         */
        errorTpl: (
            /* beautify preserve:start */
            '<p class="module_message module_message--error">{{errorMessage}}</p>' +
            '<ul>' +
                '{{#errors}}' +
                    '<li>{{name}} {{message}}</li>' +
                '{{/errors}}' +
            '</ul>'
            /* beautify preserve:end */
        ),
        /**
         * Options for mainlist module.
         * @type       {object} 
         * @param  [tpl] {string} Template to overwrite mailing list signup confirmation html. See above default value.
         * @param  [location] {string} Location where the 'tpl' will be apended. See above default value.
         * @default
         * 
         * {
         *  tpl: (
         *      '<div id="SubscriberConfirmation" class="module module-subscribe module-subscribe--fancy dark grid_col grid_col--3-of-6 grid_col--md-1-of-2">' +
         *          '<div class="module_container--outer">' +
         *              '<h2 class="module_title">Email Alerts</h2>' +
         *              '<div class="module_container--inner">' +
         *                  '<p class="module_message module_message--success"></p>' +
         *              '</div>' +
         *          '</div>' +
         *      '</div>'
         *  ),
         *  location: '.pane--footer'
         *  }
         */
        mailingListConfig: {
            /**
             * Template to overwrite mailing list signup confirmation html.
             */
            tpl: (
                /* beautify preserve:start */
                 '<div id="SubscriberConfirmation" class="module module-subscribe module-subscribe--fancy dark grid_col grid_col--3-of-6 grid_col--md-1-of-2">' +
                     '<div class="module_container--outer">' +
                         '<h2 class="module_title">Email Alerts</h2>' +
                         '<div class="module_container--inner">' +
                             '<p class="module_message module_message--success"></p>' +
                         '</div>' +
                     '</div>' +
                 '</div>'
                /* beautify preserve:end */
            ),
            location: '.pane--footer'
        },
        /**
         * Enable superfish plugin
         * @type {boolean}
         * @default
         */
        superfish: true
    },

    /**
     * A test used to detect whether not the device satisfies a certain OS
     * @example if (app.isMobile.any()) { // If on a mobile device, execute code }
     */
    isMobile: {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    },

    // Default init function
    init: function() {},
    /**
     * Removes DOM elements on load
     */
    cleanUp: function() {
        $('#lnkPostback').remove();
        $('#litPageDiv > a:first').remove();
    },
    /**
     * Easier preview navigation
     */
    resetDate: function(selectors) {
        if (GetViewType() === "0") {
            $(selectors.join()).each(function() {
                $(this).attr('href', $(this).attr('href') + '&ResetDate=1');
            });
        }
    },
    /**
     * A better Preview Toolbar
     */
    previewToolbar: function() {
        if (GetViewType() === "0") {
            $('.PreviewToolBar').prepend(
                '<div class="PreviewTrigger">' +
                '<i class="q4app-icon_clock-line"></i>' +
                '</div>'
            ).on('click', '.PreviewTrigger', function() {
                $(this).toggleClass('js--active').parent().toggleClass('js--open');
            });
        }
    },

    /**
     * Used to replace an anchor with a span.
     * @param {selector}  [selector] a selector containing a item to be unwrapped
     * @example
     * before: &lt;a class="unwraplink" href="#"&gt;Text to unwrap&lt;/a&gt;
     *
     * app.unWrapLink( 'a.module-stock-header_stock-price' );
     *
     * after: &lt;span class="unwraplink"&gt;Text to unwrap&lt;/span&gt;
     *
     */
    unWrapLink: function(selector) {
        $(selector).replaceWith(function() {
            return $('<span class="' + selector.split('.').pop() + '">' + $(this).html() + '</span>');
        });
    },

    /**
     * Used to reveal an element by clicking on a trigger element.
     * Use this function to create anything from "Read More" buttons to revealing hidden elements with a trigger.
     * @param {container} [selector]  the wrapping element
     * @param {trigger} [selector]  the element that will be clicked to reveal 
     * @param {panel} [selector]  the element to be revealed
     * @param {once} [boolean]  (optional) whether or not the event will be triggered only once
     * @example app.reveal('.read-more', '.read-more_button', '.read-more_panel', true);
     */
    reveal: function(container, trigger, panel, once) {
        $(trigger).attr('tabindex', '0');
        $(panel).attr('aria-hidden', 'true');
        if (once) {
            $(container).one('click keypress', trigger, function(e) {
                if (e.keyCode == 13 || e.type == 'click') {
                    if ($(trigger).is('a')) e.preventDefault();
                    $(this).toggleClass('js--active').closest(container).find(panel).toggleClass('js--revealed');
                    $(panel).attr('aria-hidden', function(i, attr) {
                        return attr == 'true' ? 'false' : 'true';
                    });
                }
            });
        } else {
            $(container).on('click keypress', trigger, function(e) {
                if (e.keyCode == 13 || e.type == 'click') {
                    if ($(trigger).is('a')) e.preventDefault();
                    $(this).toggleClass('js--active').closest(container).find(panel).toggleClass('js--revealed');
                    $(panel).attr('aria-hidden', function(i, attr) {
                        return attr == 'true' ? 'false' : 'true';
                    });
                }
            });
        }
    },

    /**
     * Used to remove the duplicate classes on a Quick Link Module's <ul> element
     * @param {$el} [element]  the quick links module to clean up
     * @example app.cleanQuickLinks($('.module-links'));
     */
    cleanQuickLinks: function($el) {
        $el.find('ul').attr('class', 'module-links_list');
    },

    /**
     * Scroll to an element on the page
     * @param {$el}  [element] A selector containing the element to scroll to
     * @example app.scrollTo( $('div[id*="SubscriberConfirmation"]') )
     */
    scrollTo: function($el, duration) {
        var d = duration !== undefined && !isNaN(duration) ? duration : this.options.scrollSpeed;
        if ($el.length) {
            if (history) {
                history.scrollRestoration = 'manual';
            }

            $('html, body').animate({
                scrollTop: $el.eq(0).offset().top - this.options.headerOffset
            }, d);
        }
    },

    /**
     * Validate if a string is a vaild email address
     * @param {emailAddress} [string]  An email address that will be tested against the regular expression
     * @example app.isValidEmailAddress ( 'support@q4appinc.com' );
     * @return boolean
     */
    isValidEmailAddress: function(emailAddress) {
        var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
        return pattern.test(emailAddress);
    },

    /**
     * Attaches a click handler to the modules submit button which will not allow 
     * the form to submit without a true email address
     * @param {$el} [element]  an element containing the submit button
     * @example app.validateUnsubscribe($('.MailingListUnsubscribeContainer'));
     */
    validateUnsubscribe: function($el) {
        var inst = this;

        $el.find('input[type="submit"]').on('click', function(e) {
            var emailAddress = $el.find('input[id*="Email"]').val();

            if (!inst.isValidEmailAddress(emailAddress)) {
                $el.find('.module_confirmation-container').html(Mustache.render(inst.options.errorTpl, {
                    errors: [{
                        message: emailAddress.length ? inst.options.invalidText : inst.options.requiredText,
                        name: "Email Address"
                    }],
                    errorMessage: inst.options.errorMessage
                })).show();

                inst.scrollTo($el.find('.module_error-container'), 0);

                $el.addClass('js--invalid');
                e.preventDefault();
            }
        });

        if ($el.find('.module_confirmation-container').text().trim().length) {
            $('.module-subscribe').addClass('js--hidden');
            $el.find('.module_introduction, .module-unsubscribe_table, .module_actions').addClass('js--hidden');
            inst.scrollTo($el);
        }
    },

    /**
     * Attaches a check to a search module's submit button which will not allow
     * the module to submit without text inside the search input
     * @param {selector} [selector]  the class being used by the search module
     * @example app.validateSubmit('.module-search');
     */
    validateSubmit: function(selector) {
        var $search = $(selector);

        $search.on('click', 'input:submit', function(e) {
            if (!$(this).closest(selector).find('input:text').val().length) {
                e.preventDefault();
                return false;
            }
        });
    },

    /**
     * Allows the user to submit our forms using the enter key
     * @param {selector} [selector]  the class being used by the formbuilder module
     * @example app.submitOnEnter('.module-form')
     */
    submitOnEnter: function(selector) {
        $(selector).find('input[type="text"]').removeAttr('onkeypress').on('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                $(this).closest(selector).find('input[type="submit"]').trigger('click');
                return false;
            }
        });
    },

    _onMobileMenuExpand: function($nav) {
        $nav.on('click', 'li.has-children > a', function(e) {
            var $this = $(this),
                $parent = $this.parent();
            if (!$parent.hasClass('js--expanded')) {
                e.preventDefault();
                $parent.siblings().removeClass('js--expanded');
                $parent.addClass('js--expanded');
            }
        });
    },

    /**
     * Accessible Navigation powered by Superfish
     * @param {$nav} [element]  the nav element (or ul element) you would like to apply superfish to
     * @param {options} [object]  options to be passed into superfish
     * @example app.superfish($('.nav--secondary .level2'), {cssArrows:false}, 1024)
     */
    superfish: function($nav, options) {
        if (!this.isMobile.any() && this.options.superfish) {
            $nav.superfish(options);
        }
    },

    /**
     * Standard mobile menu functionality
     * @param {$layout} [element]  the default layout element
     * @param {pane} [selector]  the class of the pane element containing the mobile navigation
     * @param {toggleClass} [selector]  the class assigned to the element used to toggle the mobile navigation
     * @example app.mobileMenuToggle($('.layout'), '.pane--navigation', '.layout_toggle i')
     */
    mobileMenuToggle: function($layout, pane, toggle) {
        var inst = this;
        $layout.on('click', toggle, function(e) {
            $layout.toggleClass('js--mobile');
            inst._onMobileMenuExpand($('.js--mobile ' + pane + ' .nav'));
        });
    },

    /**
     * Gives a navigation element accessibility assistance in the form of the .focused class.
     * @param {$nav} [element]  the navigation element used for this function
     * @param {topLevel} [selector]  the class assigned to the highest visible level of the navigation
     * @example app.accessibleNav($('.nav'), '.level1')
     */
    accessibleNav: function($nav, topLevel) {
        $nav.on('focus ', 'a', function(e) {
            var $link = $(this);
            $link.closest('ul').find('li').removeClass('js--focused');
            $link.closest('li').addClass('js--focused');

            if ($link.closest('li').is(':last-child') && $link.closest('ul').is(topLevel)) {
                $link.blur(function() {
                    $link.closest(topLevel).find('li').removeClass('js--focused');
                });
            }
        });
    },

    /**
     * Gives element accessibility properties suitable for accordions, slide toggles, and tab navigation.
     * @param {$tablist} [element]  the wrapping element for the accessible section
     * @param {$tab} [element]  the element used to toggle the appropriate $tabpanel
     * @param {$tabpanel} [element]  the element intended to display in respect to the currently selected $tab
     * @example app.accessibilize($tablist, $tab, $tabpanel)
     */
    accessibilize: function($tablist, $tab, $tabpanel) {
        $tablist.attr('role', 'tablist');
        $tab.attr('tabindex', '0').attr('role', 'tab').attr('aria-expanded', 'false');
        $tabpanel.attr('role', 'tabpanel').addClass('js--hidden');
    },

    /**
     * Creates a fully accessible expanding and collapsing accordion with the ability to switch between toggle and accordion functionality.
     * @param {$container} [element]  the wrapping element for the toggle list
     * @param {item} [selector]  the class assigned to each designated toggling element
     * @param {toggle} [selector]  the class assigned to the element that will toggle the containing item
     * @param {panel} [selector]  the class assigned to the section that will be revealed if its containing item is toggled
     * @param {accordion} [boolean]  (optional) if true, the toggling section will take on accordion functionality
     * @param {allButton} [boolean]  (optional) if true, the toggling section will be accompanied by a "Hide All / Show All" button
     * @param {openFirst} [boolean]  (optional) if true, the first item will be set to active with its panel revealed
     * @example app.toggle($('.accordion'), '.accordion_item', '.accordion_toggle', '.accordion_panel', false, true);
     */
    toggle: function($container, item, toggle, panel, accordion, allButton, openFirst) {
        var $this = this,
            $item = $container.find(item);

        $this.accessibilize($container, $container.find(toggle), $container.find(panel));

        $item.on('click keypress', toggle, function(e) {
            e.preventDefault();
            if (e.which == 13 || e.type == 'click') {
                if (accordion) {
                    $this._accordionTrigger($(this), $container, item, toggle, panel);
                } else {
                    $this._toggleTrigger($(this), $container, item, panel);
                }

                if (allButton) {
                    if (!$container.find(item + '.js--active').length) {
                        $container.find('.toggle-all').removeClass('js--active');
                    }
                    if ($container.find(item + '.js--active').length === $container.find(item).length) {
                        $container.find('.toggle-all').addClass('js--active');
                    }
                }
            }
        });

        if (allButton) {
            $this._toggleAll($container, item, toggle, panel);
        }

        if (openFirst) {
            $item.first().find(toggle).attr('aria-expanded', true);
            $item.first().addClass('js--active').find(panel).removeClass('js--hidden');
        }
    },
    _toggleAll: function($container, item, toggle, panel) {
        $container.prepend('<div class="toggle-all"><a description="toggle all items" class="button" href="#all"></a></div>').on('click', '.toggle-all a', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('js--active');
            if ($(this).parent().is('.js--active')) {
                $container.find(toggle).attr('aria-expanded', 'true');
                $container.find(item).addClass('js--active');
                $container.find(panel).slideDown(400, function() {
                    $(this).removeClass('js--hidden');
                });
            } else {
                $container.find(toggle).attr('aria-expanded', 'false');
                $container.find(item).removeClass('js--active');
                $container.find(panel).slideUp(400, function() {
                    $(this).addClass('js--hidden');
                });
            }
        });
    },
    _accordionTrigger: function($this, $container, item, toggle, panel) {
        if (!$this.closest(item).hasClass('js--active')) {
            $(item).removeClass('js--active');
            $container.find(toggle).attr('aria-expanded', false);
            $container.find(panel).slideUp(400, function() {
                $(this).addClass('js--hidden');
            });

            $this.attr('aria-expanded', true);
            $this.closest(item).addClass('js--active').find(panel).slideDown(400, function() {
                $(this).removeClass('js--hidden');
            });
        }
    },
    _toggleTrigger: function($this, $container, item, panel) {
        var $allToggle = $container.find('.accordion-toggle-all');

        $this.attr('aria-expanded', function(i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).closest(item).toggleClass('js--active').find(panel).slideToggle(400, function() {
            $(this).toggleClass('js--hidden');
        });

        if ($container.find(item).not('.js--active').length) {
            $allToggle.removeClass('js--active');
        } else {
            $allToggle.addClass('js--active');
        }
    },

    /**
     * Used to hide the "Remind Me" functionality for events modules if a reminder has already been created.
     * Works for both list and details pages.
     * @param {$el} [element]  element(s) containing the "Remind Me" form
     * @example app.remindMeOnce($('.module-event .module_item')); or app.remindMeOnce($('.module-event-details'));
     */
    remindMeOnce: function($el) {
        $el.each(function() {
            if ($(this).find('.module_reminder-success').text().length) {
                $(this).find('.module_reminder').addClass('js--reminded');
            }
        });
    },

    /**
     * Our standard "Add to Calendar" functionality. Opens up a fancybox.
     * @param {selector} [element]  Selector for the module containing "Add to Calendar" links
     * @example app.addToCalendar('.module-event'); or app.addToCalendar('.module-event-latest, .module-event-upcoming');
     */
    addToCalendar: function(selector) {
        $(selector).on('click keypress', '.module_add-to-calendar-reveal', function(e) {
            if (e.keyCode == 13 || e.type == 'click') {
                $.fancybox.open({
                    src: $(this).next(),
                    type: 'inline',
                    opts: {
                        slideClass: 'fancybox-slide--no-padding'
                    }
                });
            }
        });
    },
    /**
     * Used to hide the "Add to Calendar" functionality for past events. Works for both list and details pages.
     * @param {$events} [element]  element(s) containing the unwanted "Add to Calendar" link
     * @example app.hidePastCal($('.module-event .module_item')); or app.hidePastCal($('.module-event-details'));
     */
    hidePastCal: function($events) {
        var today = new Date();

        $events.each(function() {
            var $this = $(this),
                $date = $this.find('.module_date-text');
            if ($date.text().indexOf("from") >= 0) {
                var isolateDate = $date.text().split('from ').pop().split('to ');
                if (today > new Date(isolateDate[1])) {
                    $this.find('.module_add-to-calendar').addClass('js--hidden');
                }
            } else if (today > new Date($date.text())) {
                $this.find('.module_add-to-calendar').addClass('js--hidden');
            }
        });
    },
    /**
     * Opens the Mailing List Signup - Captcha inside a fancybox
     * @param {$el} [element] The mailing list module
     * @example app.fancySignup( '.module-subscribe' );
     */
    fancySignup: function() {
        var inst = this,
            validationLock = true,
            signup = inst.options.mailingListSignupCls;
        $signup = $(signup),
            $confirm = $('div[id*="SubscriberConfirmation"]'); // jshint ignore:line

        // Subscriber Confirmation fix
        if ($confirm.is(':visible')) {
            if ($confirm.filter(':visible').closest(inst.options.mailingListConfig.location).length) {
                var successText = $confirm.filter(':visible').closest(inst.options.mailingListConfig.location).find('.module_message--success').text();
                $confirm.filter(':visible').parent().html(inst.options.mailingListConfig.tpl).find('.module_message--success').html(successText);
            }
            inst.scrollTo($('div[id*="SubscriberConfirmation"]').filter(':visible'), 0);
            $('.module-unsubscribe').addClass('js--hidden');
        }

        if (!$signup.length) {
            return;
        }

        $signup.each(function() {
            var $this = $(this);

            // If a confirmation or error message is visible on page load, scroll to the module
            if ($this.find('input.module_input').length && $this.find('input.module_input').val().length) {
                inst.scrollTo($this, 0);
            }

            $this.find('.CaptchaContainer').addClass('js--hidden');

            // Accessibility fixes
            $this.find('img').attr('alt', 'Captcha');
            $this.find('input[type="text"]').attr('aria-label', 'Captcha Text');
            $this.find('table').removeAttr('cellpadding cellspacing border width');

            // Create a second submit button to be displayed inside fancybox
            $this.find('input[type="submit"]').removeAttr('onclick').appendTo($this.find('.CaptchaContainer'));
            $this.find('.module_actions').append('<input type="submit" value="Submit" class="button module-subscribe_submit-button module-subscribe_submit-button--fancy">');

            $this.on('click', '.module-subscribe_submit-button--fancy', function(e) {
                e.preventDefault();
                validationLock = false;

                var $parent = $(this).closest(signup),
                    errors = inst._mailingListValidation($parent);

                if (!errors.length) {
                    $parent.find('.CaptchaContainer').data('container', $parent.attr('id'));

                    $.fancybox.open({
                        src: $parent.find('.CaptchaContainer'),
                        type: 'inline',
                        opts: {
                            onComplete: function() {
                                $('.fancybox-container').appendTo($('#litPageDiv form:first'));
                            }
                        }
                    });
                } else {
                    inst.scrollTo($this.find('.module_error-container'), 0);
                }

                return false;
            });

            // Run validation on change
            $this.find('input, select').on('change', function() {
                if (!validationLock) {
                    inst._mailingListValidation($this);
                }
            });

            // Submit form on enter
            $this.find('.CaptchaContainer input[type="text"]').on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $(this).closest('.CaptchaContainer').find('input[type="submit"]').trigger('click');
                    return false;
                }
            });

            // Make sure the Captcha is filled out
            $this.find('.CaptchaContainer')
                .prepend('<div class="module_error-container"></div>')
                .find('input[type="submit"]').on('click', function(e) {
                    var $container = $(this).closest('.CaptchaContainer');

                    if (!$container.find('input[type="text"]').val().length) {
                        e.preventDefault();
                        $container.find('.module_error-container').html(inst.options.captchaValidationText + ' ' + inst.options.requiredText);
                    } else if ($container.find('input[type="text"]').val().length !== 6) {
                        e.preventDefault();
                        $container.find('.module_error-container').html(inst.options.captchaValidationText + ' ' + inst.options.invalidText);
                    }
                });

            // Validate submit on enter
            $this.find('input[type="text"]').on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $(this).closest(signup).find('.module_actions input[type="submit"]').trigger('click');
                    return false;
                }
            });
        });
    },
    /**
     * Validates all required fields.
     * Used by default with fancySignup before displaying captcha.
     * Returns an array of errors
     * @param {$el} [element] The mailing list module
     */
    _mailingListValidation: function($el) {
        var inst = this,
            errors = [];

        $el.find('.js--invalid').removeClass('js--invalid');

        $el.find('.module_required').each(function() {
            var $item = $(this).closest('.module-subscribe_table-input'),
                message = inst.options.requiredText,
                field = $item.find('label:first').text(),
                validation = true;

            // Does the input exist?
            if ($item.find('input').length) {
                if ($item.hasClass('module-subscribe_email')) {
                    // Does the email address contain text?
                    if (!$item.find('input').val().length) {
                        validation = false;
                    }
                    // Is the email address valid?
                    else if (!inst.isValidEmailAddress($item.find('input').val())) {
                        validation = false;
                        message = inst.options.invalidText;
                    }
                }
                // Does the input contain text?
                else if (!$item.find('input').val().length) {
                    validation = false;
                }
            } else if ($item.find('select').length) {
                if (!$item.find('select option:selected').index()) {
                    validation = false;
                }
            } else {
                if (!$item.closest('table').find('input[type="checkbox"]:checked').length) {
                    $item = $item.next();
                    validation = false;
                }
            }

            if (!validation) {
                $item.addClass('js--invalid');
                errors.push({
                    name: field,
                    message: message
                });
            }
        });

        if (errors.length) {
            $el.find('.module_error-container').html(Mustache.render(inst.options.errorTpl, {
                errors: errors,
                errorMessage: inst.options.errorMessage
            })).show();
        } else {
            $el.find('.module_error-container').html('');

        }

        return errors;
    },

    /**
     * Used to automatically set the copyright year to the current year.
     * @param {$el} [element]  an element that will have its html replaced by the year
     * @example app.copyright($('.copyright_year'));
     */
    copyright: function($el) {
        $el.html(new Date().getFullYear());
    },

    /**
     * Small plugin used for document tracking w/ Google Analytics
     * @example app.docTracking();
     */
    docTracking: function() {
        var fileTypes,
            domainRegex,
            cdnRegex,
            httpRegex,
            baseHref,
            baseTag,
            currentPageMatches,
            currentDomain;

        // Fix for IE8
        window.hasOwnProperty = window.hasOwnProperty || Object.prototype.hasOwnProperty; // jshint ignore:line

        baseHref = '';
        fileTypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|mp4|txt|rar|html|wma|mov|avi|wmv|flv|wav)(\?.*)?$/i;
        domainRegex = /^https?:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
        httpRegex = /^https?\:\/\//i;
        cdnRegex = /.*\.cloudfront\.net$/i;
        currentPageMatches = window.location.href.match(domainRegex);
        currentDomain = currentPageMatches.length > 0 ? currentPageMatches[1] : false;
        baseTag = $('base');

        if (baseTag.length > 0 && baseTag.attr('href') !== undefined) {
            baseHref = baseTag.attr('href');
        }

        $('body').on('click', 'a', function(event) {
            var el,
                elEv,
                href,
                domainMatches,
                linkDomain,
                isSiteDomain,
                extensionMatch;

            el = $(this);
            href = el.attr('href') || '';

            // Don't do anything with javascript links
            if (href.match(/^javascript:/i)) {
                return;
            }

            // Extract domain from link
            domainMatches = href.match(domainRegex);

            // Set link domain to the current if nothing matched (e.g. relative URL, tel/mailto)
            linkDomain = null !== domainMatches ? domainMatches[1] : currentDomain;

            // Does the domain match, or is this a CDN
            isSiteDomain = linkDomain === currentDomain || cdnRegex.test(linkDomain) || linkDomain.toLowerCase().indexOf('q4appcdn') > -1;

            // Event defaults
            elEv = {
                value: 0,
                non_i: false,
                action: 'click',
                loc: href
            };

            if (href.match(/^mailto\:/i)) {
                // Email links
                elEv.category = 'email';
                elEv.label = href.replace(/^mailto\:/i, '');
            } else if (href.match() && !isSiteDomain) {
                // External downloads always have http[s]
                elEv.category = 'external';
                elEv.label = href.replace(httpRegex, '');
                elEv.non_i = true;
            } else if (null !== (extensionMatch = href.match(fileTypes))) {
                // Matches a filetype we care about (extensionMatch[1] is the type)                
                elEv.category = 'download';
                elEv.action = 'download';
                elEv.label = href.replace(/ /g, '-').replace(httpRegex, '');
                // Only add the base ref if its not a CDN link, or if the link is relative
                elEv.loc = (cdnRegex.test(linkDomain) ? '' : baseHref) + href;
            } else if (href.match(/^tel\:/i)) {
                // iOS tel:// links
                elEv.category = 'telephone';
                elEv.action = 'click';
                elEv.label = href.replace(/^tel\:/i, '');
            } else {
                return;
            }

            window.ga('send', 'event', elEv.category, elEv.action, elEv.label.toLowerCase(), elEv.value, { 'nonInteraction': elEv.non_i });
            window.ga('Client.send', 'event', elEv.category, elEv.action, elEv.label.toLowerCase(), elEv.value, { 'nonInteraction': elEv.non_i });
        });
    }
};


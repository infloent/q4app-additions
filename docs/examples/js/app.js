$('.pane--header').stickyWidget({
    triggerOffset: -50,
    triggerOffsetElemHeight: "negative",
    positionOffsetElemHeight: "negative",
    classes: {
        "js_sticky-elem": "js--sticky-slide",
        "js--sticky": "js--sticky-slide-active"
    },
});
$('.nav--secondary' ).stickyWidget({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    stickyElem: ".level2",
    layoutStickyActiveCls: "js--nav--secondary-sticky",
    disabled: false
});

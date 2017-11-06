$('.nav--main').stickyWidget();
$('.nav--secondary').stickyWidget({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableStickyBreakPoint: 1024,
    disableStickySwitchCondition: true,
    stickyElem: "append",
    layoutStickyActiveCls: "js--nav--secondary-sticky",
    disabled: false
});


$('.pane--header').stickyWidget({
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    afterSticky: function(event) {
        // console.log(event);
    }
});
$('.pane--navigation').stickySlide({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    layoutStickyActiveCls: "js--nav--secondary-sticky",
    // showHide: true,
    triggerOffset: 0,

});

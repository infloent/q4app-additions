$('.pane--header').stickyWidget({
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    afterSticky: function(event) {
        // console.log(event);
    }
});
$('.nav--secondary').stickySlide({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    stickyElem: ".level2",
    layoutStickyActiveCls: "js--nav--secondary-sticky",
    showHide: true,
    triggerOffset: 0,

});

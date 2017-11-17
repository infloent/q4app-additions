$('.pane--header').stickyWidget({
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    afterSticky: function(event) {
        // console.log(event);
    }
});
/*$('.pane--navigation').stickySlide({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    layoutStickyActiveCls: "js--nav--slide",
});*/

// $('.pane--navigation').stickySlideIn({
//     offsetTopElem: [$('.nav--main')],
//     offsetTopBreakPoint: [],
//     disableBreakPoint: 1024,
//     disableSwitchCondition: true,
//     layoutStickyActiveCls: "js--nav--slide-in",
// });

$('.pane--navigation').stickyShowHide({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    layoutStickyActiveCls: "js--nav--show-hide",
});


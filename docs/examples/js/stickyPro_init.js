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
    layoutStickyActiveCls: "js--nav--secondary-sticky",
    triggerOffsetAddSticky: 0,
    triggerOffsetRemoveSticky: 0,
    triggerOffsetElemHeightRemoveSticky: null,
    // showHide: true,
    stickyOptions: {
        stickyClass: "js--sticky",
        layoutStickyActiveClass: null,
        triggerOffsetAddSticky: 0,
        triggerOffsetRemoveSticky: 0,
        triggerOffsetElemHeightAddSticky: "negative",
        triggerOffsetElemHeightRemoveSticky: null,
        positionOffsetElemHeight: "negative",
        classes: {
            "js--sticky": "js--slide"
        },
    }
});*/

// $('.pane--navigation').stickySlideIn({
//     offsetTopElem: [$('.nav--main')],
//     offsetTopBreakPoint: [],
//     disableBreakPoint: 1024,
//     disableSwitchCondition: true,
//     layoutStickyActiveCls: "js--nav--secondary-sticky",
// });

$('.pane--navigation').stickyShowHide({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    layoutStickyActiveCls: "js--nav--secondary-sticky",
});


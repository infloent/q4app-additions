$('.pane--header').stickyWidget({
    afterSticky: function(event) {
        // console.log(event);
    }
});
$('.pane--navigation').stickyWidget({
    offsetTopElem: [$('.pane--header')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    layoutStickyActiveCls: "js--nav--secondary-sticky",
    // triggerOffsetAddSticky: -300,
    // triggerOffsetRemoveSticky: -150,
    // triggerOffsetElemHeightAddSticky: "negative",
    // triggerOffsetElemHeightRemoveSticky: "positive",
});


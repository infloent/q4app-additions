$('.pane--header').sticky({
    afterSticky: function(event) {
        // console.log(event);
    }
});
$('.pane--navigation').sticky({
    offsetTopElem: [$('.pane--header')],
    offsetTopBreakPoint: [],
    disableBreakPoint: 1024,
    disableSwitchCondition: true,
    layoutStickyActiveCls: "js--nav--secondary-sticky"
});


$('.nav--main').stickyWidget();
$('.nav--secondary').stickyWidget({
    offsetTopElem: [$('.nav--main')],
    offsetTopBreakPoint: [],
    stopStickyBreakPoint: 1024,
    stopStickySwitchCondition: true
});


(function() {
    var statusbarController;
    try { statusbarController = DE.getController('Statusbar'); } catch(e) {}
    if (statusbarController && !statusbarController.statusbar.mode.isReviewOnly &&
        (typeof (statusbarController.statusbar.mode.customization) == 'object') && !!statusbarController.statusbar.mode.customization.showReviewChanges) {
        var onReviewToggle = function(btn, state) {
            btn.toggle(false, true);
            Common.NotificationCenter.trigger('edit:complete', statusbarController.statusbar);
        };
        statusbarController.statusbar.btnReview.on('toggle', onReviewToggle);
        statusbarController.statusbar.mnuTrackChanges && statusbarController.statusbar.mnuTrackChanges.setDisabled(true);
    }
})();
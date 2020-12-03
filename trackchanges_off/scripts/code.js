(function() {
    var afterDocReady = function(){
        var reviewController;
        try { reviewController = DE.getController('Common.Controllers.ReviewChanges'); } catch(e) {}
        if (reviewController && !reviewController.appConfig.isReviewOnly &&
           (typeof (reviewController.appConfig.customization) == 'object') && !!reviewController.appConfig.customization.showReviewChanges) {
            var onReviewToggle = function(btn, state) {
                Common.NotificationCenter.trigger('reviewchanges:turn', 'off');
            };
            if (reviewController && reviewController.view && reviewController.view.btnsTurnReview) {
                reviewController.view.btnsTurnReview.forEach(function(button) {
                    button.on('toggle', onReviewToggle);
                }, this);
            }
        }
    };

    Common.NotificationCenter.on('document:ready', afterDocReady);
})();
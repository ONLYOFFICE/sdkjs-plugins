(function() {

    var afterDocReady = function(){
        var reviewController;
        try { reviewController = DE.getController('Common.Controllers.ReviewChanges'); } catch(e) {}
        if (reviewController && reviewController.view && reviewController.view.btnsTurnReview) {
            reviewController.view.btnsTurnReview.forEach(function(button) {
                button.allowDepress = false;
            }, this);
            Common.NotificationCenter.trigger('reviewchanges:turn', 'on');
        }
    };

    Common.NotificationCenter.on('document:ready', afterDocReady);
})();
/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
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
                    if (button.menu && button.menu.items.length>0) {
                        button.menu.items[0] && button.menu.items[0].setDisabled(true);
                        button.menu.items[2] && button.menu.items[2].setDisabled(true);
                        button.menu.items[3] && button.menu.items[3].setDisabled(true);
                    }
                }, this);
            }
            Common.NotificationCenter.trigger('reviewchanges:turn', 'off');
        }
    };

    Common.NotificationCenter.on('document:ready', afterDocReady);
})();
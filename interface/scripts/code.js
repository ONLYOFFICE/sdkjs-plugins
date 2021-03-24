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

    $('#box-document-title').hide();
    $('#left-menu').hide();
    $('#right-menu').hide();
    $('#toolbar .toolbar').css('background-color','red');
    $('#toolbar #asc-gen9').hide();

    var viewportController;
    try { viewportController = DE.getController('Viewport'); } catch(e) {
         try { viewportController = PE.getController('Viewport'); } catch(e) {
             try { viewportController =  SSE.getController('Viewport'); } catch(e) {}
         }
    }
    if (viewportController) {
        viewportController.onLayoutChanged('toolbar');
        viewportController.onLayoutChanged('rightmenu');
        viewportController.onLayoutChanged('leftmenu');
        viewportController.onLayoutChanged();
    }

    var afterDocReady = function(){
        $('#toolbar #id-toolbar-btn-hidebars > ul > li:nth-child(2)').hide();
        $('#toolbar #id-toolbar-btn-showmode > ul > li:nth-child(2)').hide();
    };

    Common.NotificationCenter.on('document:ready', afterDocReady);
})();
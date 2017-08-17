(function() {

    $('#header').hide();
    $('#left-menu').hide();
    $('#right-menu').hide();
    $('#toolbar .toolbar').css('background-color','red');
    $('#toolbar #id-toolbar-full-placeholder-btn-settings').hide();

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
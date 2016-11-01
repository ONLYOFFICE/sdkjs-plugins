(function() {

    $('#header').hide();
    //$('#toolbar').hide();
    $('#left-menu').hide();
    $('#right-menu').hide();
    $('#toolbar .toolbar').css('background-color','red');

    var viewportController = DE.getController('Viewport');

    if (viewportController) {
        viewportController.onLayoutChanged('toolbar');
        viewportController.onLayoutChanged('rightmenu');
        viewportController.onLayoutChanged('leftmenu');
        viewportController.onLayoutChanged();
    }

})();
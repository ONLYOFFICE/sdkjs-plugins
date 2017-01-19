(function() {
    var afterDocReady = function(){
        var _agent,
            _mainController;

        var showClippy = function() {
            clippy.load('Links', function(agent) {
                _agent = agent;
                _agent.moveTo(50, 100);
                _agent.show();
            });
        };

        var initActions = function() {
            try { _mainController = DE.getController('Main'); } catch(e) {
                try { _mainController = PE.getController('Main'); } catch(e) {
                    try { _mainController =  SSE.getController('Main'); } catch(e) {}
                }
            }

            if (_mainController) {
                var api = _mainController.api;

                api.asc_registerCallback('asc_onPrintUrl', function() {
                    _agent.stop();
                    _agent.play('Print');
                });
                api.asc_registerCallback('asc_onStartAction', function() {
                    _agent.stop();
                    _agent.play('Processing');
                });
                api.asc_registerCallback('asc_onEndAction', function() {
                    _agent.stop();
                    _agent.play('Writing');
                });
            }
        }

        $('head').append('<link rel="stylesheet" href="https://s3.amazonaws.com/clippy.js/clippy.css" type="text/css" />');
        $.ajax({
            url: 'https://s3.amazonaws.com/clippy.js/clippy.min.js',
            dataType: "script",
            success: function() {
                showClippy();
                initActions();
            }
        });
    };

    Common.NotificationCenter.on('document:ready', afterDocReady);
})();


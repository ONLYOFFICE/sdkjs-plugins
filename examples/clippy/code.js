(function() {
    var afterDocReady = function(){
        var _agent = null,
            _agentDfd = null,
            _mainController,
            initMenu;

        var switchAgent = function (newAgent) {
            var switchAgentInternal = function (newAgent) {
                _agentDfd = $.Deferred();

                clippy.load(newAgent, function (agent) {
                    _agentDfd.resolve(agent);
                    _agent = agent;

                    agent.moveTo(50, 100);
                    agent.show();

                    initMenu();
                    initActions();
                });
                return _agentDfd.promise();
            };

            if (_agentDfd && 'resolved' === _agentDfd.state()) {
                var dfd = $.Deferred(),
                    agent = function (func) {
                        if (!_agentDfd) return;
                        var dfd = _agentDfd;
                        if ($.isFunction(func) && dfd) {
                            dfd.done(func);
                        }
                        return dfd.promise();
                    };

                agent(function (agent) {
                    agent.hide(false, function () {
                        switchAgentInternal(newAgent).done(dfd.resolve);
                    })
                });

                return dfd.promise();
            }

            return switchAgentInternal(newAgent);
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
                // api.asc_registerCallback('asc_onStartAction', function() {
                //     _agent.stop();
                //     _agent.play('Processing');
                // });
                // api.asc_registerCallback('asc_onEndAction', function() {
                //     _agent.stop();
                //     _agent.play('Writing');
                // });
            }
        };

        var showAbout = function() {
            var about = new Common.UI.Window({
                title: 'About',
                width: 400,
                height: 210,
                tpl: [
                    '<div class="box" style="padding: 20px;">',
                        '<p style="font-size: 15px">Clippy.js Add-on</p>',
                        '<p style="font-size: 12px"><a href="https://github.com/smore-inc/clippy.js" target="_blank">Clippy.js</a> is a full Javascript implementation of Microsoft Agent (AKA Clippy and friends), ready to be embedded in any website. Pick an assistant below and mash some animation buttons! Our favorite is Links the cat.</p>',
                        '<p style="font-size: 12px"><a href="https://github.com/ONLYOFFICE/sdkjs-plugins/tree/develop/clippy" target="_blank">Source code</a></p>',
                    '</div>'
                ].join('')
            });

            about.show();
        };

        initMenu = function() {
            var menuAgents = new Common.UI.Menu({
                menuAlign: 'tl-tr',
                items: [
                    { caption: 'Bonzi', value: 'Bonzi' },
                    { caption: 'Clippy', value: 'Clippy' },
                    { caption: 'F1', value: 'F1' },
                    { caption: 'Genie', value: 'Genie' },
                    { caption: 'Genius', value: 'Genius' },
                    { caption: 'Links', value: 'Links' },
                    { caption: 'Merlin', value: 'Merlin' },
                    { caption: 'Peedy', value: 'Peedy' },
                    { caption: 'Rocky', value: 'Rocky' },
                    { caption: 'Rover', value: 'Rover' }
                ]
            });

            var menu = new Common.UI.Menu({
                menuAlign: 'tl-tr',
                items: [
                    {
                        caption: 'Agents',
                        menu: menuAgents
                    },
                    { caption: 'Hide', value: 'hide' },
                    { caption: 'About', value: 'about' }
                ]
            });

            menu.render($('.clippy'));

            menu.on('item:click', function(menu, item, e) {
                if ('hide' === item.value) {
                    _agent.hide(false);
                } else if ('about' === item.value) {
                    showAbout();
                }
            });

            menuAgents.on('item:click', function(menu, item, e) {
                switchAgent(item.value);
            });

            $('body').on('mousedown', function(e) {
                if (menu.isVisible()) {
                    setTimeout(function(){
                        menu.hide();
                        $('.clippy').removeClass('open');
                    }, 100);
                }
            });

            $('.clippy').on('contextmenu', function(e) {
                menu.show();
            })
        };

        $('head').append('<link rel="stylesheet" href="https://s3.amazonaws.com/clippy.js/clippy.css" type="text/css" />');
        $.ajax({
            url: 'https://s3.amazonaws.com/clippy.js/clippy.min.js',
            dataType: "script",
            success: function() {
                switchAgent('Links');
            }
        });
    };

    Common.NotificationCenter.on('document:ready', afterDocReady);
})();


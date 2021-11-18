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
(function(window, undefined) {
    var _agent = null,
    _agentDfd = null;

    window.Asc.plugin.init = function() {
         var switchAgent = function (newAgent) {
            var switchAgentInternal = function (newAgent) {
                _agentDfd = $.Deferred();

                clippy.load(newAgent, function (agent) {
                    _agentDfd.resolve(agent);
                    _agent = agent;

                    agent.moveTo(50, 50);
                    agent.show();
                });
                return _agentDfd.promise();
            };

            if (_agentDfd && _agentDfd.isResolved()) {
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

        switchAgent('Clippy');

        $('#agent-type').on('change', function(e) {
            var el = $(e.currentTarget),
                name = el.val();
            if (!name) return;
            switchAgent(name);
        });
    };

    window.Asc.plugin.button = function(id) {
        this.executeCommand("close", '');
    };

})(window, undefined);


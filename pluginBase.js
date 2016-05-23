(function(window, undefined){

    window.Asc = window.Asc || {};
    window.Asc.plugin = null;

    // должны быть методы
    // init(data);
    // button(id)

    window.plugin_sendMessage = function sendMessage(data)
    {
        window.parent.postMessage(data, "*");
    };

    function onMessage(event)
    {
        if (!window.Asc.plugin)
            return;

        if (typeof(event.data) == "string")
        {
            var pluginData = {};
            try
            {
                pluginData = JSON.parse(event.data);
            }
            catch(err)
            {
                pluginData = {};
            }

            if (pluginData.guid != window.Asc.plugin.guid)
                return;

            var type = pluginData.type;

            if (type == "init")
                window.Asc.plugin.info = pluginData;

            switch (type)
            {
                case "init":
                {
                    window.Asc.plugin.executeCommand = function(type, data)
                    {
                        window.Asc.plugin.info.type = type;
                        window.Asc.plugin.info.data = data;

                        var _message = "";
                        try
                        {
                            _message = JSON.stringify(window.Asc.plugin.info);
                        }
                        catch(err)
                        {
                            _message = "{ \"" + type + "\" : \"" + data + "\" }";
                        }
                        window.plugin_sendMessage(_message);
                    };

                    window.Asc.plugin.init(window.Asc.plugin.info.data);
                    break;
                }
                case "button":
                {
                    window.Asc.plugin.button(parseInt(pluginData.button));
                    break;
                }
                default:
                    break;
            }
        }
    }

    if (window.addEventListener)
    {
        window.addEventListener("message", onMessage, false);
    }
    else
    {
        window.attachEvent("onmessage", onMessage);
    }

    window.onload = function()
    {
        var obj = {
            type : "initialize",
            guid : window.Asc.plugin.guid
        };
        window.plugin_sendMessage(JSON.stringify(obj));
    };
})(window, undefined);
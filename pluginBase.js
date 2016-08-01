(function(window, undefined){

    var g_isMouseSendEnabled = false;

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

                    window.Asc.plugin.resizeWindow = function(width, height)
                    {
                        var data = "{\"width\":" + width + ",\"height\":" + height + "}";

                        window.Asc.plugin.info.type = "resize";
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
                case "enableMouseEvent":
                {
                    g_isMouseSendEnabled = pluginData.isEnabled;
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

    window.onmousemove = function(e)
    {
        if (!g_isMouseSendEnabled || !window.Asc.plugin || !window.Asc.plugin.executeCommand)
            return;

        var _x = (undefined === e.clientX) ? e.pageX : e.clientX;
        var _y = (undefined === e.clientY) ? e.pageY : e.clientY;

        window.Asc.plugin.executeCommand("onmousemove", "{ \"x\": " + _x + ", \"y\": " + _y + " }");

    };
    window.onmouseup   = function(e)
    {
        if (!g_isMouseSendEnabled || !window.Asc.plugin || !window.Asc.plugin.executeCommand)
            return;

        var _x = (undefined === e.clientX) ? e.pageX : e.clientX;
        var _y = (undefined === e.clientY) ? e.pageY : e.clientY;

        window.Asc.plugin.executeCommand("onmouseup", "{ \"x\": " + _x + ", \"y\": " + _y + " }");
    };

})(window, undefined);
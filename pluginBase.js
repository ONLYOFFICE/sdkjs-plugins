(function(window, undefined){

    window.Asc = window.Asc || {};
    window.Asc.plugin = null;

    // должны быть методы
    // init(data);
    // button(id)

    function onMessage(event)
    {
        if (!window.Asc.plugin)
            return;

        if (typeof(event.data) == "string")
        {
            var i1 = event.data.indexOf(";");
            if (-1 == i1)
                return;

            var guid = event.data.substr(0, i1);
            if (guid != window.Asc.plugin.guid)
                return;

            var i2 = event.data.indexOf(";", i1 + 1);
            if (-1 == i2)
                return;

            var name = event.data.substr(i1 + 1, i2 - i1 - 1);
            var value = event.data.substr(i2 + 1);

            if (window.Asc.plugin[name])
                window.Asc.plugin[name](value);
        }
    }

    function sendMessage(name, data)
    {
        window.parent.postMessage(window.Asc.plugin.guid + ";" + name + ";" + data, "*");
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
        sendMessage("initialize", "");
    };

    window.Asc.plugin_sendMessage = sendMessage;

})(window, undefined);
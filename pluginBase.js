(function(window, undefined){

    window.Asc = window.Asc || {};
    window.Asc.plugin = {};

    function CopyObj(Obj, ObjectExt)
    {
        if( !Obj || !("object" == typeof(Obj) || "array" == typeof(Obj)) )
        {
            return Obj;
        }

        var c = (ObjectExt === undefined) ? {} : ObjectExt;
        var p, v;
        for(p in Obj)
        {
            if(Obj.hasOwnProperty(p))
            {
                v = Obj[p];
                if (v && "object" === typeof v)
                {
                    c[p] = CopyObj(v);
                }
                else
                {
                    c[p] = v;
                }
            }
        }
        return c;
    }

    window.onload = function()
    {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "./config.json", true);
        xhr.responseType = "json";
        xhr.onload = function()
        {
            if (xhr.status == 200)
            {
                var objConfig = xhr.response;

                // extend window.Asc.plugin object
                CopyObj(objConfig, window.Asc.plugin);

                var obj = {
                    type : "initialize",
                    guid : window.Asc.plugin.guid
                };

                window.parent.postMessage(JSON.stringify(obj), "*");
            }
        };
        xhr.send();
    };

    function onMessage(event)
    {
        if (!window.Asc.plugin)
            return;

        if (window.plugin_onMessage)
        {
            window.plugin_onMessage(event);
            return;
        }

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

            if (pluginData.type = "plugin_init")
                eval(pluginData.data);
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

})(window, undefined);
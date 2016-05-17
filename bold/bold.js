(function(window, undefined){

    window.Asc.plugin = {};

    window.Asc.plugin.guid = "{14E46CC2-5E56-429C-9D55-1032B596D928}";

    window.Asc.plugin.init = function()
    {
        this.button(-1);
    };

    window.Asc.plugin.button = function(id)
    {
        window.Asc.plugin_sendMessage("close", "window.g_asc_plugins.api.put_TextPrBold(true);");
    };

})(window, undefined);

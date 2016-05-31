(function(window, undefined){

    window.Asc.plugin.init = function()
    {
        this.button(-1);
    };

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "Api.put_TextPrBold(true);");
    };

})(window, undefined);

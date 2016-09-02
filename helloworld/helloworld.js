(function(window, undefined){

    window.Asc.plugin.init = function()
    {
        var sScript = 'var oDocument = Api.GetDocument();';
        sScript += 'oDocument.CreateNewHistoryPoint();';
        sScript += 'oParagraph = Api.CreateParagraph();';
        sScript += 'oParagraph.AddText(\'Hello word!\');';
        sScript += 'oDocument.InsertContent([oParagraph]);';
        window.Asc.plugin.info.recalculate = true;
        this.executeCommand("close", sScript);
    };

    window.Asc.plugin.button = function(id)
    {
    };

})(window, undefined);

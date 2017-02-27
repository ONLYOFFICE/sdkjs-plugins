(function(window, undefined){
    var sLastSavedImageUrl = '';
    var bCloseAfterSave = false;
    var featherEditor = null;
    var bInit = false;

    function createScriptFromImage(oImage){
        var sScript = '';

        if(oImage) {
            var sSrc = oImage.src;
            switch (window.Asc.plugin.info.editorType) {
                case 'word': {
                    sScript += 'var oDocument = Api.GetDocument();';
                    sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';

                        sScript += '\noParagraph = Api.CreateParagraph();';
                        sScript += '\narrInsertResult.push(oParagraph);';
                        var nEmuWidth = ((oImage.width / 96) * 914400) >> 0;
                        var nEmuHeight = ((oImage.height / 96) * 914400) >> 0;
                        sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                        sScript += '\noParagraph.AddDrawing(oImage);';
                    sScript += '\noDocument.InsertContent(arrInsertResult);';
                    break;
                }
                case 'slide':{
                    sScript += 'var oPresentation = Api.GetPresentation();';

                    sScript += '\nvar oSlide = oPresentation.GetCurrentSlide()';
                    sScript += '\nif(oSlide){';
                    sScript += '\nvar fSlideWidth = oSlide.GetWidth(), fSlideHeight = oSlide.GetHeight();';
                    var nEmuWidth = ((oImage.width / 96) * 914400) >> 0;
                    var nEmuHeight = ((oImage.height / 96) * 914400) >> 0;
                    sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                    sScript += '\n oImage.SetPosition((fSlideWidth -' + nEmuWidth +  ')/2, (fSlideHeight -' + nEmuHeight +  ')/2);';
                    sScript += '\n oSlide.AddObject(oImage);';
                    sScript += '\n}'
                    break;
                }
                case 'cell':{
                    sScript += '\nvar oWorksheet = Api.GetActiveSheet();';
                    sScript += '\nif(oWorksheet){';
                    sScript += '\nvar oActiveCell = oWorksheet.GetActiveCell();';
                    sScript += '\nvar nCol = oActiveCell.GetCol(), nRow = oActiveCell.GetRow();';
                    var nEmuWidth = ((oImage.width / 96) * 914400) >> 0;
                    var nEmuHeight = ((oImage.height / 96) * 914400) >> 0;
                    sScript += '\n oImage = oWorksheet.AddImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ', nCol, 0, nRow, 0);';
                    sScript += '\n}';
                    break;
                }
            }
        }
        return sScript;
    }


    window.Asc.plugin.init = function(sHtml){
        var oImage = $(sHtml).find('img')[0];
        if(!oImage){
            oImage = document.createElement("img");
            //white rect
            oImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAFbCAIAAAD6KAaQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARTSURBVHhe7dQBAQAACMMg+5e+QQYhuAE0+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAd0LA94pGo80Y4WHoAAAAASUVORK5CYII=';
            sLastSavedImageUrl = oImage.src;
        }
        if(oImage){
            this.resizeWindow(800, 800, 800, 800, 1920, 1080);
            featherEditor = new Aviary.Feather({
                apiKey: '1234567',
                appendTo: 'editor_container',
                onLoad: function(){
                    bInit = true;
                    featherEditor.launch(
                        {
                            image: oImage
                        }
                    )
                },
                onSave: function(imageID, newURL) {
                    oImage = new Image();
                    oImage.onload = function(){
                        if(bCloseAfterSave){
                            window.Asc.plugin.info.recalculate = true;
                            window.Asc.plugin.executeCommand("close", createScriptFromImage(oImage));
                        }
                    }
                    oImage.src = newURL;
                    sLastSavedImageUrl = newURL;
                },
                onError: function(e){
                },
                onClose: function(isDirty){
                    window.Asc.plugin.executeCommand("close", "");
                },
                noCloseButton: true

            });
        }
    };

    window.Asc.plugin.button = function(id){
        if (id == 0){
            if(bInit){
                bCloseAfterSave = true;
                featherEditor.save();
            }
        }
        else{
            this.executeCommand("close", "");
        }
    };
})(window, undefined);

var oImage = false;
var imageEditor = null;

(function(window, undefined){

    var bCloseAfterSave = false;
    var oFeatherEditor = null;
    var bInit = false;
    var oMessageButton = null;
    var fEventListener = null;

    window.Asc.plugin.init = function(sHtml){
		
        oImage = $(sHtml)[0];
        if (!oImage || !$(oImage).is('img')) {
            oImage = $(sHtml).find('img')[0];
        }
        if (!oImage) {
            oImage = document.createElement("img");
            //white rect
            oImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMrSURBVHhe7dMxAQAADMOg+TfdycgDHrgBKQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJITU9vSZzteUMFOrAAAAAElFTkSuQmCC';
            oImage.width = 300;
			oImage.height = 300;
		}
        imageEditor = new tui.ImageEditor('#tui-image-editor-container', {

            includeUI: {
                loadImage: {

                    path: oImage.src,
                    name: 'Image'
                },
                theme: whiteTheme,
                initMenu: 'filter',
                menuBarPosition: 'bottom',
                locale: (typeof window.Asc.plugin.info.lang === "string" ? window.Asc.plugin.info.lang.split('-')[0] : 'en'),


            },
            cssMaxWidth: 700,
            cssMaxHeight: 500,
            selectionStyle: {
                cornerSize: 20,
                rotatingPointOffset: 70
            }
        });
       
	   window.Asc.plugin.resizeWindow( undefined, undefined, oImage.width, oImage.height, 0, 0);				//resize plugin window	
      
	  if (oImage != false)
            bInit = true;
        window.onresize = function () {
            imageEditor.ui.resizeEditor();
        }  

    };

    window.Asc.plugin.button = function (id) {
        if (id == 0) {
            var dataURL = imageEditor.toDataURL();
            oImage.src = dataURL;
            var saveImage = createScript(dataURL, oImage.width, oImage.height);
            window.Asc.plugin.info.recalculate = true;
            window.Asc.plugin.executeCommand("close", saveImage);
        } else {
            this.executeCommand("close", "");
        }
    };

    window.createScript = function (sUrl, width, height) {
        var sScript = '';
        switch (window.Asc.plugin.info.editorType) {
            case 'word': {
                sScript += 'var oDocument = Api.GetDocument();';
                sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';
                sScript += '\noParagraph = Api.CreateParagraph();';
                sScript += '\narrInsertResult.push(oParagraph);';
                var nEmuWidth = ((width / 96) * 914400 + 0.5) >> 0;
                var nEmuHeight = ((height / 96) * 914400 + 0.5) >> 0;
                sScript += '\n oImage = Api.CreateImage(\'' + sUrl + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                sScript += '\noParagraph.AddDrawing(oImage);';
                sScript += '\noDocument.InsertContent(arrInsertResult);';
                break;
            }
            case 'cell': {
                sScript += 'var oWorksheet = Api.GetActiveSheet();';
                var nEmuWidth = ((width / 96) * 914400 + 0.5) >> 0;
                var nEmuHeight = ((height / 96) * 914400 + 0.5) >> 0;
                sScript += '\n oWorksheet.ReplaceCurrentImage(\'' + sUrl + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                break;
            }
            case 'slide': {
                sScript += 'var oPresentation = Api.GetPresentation();';
                var nEmuWidth = ((width / 96) * 914400 + 0.5) >> 0;
                var nEmuHeight = ((height / 96) * 914400 + 0.5) >> 0;
                sScript += '\n oPresentation.ReplaceCurrentImage(\'' + sUrl + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                break;
            }
        }
        return sScript;
    };
	
})(window, undefined);
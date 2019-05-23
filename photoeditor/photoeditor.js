
var oImage = false;
var imageEditor = null;

(function(window, undefined){

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
        });	
		var imageHeight = null;
      oImage.height > 500 ? imageHeight = 500 : imageHeight = oImage.height;
        window.Asc.plugin.resizeWindow( undefined, undefined, 870, imageHeight + 300, 0, 0);
    };

    window.Asc.plugin.button = function (id) {

        if (id == 0) {
            if (imageEditor.getDrawingMode() === 'CROPPER') {
                var imageData = imageEditor.crop(imageEditor.getCropzoneRect()).then(function () {
                        saveImage();
                    }
                );
            } else {
                saveImage();
            }
        } else {
            this.executeCommand("close", "");
        }
    };
	
    window.saveImage = function () {

	        Asc.scope.dataURL = imageEditor.toDataURL();
			var editorDimension = imageEditor.getCanvasSize();
			Asc.scope.editorDimensionWidth = editorDimension.width;
			Asc.scope.editorDimensionHeight = editorDimension.height;
            var saveImage = createScript();
    }
    window.createScript = function () {

        switch (window.Asc.plugin.info.editorType) {
            case 'word': {
                window.Asc.plugin.callCommand(function() {
                    var oDocument = Api.GetDocument();
                    var oParagraph, oRun, arrInsertResult = [], oImage;
                    oParagraph = Api.CreateParagraph();
                    arrInsertResult.push(oParagraph);
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oImage = Api.CreateImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                    oParagraph.AddDrawing(oImage);
                    oDocument.InsertContent(arrInsertResult);
                }, true);
                break;

            }
            case 'cell': {
                window.Asc.plugin.callCommand(function() {
                    var oWorksheet = Api.GetActiveSheet();
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oWorksheet.ReplaceCurrentImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                }, true);
                break;
            }
            case 'slide': {
                window.Asc.plugin.callCommand(function() {
                    var oPresentation = Api.GetPresentation();
                    var nEmuWidth  = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oPresentation.ReplaceCurrentImage(Asc.scope.dataURL , nEmuWidth , nEmuHeight);
                }, true);
                break;
            }

        }
    };
})(window, undefined);
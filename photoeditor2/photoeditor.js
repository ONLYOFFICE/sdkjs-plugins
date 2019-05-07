
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
            oImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAFbCAIAAAD6KAaQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARTSURBVHhe7dQBAQAACMMg+5e+QQYhuAE0+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAd0LA94pGo80Y4WHoAAAAASUVORK5CYII=';
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


            },
            cssMaxWidth: 700,
            cssMaxHeight: 1200,
            selectionStyle: {
                cornerSize: 20,
                rotatingPointOffset: 70
            }
        });

        if (oImage != false)
            bInit = true;
        window.onresize = function () {
            imageEditor.ui.resizeEditor();
        }
        // this.resizeWindow(10000, 10000, 10000, 10000, 10000, 10000);
        // if(typeof Aviary === "undefined"){
        //     this.executeCommand("close", "");
        // 	return;
        // }


        // oFeatherEditor = new Aviary.Feather({
        //     apiKey: '1234567',
        //     appendTo: 'editor_container',
        // 	theme: 'minimum',
        // 	language: (typeof window.Asc.plugin.info.lang === "string" ? window.Asc.plugin.info.lang.split('-')[0] : 'en'),
        //    onLoad: function(){
        //         bInit = true;
        //         oFeatherEditor.launch(
        //             {
        //                 image: oImage
        //             }
        //         )
        //     },
        //     onSave: function(imageID, newURL) {
        //         oImage.src = newURL;
        // 		var oImageDimensions = oFeatherEditor.getImageDimensions();
        // 		var sScript = createScript(newURL, oImageDimensions.width, oImageDimensions.height);
        // 		window.Asc.plugin.info.recalculate = true;
        // 		window.Asc.plugin.executeCommand("close", sScript);
        //     },
        //     onError: function(e){
        // 			showAlert(e.message, function(){
        // 				window.Asc.plugin.executeCommand("close", "");
        // 			});
        //     },
        //     onClose: function(isDirty){
        //         window.Asc.plugin.executeCommand("close", "");
        //     }
        // });

    };

    window.Asc.plugin.button = function (id) {
        if (id == 0) {
            var dataURL = imageEditor.toDataURL();
            oImage.src = dataURL;
            var saveImage = createScript(dataURL, getEditorDimension.width, getEditorDimension.height);
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
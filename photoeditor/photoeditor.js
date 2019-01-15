(function(window, undefined){

    var bCloseAfterSave = false;
    var oFeatherEditor = null;
    var bInit = false;
    var oImage = false;

    window.Asc.plugin.init = function(sHtml){
		
		function showAlert(sMessage, fCallback){
			var oMessageMask = document.getElementById("idMessageMask");
			oMessageMask.style.display = "block";
			var oMessageDiv = document.getElementById("idMessage");
			oMessageDiv.style.display = "block";
			var oMaskParagraph = document.getElementById("message_paragraph");
			oMaskParagraph.textContent = sMessage;
			var oMessageButton = document.getElementById("message_button");			
			var fEventListener = function(e){
				oMessageMask.style.display = "none";
				oMessageDiv.style.display = "none";
				oMaskParagraph.textContent = "";
				oMessageButton.removeEventListener("click", fEventListener);
				fCallback();
			};
			oMessageButton.addEventListener("click", fEventListener);
		}
		
		if(typeof $ === "undefined" || typeof Aviary === "undefined"){		
			showAlert("There is no Internet connection", function(){
				window.Asc.plugin.executeCommand("close", "");
			});            
			return;
		}

        oImage = $(sHtml)[0];
        if(!oImage || !$(oImage).is('img')){
            oImage = $(sHtml).find('img')[0];
        }
        if(!oImage){
            oImage = document.createElement("img");
            //white rect
            oImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAAFbCAIAAAD6KAaQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARTSURBVHhe7dQBAQAACMMg+5e+QQYhuAE0+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAdUOE7oMJ3QIXvgArfARW+Ayp8B1T4DqjwHVDhO6DCd0CF74AK3wEVvgMqfAdU+A6o8B1Q4TugwndAhe+ACt8BFb4DKnwHVPgOqPAd0LA94pGo80Y4WHoAAAAASUVORK5CYII=';
        }

        this.resizeWindow(10000, 10000, 10000, 10000, 10000, 10000);
		if(typeof Aviary === "undefined"){			
            this.executeCommand("close", "");
			return;
		}
        oFeatherEditor = new Aviary.Feather({
            apiKey: '1234567',
            appendTo: 'editor_container',
			theme: 'minimum',
			language: (typeof window.Asc.plugin.info.lang === "string" ? window.Asc.plugin.info.lang.split('-')[0] : 'en'),
            onLoad: function(){
                bInit = true;
                oFeatherEditor.launch(
                    {
                        image: oImage
                    }
                )
            },
            onSave: function(imageID, newURL) {
                oImage.src = newURL;                
				var oImageDimensions = oFeatherEditor.getImageDimensions();
				var sScript = createScript(newURL, oImageDimensions.width, oImageDimensions.height);
				window.Asc.plugin.info.recalculate = true;
				window.Asc.plugin.executeCommand("close", sScript);                
            },
            onError: function(e){
					showAlert(e.message, function(){
						window.Asc.plugin.executeCommand("close", "");
					});            
            },
            onClose: function(isDirty){
                window.Asc.plugin.executeCommand("close", "");
            }
        });

    };

    window.Asc.plugin.button = function(id){
        if (id == 0){
            if(bInit){
                bCloseAfterSave = true;
                oFeatherEditor.save();
            }
            else{
                this.executeCommand("close", "");
            }
        }
        else{
            this.executeCommand("close", "");
        }
    };
    function createScript(sUrl, width, height){
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
            case 'cell':{
                sScript += 'var oWorksheet = Api.GetActiveSheet();';
                var nEmuWidth = ((width / 96) * 914400 + 0.5) >> 0;
                var nEmuHeight = ((height / 96) * 914400 + 0.5) >> 0;
                sScript += '\n oWorksheet.ReplaceCurrentImage(\'' + sUrl + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                break;
            }
            case 'slide':{
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
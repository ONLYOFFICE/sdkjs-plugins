(function(window, undefined){

    window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
    
    function escapeHtml(string) {
        var res = string;
        res = res.replace(/[\', \", \\,]/g, function (sSymbol) {
            return '\\' + sSymbol;
        });
        return res;
    }

    var arrParsedData = [];

    window.Asc.plugin.init = function(){

        this.resizeWindow(592, 100, 592, 100, 592, 100);
        var nStartFilesCount = 0, arrImages;

        $( window ).resize(function(){
            updateScroll();
        });

        function updateScroll(){
            var container = document.getElementById('scrollable-image-text-div');
            Ps.update(container);
            if($('.ps__scrollbar-y').height() === 0){
                $('.ps__scrollbar-y').css('border-width', '0px');
            }
            else{
                $('.ps__scrollbar-y').css('border-width', '1px');
            }
        }
        var container = document.getElementById('scrollable-image-text-div');
        Ps.initialize(container, {
            theme: 'custom-theme'
        });

        $('#load-file-button-id').click(
            function (e) {
                $('#images-input').click();
            }
        );

        $('#images-input').change(function(e) {
            var arrFiles = e.target.files;
			//check for images in file list
			var arrFiles2 = [];
			for(var i = 0; i < arrFiles.length; ++i){
				if(arrFiles[i] && arrFiles[i].type && arrFiles[i].type.indexOf('image') === 0){
					arrFiles2.push(arrFiles[i]);
				}
				else{
					alert(arrFiles[i].name + "\nOCR plugin cannot read this file.");
				}
			}
			arrFiles = arrFiles2;
            if(arrFiles.length > 0){
                window.Asc.plugin.resizeWindow(800, 571, 800, 571);

                var oImagesContainer = document.getElementById('image-container-div');
                while (oImagesContainer.firstChild) {
                    oImagesContainer.removeChild(oImagesContainer.firstChild);
                }
                var oTextContainer = document.getElementById('text-container-div');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                arrParsedData.length = 0;
                var oFileReader = new FileReader();
                var nIndex = 0;
                arrImages = [];                
                $('#status-label').text('Loading images');
                oFileReader.onloadend = function() {
                    var oImgElement = document.createElement('img');
                    oImgElement.src = oFileReader.result;
                    oImgElement.style.width = '100%';
                    arrImages.push(oImgElement);
                    oImagesContainer.appendChild(oImgElement);
                    ++nIndex;
                    if(nIndex < arrFiles.length){
                        oFileReader.readAsDataURL(arrFiles[nIndex]);
                        $(oImgElement).css("margin-bottom", "10px");
                    }
                    else{
                        document.getElementById('lang-select').removeAttribute('disabled');
                        document.getElementById('recognize-button').removeAttribute('disabled');
                        nStartFilesCount = arrImages.length;
                        $('#status-label').text('');
                        $('#scrollable-image-text-div').css('display', 'inline-block');

                    }
                    updateScroll();
                };
                oFileReader.readAsDataURL(arrFiles[nIndex]);
            }
        });
        $('#recognize-button').click(
            function () {

                var arrImagesCopy = [].concat(arrImages);
                for (var i = 0; i < arrImagesCopy.length; i++)
                {
                    if (arrImagesCopy[i] && (0 == arrImagesCopy[i].naturalWidth) && (0 == arrImagesCopy[i].naturalHeight))
                    {
                        arrImagesCopy.splice(i, 1);
                        i--;
                    }
                }
                if (0 == arrImagesCopy.length)
                    return;

                var oTextContainer = document.getElementById('text-container-div');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                arrParsedData.length = 0;
                document.getElementById('recognize-button').setAttribute('disabled', '');
                document.getElementById('lang-select').setAttribute('disabled', '');
                document.getElementById('load-file-button-id').setAttribute('disabled', '');
                var fTesseractCall = function(){
                    Tesseract.recognize(arrImagesCopy.splice(0, 1)[0], {lang: $('#lang-select option:selected')[0].value}).progress(function (progress) {
                        if(progress && progress.status === "recognizing text"){
                            var nPercent =  (100*(progress.progress + nStartFilesCount - arrImagesCopy.length - 1)/nStartFilesCount) >> 0;
                            $('#status-label').text('Recognizing: '+ nPercent + '%');
                        }
                    }).catch(function(err){						
                                $('#status-label').text('');
                                document.getElementById('recognize-button').removeAttribute('disabled');
                                document.getElementById('lang-select').removeAttribute('disabled');
								document.getElementById('load-file-button-id').removeAttribute('disabled', '');
						
					}).then(function(result){						
						 document.getElementById('text-container-div').appendChild($(result.html)[0]);
                            arrParsedData.push(result);
                            updateScroll();
                            if(arrImagesCopy.length > 0){
                                fTesseractCall();
                            }
							else{								
                                $('#status-label').text('');
                                document.getElementById('recognize-button').removeAttribute('disabled');
                                document.getElementById('lang-select').removeAttribute('disabled');
								document.getElementById('load-file-button-id').removeAttribute('disabled', '');
							}
					});
                };
                $('#status-label').text('Recognizing: 0%');
                fTesseractCall();
            }
        );
    };

    window.Asc.plugin.button = function(id){
        if (id == 0){
            var sScript = '';
            sScript += 'var oDocument = Api.GetDocument();';
            sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oTextPr;';

            for(var i = 0; i < arrParsedData.length; ++i){
                var oCurData = arrParsedData[i];
                for(var j = 0;  j < oCurData.paragraphs.length; ++j){
                    var oCurParagraph = oCurData.paragraphs[j];
                    sScript += '\noParagraph = Api.CreateParagraph();';
                    sScript += '\narrInsertResult.push(oParagraph);';

                    for(var t = 0; t < oCurParagraph.lines.length; ++t){
                        var oCurLine = oCurParagraph.lines[t];
                        if(t > 0 &&  t < oCurParagraph.lines.length - 1){
                            //sScript += '\noParagraph.AddLineBreak();';
                        }
                        for(var k = 0; k < oCurLine.words.length; ++k){
                            var oWord = oCurLine.words[k];
                            var sText = oWord.text + (k < oCurLine.words.length - 1 ? ' ' : '');
                            sText = escapeHtml(sText);
                            sScript += '\noRun = oParagraph.AddText(\'' + sText + '\');';
                            sScript += '\noTextPr = oRun.GetTextPr();';
                            var arrFontName = oWord.font_name.split('_');
                            var sFontName = '';
                            for(var s = 0; s < arrFontName.length; ++s ){
                                if(arrFontName[s] === 'Bold'){
                                    sScript += '\noTextPr.SetBold(true);';
                                }
                                else if(arrFontName[s] === 'Italic'){
                                    sScript += '\noTextPr.SetItalic(true);';
                                }
                                else if(arrFontName[s] === 'Strikeout'){
                                    sScript += '\noTextPr.SetStrikeout(true);';
                                }
                                else{

                                    if(sFontName != ''){
                                        sFontName += ' ';
                                    }
                                    sFontName += arrFontName[s];
                                }
                            }
                            sScript += '\noTextPr.SetFontFamily(\'' + sFontName + '\');';
                            sScript += '\noTextPr.SetFontSize(' + ((oWord.font_size * 5 )>> 0) + ');';
                        }
                    }
                }
            }
            sScript += '\noDocument.InsertContent(arrInsertResult);';
            window.Asc.plugin.info.recalculate = true;
            this.executeCommand("close", sScript);
        }
        else{
            this.executeCommand("close", "");
        }
    };

})(window, undefined);
(function(window, undefined){

    window.Asc.plugin.arrParsedData = [];

    window.Asc.plugin.init = function(){
        var nStartFilesCount = 0, arrImages;
        $('#input').change(function(e) {
            var arrFiles = e.target.files;
            if(arrFiles.length > 0){
                var oImagesContainer = document.getElementById('container');
                while (oImagesContainer.firstChild) {
                    oImagesContainer.removeChild(oImagesContainer.firstChild);
                }
                var oTextContainer = document.getElementById('text_container');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                window.Asc.plugin.arrParsedData.length = 0;
                var oFileReader = new FileReader();
                var nIndex = 0;
                arrImages = [];
                $('#main_container').mask({'label':''});
                $('#status_label').text('Loading images');
                oFileReader.onloadend = function() {
                    var oImgElement = document.createElement('img');
                    oImgElement.src = oFileReader.result;
                    arrImages.push(oImgElement);
                    var oColElem =  document.getElementById('image_col');
                    if(oImgElement.width > oColElem.clientWidth){
                        oImgElement = document.createElement('img');
                        oImgElement.src = oFileReader.result;
                        var fKoeff = oColElem.clientWidth/oImgElement.width;
                        oImgElement.width = (oImgElement.width*fKoeff) >> 0;
                        oImgElement.height = (oImgElement.height*fKoeff) >> 0;
                    }
                    var oListElement = document.createElement('li');
                    oListElement.appendChild(oImgElement);
                    oImagesContainer.appendChild(oListElement);
                    ++nIndex;
                    if(nIndex < arrFiles.length){
                        oFileReader.readAsDataURL(arrFiles[nIndex]);
                    }
                    else{

                        document.getElementById('lang_select').removeAttribute('disabled');
                        document.getElementById('recognize_button').removeAttribute('disabled');
                        nStartFilesCount = arrImages.length;
                        $('#status_label').text('');
                    }
                };
                oFileReader.readAsDataURL(arrFiles[nIndex]);
            }
        });
        $('#recognize_button').click(
            function () {

                var arrImagesCopy = [].concat(arrImages);
                var oTextContainer = document.getElementById('text_container');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                window.Asc.plugin.arrParsedData.length = 0;
                document.getElementById('recognize_button').setAttribute('disabled', '');
                document.getElementById('lang_select').setAttribute('disabled', '');
                var fTesseractCall = function(){
                    Tesseract.recognize(arrImagesCopy.splice(0, 1)[0], {progress:function (progress) {
                        if(progress && progress.recognized){
                            var nPercent =  (100*(progress.recognized + nStartFilesCount - arrImagesCopy.length - 1)/nStartFilesCount) >> 0;
                            $('#status_label').text('Recognizing: '+ nPercent + '%');
                        }
                    }, lang: $('#lang_select option:selected')[0].value}, function (err, result) {
                        if(!err){
                            document.getElementById('text_container').appendChild($(result.html)[0]);
                            window.Asc.plugin.arrParsedData.push(result);
                            if(arrImagesCopy.length > 0){
                                fTesseractCall();
                            }
                            else{
                                $('#main_container').unmask();
                                $('#status_label').text('');
                                document.getElementById('recognize_button').removeAttribute('disabled');
                                document.getElementById('lang_select').removeAttribute('disabled');
                            }
                        }
                    })
                };
                $('#status_label').text('Recognizing: 0%');
                fTesseractCall();
            }
        );
    };

    window.Asc.plugin.button = function(id){
        if (id == 0){
            var sScript = '';
            sScript += 'var oDocument = Api.GetDocument();';
            sScript += 'oDocument.CreateNewHistoryPoint();';
            sScript += 'var oParagraph, oRun, arrInsertResult = [], oTextPr;';
            var arrParsedData = window.Asc.plugin.arrParsedData;
            for(var i = 0; i < arrParsedData.length; ++i){
                var oCurData = arrParsedData[i];
                for(var j = 0;  j < oCurData.paragraphs.length; ++j){
                    var oCurParagraph = oCurData.paragraphs[j];
                    sScript += 'oParagraph = Api.CreateParagraph();';
                    sScript += 'arrInsertResult.push(oParagraph);';

                    for(var t = 0; t < oCurParagraph.lines.length; ++t){
                        var oCurLine = oCurParagraph.lines[t];
                        if(t > 0 &&  t < oCurParagraph.lines.length - 1){
                            sScript += 'oParagraph.AddLineBreak();';
                        }
                        for(var k = 0; k < oCurLine.words.length; ++k){
                            var oWord = oCurLine.words[k];
                            sScript += 'oRun = oParagraph.AddText(\'' + oWord.text + (k < oCurLine.words.length - 1 ? ' ' : '') + '\');';
                            sScript += 'oTextPr = oRun.GetTextPr();';
                            var arrFontName = oWord.font_name.split('_');
                            var sFontName = '';
                            for(var s = 0; s < arrFontName.length; ++s ){
                                sFontName += arrFontName[s];
                                if(s <  arrFontName.length - 1){
                                    sFontName += ' ';
                                }
                            }
                            sScript += 'oTextPr.SetFontFamily(\'' + sFontName + '\');';
                            sScript += 'oTextPr.SetFontSize(' + ((oWord.font_size * 2 )>> 0) + ');';
                            sScript += 'oRun.OnChangeTextPr(oTextPr);';
                        }
                    }
                }
            }
            sScript += 'oDocument.InsertContent(arrInsertResult);';
            window.Asc.plugin.info.recalculate = true;
            this.executeCommand("close", sScript);
        }
        else{
            this.executeCommand("close", "");
        }
    };

})(window, undefined);
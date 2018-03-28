(function(window, undefined) {

	window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
	};

    var nAmount = 20;//Count images on page
    var widthPix = 185;
    var sEmptyQuery = 'play';
    function createScriptFromArray(aSelected){
        var sScript = '';

        if(aSelected.length > 0) {
            switch (window.Asc.plugin.info.editorType) {
                case 'word': {
                    sScript += 'var oDocument = Api.GetDocument();';
                    sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';

                    for (var i = 0; i < aSelected.length; ++i) {
                        var oElement = aSelected[i];
                        sScript += '\noParagraph = Api.CreateParagraph();';
                        sScript += '\narrInsertResult.push(oParagraph);';
                        var sSrc = oElement.svg.png_full_lossy;
                        var nEmuWidth = ((oElement.dimensions.png_thumb.width / 96) * 914400) >> 0;
                        var nEmuHeight = ((oElement.dimensions.png_thumb.height / 96) * 914400) >> 0;
                        sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                        sScript += '\noParagraph.AddDrawing(oImage);';

                    }
                    sScript += '\noDocument.InsertContent(arrInsertResult);';
                    break;
                }
                case 'slide':{
                    sScript += 'var oPresentation = Api.GetPresentation();';

                    sScript += '\nvar oSlide = oPresentation.GetCurrentSlide()';
                    sScript += '\nif(oSlide){';
                        sScript += '\nvar fSlideWidth = oSlide.GetWidth(), fSlideHeight = oSlide.GetHeight();';
                        for (var i = 0; i < aSelected.length; ++i) {
                            var oElement = aSelected[i];
                            var sSrc = oElement.svg.png_full_lossy;
                            var nEmuWidth = ((oElement.dimensions.png_thumb.width / 96) * 914400) >> 0;
                            var nEmuHeight = ((oElement.dimensions.png_thumb.height / 96) * 914400) >> 0;
                            sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                            sScript += '\n oImage.SetPosition((fSlideWidth -' + nEmuWidth +  ')/2, (fSlideHeight -' + nEmuHeight +  ')/2);';
                            sScript += '\n oSlide.AddObject(oImage);';
                        }
                    sScript += '\n}'
                    break;
                }
                case 'cell':{
                    sScript += '\nvar oWorksheet = Api.GetActiveSheet();';
                    sScript += '\nif(oWorksheet){';
                    sScript += '\nvar oActiveCell = oWorksheet.GetActiveCell();';
                    sScript += '\nvar nCol = oActiveCell.GetCol(), nRow = oActiveCell.GetRow();';
                    for (var i = 0; i < aSelected.length; ++i) {
                        var oElement = aSelected[i];
                        var sSrc = oElement.svg.png_full_lossy;
                        var nEmuWidth = ((oElement.dimensions.png_thumb.width / 96) * 914400) >> 0;
                        var nEmuHeight = ((oElement.dimensions.png_thumb.height / 96) * 914400) >> 0;
                        sScript += '\n oImage = oWorksheet.AddImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ', nCol, 0, nRow, 0);';
                    }
                    sScript += '\n}';
                    break;
                }
            }
        }
        return sScript;
    }

    window.Asc.plugin.init = function () {
        var container = document.getElementById('scrollable-container-id');
        Ps.initialize(container, {
           theme: 'custom-theme'
        });
        var nAmount = 20;//Count images on page
        var sLastQuery = 'play';
        var nImageWidth = 90;
        var nVertGap = 15;
        var nLastPage = 1, nLastPageCount = 1;
        $( window ).resize(function(){
            updatePaddings();
            updateScroll();
            updateNavigation();
        });
        function updatePaddings(){
            var oContainer = $('#preview-images-container-id');
            var nFullWidth = $('#scrollable-container-id').width() - 20;
            var nCount = (nFullWidth/(nImageWidth + 2*nVertGap) + 0.01) >> 0;
            if(nCount < 1){
                nCount = 1;
            }
            var nGap = (((nFullWidth - nCount*nImageWidth)/(nCount))/2) >> 0;
            var aChildNodes = oContainer[0].childNodes;

            for (var i = 0; i < aChildNodes.length; ++i) {
                var oDivElement = aChildNodes[i];
                    $(oDivElement).css('margin-left', nGap + 'px');
                    $(oDivElement).css('margin-right', nGap + 'px');
            }
        }

        $('#search-form-id').submit(function (e) {
            sLastQuery = $('#search-id').val();
            if(sLastQuery === ''){
                sLastQuery = sEmptyQuery;
            }
            loadClipArtPage(1, sLastQuery);
            return false;
        });

        $('#navigation-first-page-id').click(function(e){
            if(nLastPage > 1){
                loadClipArtPage(1, sLastQuery);
            }
        });
        $('#navigation-prev-page-id').click(function(e){
            if(nLastPage > 1){
                loadClipArtPage(nLastPage - 1, sLastQuery);
            }
        });
        $('#navigation-next-page-id').click(function(e){
            if(nLastPage < nLastPageCount){
                loadClipArtPage(nLastPage + 1, sLastQuery);
            }
        });
        $('#navigation-last-page-id').click(function(e){
            if(nLastPage < nLastPageCount){
                loadClipArtPage(nLastPageCount, sLastQuery);
            }
        });



        function updateNavigation(){
            if(arguments.length == 2){
                nLastPage = arguments[0];
                nLastPageCount = arguments[1];
            }
            var nUsePage = nLastPage - 1;
            var oPagesCell =  $('#pages-cell-id');
            oPagesCell.empty();
            var nW = $('#pagination-table-container-id').width() - $('#pagination-table-id').width();
            var nMaxCountPages = (nW/22)>>0;

			if(nLastPageCount === 0)
			{
				$('#pagination-table-id').hide();
				return;
			}
			else
			{
				$('#pagination-table-id').show();
			}
            var nStart, nEnd;
            if(nLastPageCount <= nMaxCountPages){
                nStart = 0;
                nEnd = nLastPageCount;
            }
            else if(nUsePage < nMaxCountPages){
                nStart = 0;
                nEnd = nMaxCountPages;
            }
            else if((nLastPageCount -  nUsePage) <= nMaxCountPages){
                nStart = nLastPageCount -  nMaxCountPages;
                nEnd = nLastPageCount;
            }
            else {
                nStart = nUsePage - ((nMaxCountPages/2)>>0);
                nEnd = nUsePage + ((nMaxCountPages/2)>>0);
            }
            for(var i = nStart;  i< nEnd; ++i){
                var oButtonElement = $('<div class="pagination-button-div noselect" style="width:22px; height:22px;"><p>' + (i + 1) +'</p></div>');
                oPagesCell.append(oButtonElement);
                oButtonElement.attr('data-index', i + '');
                if(i === nUsePage){
                    oButtonElement.addClass('pagination-button-div-selected');
                }
                oButtonElement.click(function (e) {
                    $(this).addClass('pagination-button-div-selected');
                    loadClipArtPage(parseInt($(this).attr('data-index')) + 1, sLastQuery);
                });
            }
        }

        function loadClipArtPage(nIndex, sQuery) {
            $.ajax({
                method: 'GET',
                url: 'https://openclipart.org/search/json/?query=' + sQuery + '&amount=' + nAmount + '&page=' + nIndex,
                dataType: 'json'
            }).success(function (oResponse) {
                container = document.getElementById('scrollable-container-id');
                container.scrollTop = 0;
                Ps.update(container);
                updateNavigation(oResponse.info.current_page, oResponse.info.pages);
                fillTableFromResponse(oResponse.payload);
            });
        }

        function fillTableFromResponse(aPayLoad) {
            var oContainer = $('#preview-images-container-id');
            oContainer.empty();
            //calculate count images in string
            var nFullWidth = $('#scrollable-container-id').width() - 20;
            var nCount = (nFullWidth/(nImageWidth + 2*nVertGap) + 0.01) >> 0;
            if(nCount < 1){
                nCount = 1;
            }
            var nGap = 0;
            nGap = (((nFullWidth - nCount*nImageWidth)/(nCount))/2) >> 0;

            for (var i = 0; i < aPayLoad.length; ++i) {
                var oDivElement = $('<div></div>');
                oDivElement.css('display', 'inline-block');
                oDivElement.css('width', nImageWidth + 'px');
                oDivElement.css('height', nImageWidth + 'px');
                oDivElement.css('vertical-align','middle');
                $(oDivElement).addClass('noselect');
                oDivElement.css('margin-left', nGap + 'px');
                oDivElement.css('margin-right', nGap + 'px');

                oDivElement.css('margin-bottom', nVertGap + 'px');
                var oImageTh = aPayLoad[i].dimensions.png_thumb;
                var nMaxSize = Math.max(oImageTh.width, oImageTh.height);
                var fCoeff = nImageWidth/nMaxSize;
                var oImgElement = $('<img>');
                var nWidth = (oImageTh.width * fCoeff) >> 0;
                var nHeight = (oImageTh.height * fCoeff) >> 0;
                oImgElement.css('width', nWidth + 'px');
                oImgElement.css('height', nHeight + 'px');
                oImgElement.css('margin-left', (((nImageWidth - nWidth)/2) >> 0) + 'px');
                oImgElement.css('margin-top', (((nImageWidth - nHeight)/2) >> 0) + 'px');
                oImgElement.attr('src', aPayLoad[i].svg.png_thumb);
                oImgElement.attr('data-index', i + '');
                oImgElement.mouseover(
                    function (e) {
                        $(this).css('opacity', '0.65');
                    }
                );
                oImgElement.mouseleave(
                    function (e) {
                        $(this).css('opacity', '1');
                    }
                );
                oImgElement.click(
                    function (e) {
                        var oElement = aPayLoad[parseInt(this.dataset.index)];
                        window.Asc.plugin.info.recalculate = true;
                        window.Asc.plugin.executeCommand("command", createScriptFromArray([oElement]));
                    }
                );
                oImgElement.on('dragstart', function(event) { event.preventDefault(); });
                oDivElement.append(oImgElement);
                oContainer.append(oDivElement);
            }
            updateScroll();
        }

        function updateScroll(){

            var container = document.getElementById('scrollable-container-id');
            Ps.update(container);
            if($('.ps__scrollbar-y').height() === 0){
                $('.ps__scrollbar-y').css('border-width', '0px');
            }
            else{
                $('.ps__scrollbar-y').css('border-width', '1px');
            }

            if($('.ps__scrollbar-x').width() === 0)
            {
                $('.ps__scrollbar-x').css('border-width', '0px');
            }
            else
            {
                $('.ps__scrollbar-x').css('border-width', '1px');
            }
        }
        updateScroll();
        loadClipArtPage(1, sLastQuery);
    };

    window.Asc.plugin.button = function (id) {
            this.executeCommand("close", '');
    };

    window.Asc.plugin.onExternalMouseUp = function()
    {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseup", true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);

        document.dispatchEvent(evt);
    };
})(window);
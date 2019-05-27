var  Ps;
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
    function createScript(oElement, w, h){
        var sScript = '';

        if(oElement) {
            switch (window.Asc.plugin.info.editorType) {
                case 'word': {
                    sScript += 'var oDocument = Api.GetDocument();';
                    sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';

                        sScript += '\noParagraph = Api.CreateParagraph();';
                        sScript += '\narrInsertResult.push(oParagraph);';
                        var sSrc = oElement.svg.png_full_lossy;
                        var nEmuWidth = ((w / 96) * 914400) >> 0;
                        var nEmuHeight = ((h / 96) * 914400) >> 0;
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
						var sSrc = oElement.svg.png_full_lossy;
						var nEmuWidth = ((w / 96) * 914400) >> 0;
						var nEmuHeight = ((h / 96) * 914400) >> 0;
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
					var sSrc = oElement.svg.png_full_lossy;
					var nEmuWidth = ((w / 96) * 914400) >> 0;
					var nEmuHeight = ((h / 96) * 914400) >> 0;
					sScript += '\n oImage = oWorksheet.AddImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ', nCol, 0, nRow, 0);';
                    sScript += '\n}';
                    break;
                }
            }
        }
        return sScript;
    }
    window.Asc.plugin.init = function () {
        var container = document.getElementById('scrollable-container-id');
        
        
		Ps = new PerfectScrollbar('#scrollable-container-id', {});
		
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

		var nLastQueryIndex, sLastQuery2;
        function loadClipArtPage(nIndex, sQuery) {
            $.ajax({
                method: 'GET',
                url: 'https://openclipart.org/search/json/?query=' + sQuery + '&amount=' + nAmount + '&page=' + nIndex,
                dataType: 'json'
            }).success(function (oResponse) {
                container = document.getElementById('scrollable-container-id');
                container.scrollTop = 0;
                Ps.update();
                updateNavigation(oResponse.info.current_page, oResponse.info.pages);
                fillTableFromResponse(oResponse.payload);
            }).error(function(){       
			
				container = document.getElementById('scrollable-container-id');
                container.scrollTop = 0;
                Ps.update();
                updateNavigation(0, 0);                
				var oContainer = $('#preview-images-container-id');
				oContainer.empty();
				var oParagraph = $('<p style=\"font-size: 15px; font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\">Error has occured when loading data.</p>');
				
                oContainer.append(oParagraph);
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
				if(nWidth === 0 || nHeight === 0){
					 oImgElement.on('load', function(event) {

					 
						var nMaxSize = Math.max(this.naturalWidth, this.naturalHeight);
						var fCoeff = nImageWidth/nMaxSize;
						var nWidth = (this.naturalWidth * fCoeff) >> 0;
						var nHeight = (this.naturalHeight * fCoeff) >> 0;
						
						$(this).css('width', nWidth + 'px');
						$(this).css('height', nHeight + 'px');
						$(this).css('margin-left', (((nImageWidth - nWidth)/2) >> 0) + 'px');
						$(this).css('margin-top', (((nImageWidth - nHeight)/2) >> 0) + 'px');
					 });
				}
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
                        window.Asc.plugin.executeCommand("command", createScript(oElement, this.naturalWidth, this.naturalHeight));
                    }
                );
                oImgElement.on('dragstart', function(event) { event.preventDefault(); });
				
                oDivElement.append(oImgElement);
                oContainer.append(oDivElement);
            }
            updateScroll();
        }

        function updateScroll(){
            Ps.update();
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
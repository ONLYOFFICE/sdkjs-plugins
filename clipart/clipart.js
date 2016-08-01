(function(window, undefined) {

    var nAmount = 20;//Count images on page
    var sLastQuery = 'play';
    var widthPix = 185;
    function createScriptFromArray(aSelected){
        var sScript = '';
        if(aSelected.length > 0){
            var sScript = '';
            if(aSelected.length > 0){
                sScript += 'var oDocument = Api.GetDocument();';
                sScript += '\noDocument.CreateNewHistoryPoint();';
                sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';

                for(var i = 0;  i < aSelected.length; ++i) {
                    var oElement = aSelected[i];
                    sScript += '\noParagraph = Api.CreateParagraph();';
                    sScript += '\narrInsertResult.push(oParagraph);';
                    var sSrc = oElement.svg.png_full_lossy;
                    var nEmuWidth = ((oElement.dimensions.png_thumb.width/96)*914400) >> 0;
                    var nEmuHeight = ((oElement.dimensions.png_thumb.height/96)*914400) >> 0;
                    sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                    sScript += '\noParagraph.AddDrawing(oImage);';

                }
                sScript += '\noDocument.InsertContent(arrInsertResult);';
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
        var nMinImageGap = 30;
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
            var nCount = (nFullWidth/(nImageWidth + 2*nVertGap)) >> 0;
            if(nCount < 1){
                nCount = 1;
            }
            var nGap = 0;
            nGap = (((nFullWidth - nCount*nImageWidth)/(nCount))/2) >> 0;
            var aChildNodes = oContainer[0].childNodes;

            for (var i = 0; i < aChildNodes.length; ++i) {
                var oDivElement = aChildNodes[i];
                    $(oDivElement).css('margin-left', nGap + 'px');
                    $(oDivElement).css('margin-right', nGap + 'px');
            }
        }

        $('#search-form-id').submit(function (e) {
            sLastQuery = $('#search-id').val();
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
            var nMaxCountPages = 1;
            var nW = $('#pagination-table-container-id').width() - $('#pagination-table-id').width();
            nMaxCountPages = (nW/22)>>0;
            var nResultCount;

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
            var nCount = (nFullWidth/(nImageWidth + 2*nVertGap)) >> 0;
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
                oDivElement.append(oImgElement);
                oContainer.append(oDivElement);
            }
            updateScroll();
        }

        function updateScroll(){
            var container = document.getElementById('scrollable-container-id');
            Ps.update(container);
        }
        loadClipArtPage(1, sLastQuery);
    };

    window.Asc.plugin.button = function (id) {
            this.executeCommand("close", '');
    };
})(window);
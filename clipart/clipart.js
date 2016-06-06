(function(window, undefined) {

    var nAmount = 20;//Count images on page
    var sLastQuery = 'play';
    var arrSelected = [];
    var widthPix = 185;
    window.Asc.plugin.init = function () {

        function loadClipArtPage(nIndex, sQuery) {
            $.ajax({
                method: 'GET',
                url: 'https://openclipart.org/search/json/?query=' + sQuery + '&amount=' + nAmount + '&page=' + nIndex,
                dataType: 'json'
            }).success(function (oResponse) {
                updateNavigation(oResponse.info);
                fillTableFromResponse(oResponse.payload);
            });
        }

        function fillTableFromResponse(aPayLoad) {
            arrSelected.length = 0;
            $('#image_container').empty();
            var oImgElement;
            for (var i = 0; i < aPayLoad.length; ++i) {
                oImgElement = $('<img>');
                oImgElement.attr('src', aPayLoad[i].svg.png_thumb);
                oImgElement.attr('width', widthPix + 'px');
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
                        arrSelected.push(oElement);
                        window.Asc.plugin.button(0);
                    }
                );
                $('#image_container').append(oImgElement);
            }
        }

        function updateNavigation(oResponseInfo) {
            fillPaginationList(oResponseInfo.pages, oResponseInfo.current_page);
        }

        function fillPaginationList(nPagesCount, currentPage) {
            $('#pagination_div').pagination({
                items: nPagesCount,
                itemsOnPage: 1,
                currentPage: currentPage,
                cssStyle: 'light-theme',
                onPageClick: function (nPageNumber, event) {
                    loadClipArtPage(nPageNumber, sLastQuery)
                }
            });
        }

        $('#search_button').click(function (e) {
            sLastQuery = $('#search_input')[0].value;
            loadClipArtPage(1, sLastQuery);
        });
        loadClipArtPage(1, sLastQuery);
    };

    window.Asc.plugin.button = function (id) {
        var sScript = '';
        if(arrSelected.length > 0){
            sScript += 'var oDocument = Api.GetDocument();';
            sScript += '\noDocument.CreateNewHistoryPoint();';
            sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oImage;';

            for(var i = 0;  i < arrSelected.length; ++i) {
                var oElement = arrSelected[i];
                sScript += '\noParagraph = Api.CreateParagraph();';
                sScript += '\narrInsertResult.push(oParagraph);';
                var sSrc = oElement.svg.png_full_lossy;
                var dKoeff = widthPix/oElement.dimensions.png_full_lossy.width;
                var nEmuWidth = ((oElement.dimensions.png_full_lossy.width/96)*914400*dKoeff) >> 0;
                var nEmuHeight = ((oElement.dimensions.png_full_lossy.height/96)*914400*dKoeff) >> 0;
                sScript += '\n oImage = Api.CreateImage(\'' + sSrc + '\', ' + nEmuWidth + ', ' + nEmuHeight + ');';
                sScript += '\noParagraph.AddDrawing(oImage);';

            }
            sScript += '\noDocument.InsertContent(arrInsertResult);';
            window.Asc.plugin.info.recalculate = true;
            this.executeCommand("close", sScript);
        }
        this.executeCommand("close", sScript);
    };
})(window);
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
                    var sSrc = oElement.svg.png_thumb;
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

        function updateSearchBar(){
            $('#search_input').width($('#search_form').innerWidth() - $('#search_button').outerWidth(true) - 8);
        }

		$( window ).resize(function(){
            updateSearchBar();
		});
        updateSearchBar();
	
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
            $('#image_container').empty();
            var oImgElement;
			var nContainerWidth = $('#image_container')[0].clientWidth;
            for (var i = 0; i < aPayLoad.length; ++i) {
                oImgElement = $('<img>');
                oImgElement.attr('src', aPayLoad[i].svg.png_thumb);
				
				if(aPayLoad[i].dimensions.png_thumb.width > nContainerWidth){
					var fKoeff = nContainerWidth/aPayLoad[i].dimensions.png_thumb.width;
					oImgElement.attr('width', ((aPayLoad[i].dimensions.png_thumb.width*fKoeff) >> 0) + 'px');
					oImgElement.attr('height', ((aPayLoad[i].dimensions.png_thumb.height*fKoeff) >> 0)+ 'px');
				}
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
                $('#image_container').append(oImgElement);
            }
        }

        function updateNavigation(oResponseInfo) {
            fillPaginationList(oResponseInfo.pages, oResponseInfo.current_page);
        }

        function fillPaginationList(nPagesCount, currentPage) {
			$("#pagination_div").paginate({
				count 		: nPagesCount,
				start 		: currentPage,
				display     : 7,
				border					: true,
				border_color			: '#fff',
				text_color  			: '#fff',
				background_color    	: 'black',	
				border_hover_color		: '#ccc',
				text_hover_color  		: '#000',
				background_hover_color	: '#fff', 
				images					: false,
				mouse					: 'press',
				onChange     			: function (nPageNumber) {
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
            this.executeCommand("close", '');
    };
})(window);
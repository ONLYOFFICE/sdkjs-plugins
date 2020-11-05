(function(window, undefined){
	
	var Comments = null;

    window.Asc.plugin.init = function()
    {
		$('#scrollable-container-id').append(
			$('<div>', {
				id : 'IdComments',
				append : $('<label>', {
					text : 'ID'
				}),
				style : 'width : 21%;'
			}),
			$('<div>', {
				id : 'TextComments',
				append : $('<label>', {
					text : 'Comments'
				}),
				class : 'comments-param'
			})
		);

		window.Asc.plugin.executeMethod("GetAllComments",null,function(comments) {
			Comments = comments;
			addComments(comments);
		});
	};

	addComments = (comments) => {
		comments.forEach((element, index) => {
			showComment(element.Id, element.Data.Text);
		})
	};
	
	moveCursorToComment = (sId) => {
		window.Asc.plugin.executeMethod("MoveToComment",[sId]);
	};

	removeComments = (arrId) => {
		arrId.forEach((element) => {
			let index = Comments.findIndex((comment, id) => {
				if (comment.Id == element)
					return id
			});
			Comments.splice(index, 1);

			($('#'+element)).remove();
			($('#text'+element)).remove();
		});
	};

	changeComment = (updated) => {
		let comment = findComment(updated.Id);
		comment.Data = updated.Data;
		$('#text'+comment.Id).text(comment.Data.Text);
	};

	findComment = (id) => {
		return Comments.find((element) => {
			if (element.Id == id)
				return element;
		  });
	};

	showComment = (id, text) => {
		$('#IdComments').append(
			$('<div>',{
				id : id,
				for : '#IdComments',
				class : 'div-info',
				text : id,
				on : {
					click: function(){
						if (($('.div-selected').attr('data-id') !== $(this).attr('data-id'))){
							$('.div-selected').removeClass('div-selected');
							$(this).toggleClass('div-selected');
							let id = $(this).attr('id');
							$('#text'+id).toggleClass('div-selected');
							moveCursorToComment(id);
						}
					},
					mouseover: function(){
						$(this).addClass('div-hovered');
						let id = $(this).attr('id');
						$('#text'+id).addClass('div-hovered');

					},
					mouseout: function(){
						$(this).removeClass('div-hovered');
						let id = $(this).attr('id');
						$('#text'+id).removeClass('div-hovered');
					}
				}

			}).attr('data-id', id)
		);

		$('#TextComments').append(
			$('<div>',{
				id : 'text' + id,
				for : '#TextComments',
				class : 'div-info',
				text : text,
				on : {
					click: function(){
						if (($('.div-selected').attr('data-id') !== $(this).attr('data-id'))){
							$('.div-selected').removeClass('div-selected');
							$(this).toggleClass('div-selected');
							let id = $(this).attr('data-id');
							$('#'+id).toggleClass('div-selected');
							moveCursorToComment(id);
						}
					},
					mouseover: function(){
						$(this).addClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#'+id).addClass('div-hovered');
					},
					mouseout: function(){
						$(this).removeClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#'+id).removeClass('div-hovered');
					}
				}

			}).attr('data-id', id)
		);
	};
	
    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
	};

	window.Asc.plugin.event_onAddComment = function(comment)
	{
		Comments.push(comment);
		showComment(comment.Id, comment.Data.Text);
	};
	window.Asc.plugin.event_onChangeCommentData = function(comment)
	{
		changeComment(comment);

	};
	window.Asc.plugin.event_onRemoveComment = function(val)
	{
		removeComments([val.Id]);
	};
})(window, undefined);

(function(window, undefined){
	
	var Comments = null;

    window.Asc.plugin.init = function()
    {
		$('#btn_Edit').on('click', function() {
			$(this).removeClass('border-bottom');
			$('#btn_Author').addClass('border-bottom');
			$('#div_Edit').css('display', 'flex');
			$('#div_Author').css('display', 'none');
			$('#textarea_Comment').prop('disabled', false);
		});
		$('#btn_Author').on('click', function() {
			$(this).removeClass('border-bottom');
			$('#btn_Edit').addClass('border-bottom');
			$('#div_Edit').css('display', 'none');
			$('#div_Author').css('display', 'flex');
			$('#textarea_Comment').prop('disabled', true);
		});
		$('#btn_Delete').on('click', function() {
			let arrRem = [];
			$.each($("input:checked"), function(){    
				var id = $(this).attr('data-id');
				arrRem.push(id);
			});
			removeComments(arrRem);
			window.Asc.plugin.executeMethod("RemoveComments",[arrRem]);
		});
		$('#btn_Submit').on('click', function() {
			let comment = findComment($('.div-selected').attr('data-id'));
			let userData = {
				probCat : {id: $('#select_Category').find(':selected').val(), text:$('#select_Category').find(':selected').text()},
				severity : {id: $('#select_Severity').find(':selected').val(), text:$('#select_Severity').find(':selected').text()},
				accepted : {id: $('#select_Accept').find(':selected').val(), text:$('#select_Accept').find(':selected').text()},
				submitted : {id: $('#select_Submit').find(':selected').val(), text:$('#select_Submit').find(':selected').text()}
			};
			comment.Data.Text = $('#textarea_Comment').val();
			comment.Data.UserData = userData;
			// let reply = [{Text: "Reply1", UserName: "Author1"}];
			comment.Data.Replies.unshift({Text: "Reply1", UserName: "Author1"});
			let commentData = JSON.parse(JSON.stringify(comment.Data));
			commentData.UserData = JSON.stringify(userData); 
			$('#text'+comment.Id).text(comment.Data.Text);
			window.Asc.plugin.executeMethod("ChangeComment",[comment.Id, commentData]);
			
		});

		$('#btn_Cancel').on('click', function() {
			let comment = findComment($('.div-selected').attr('data-id'));
			$('#textarea_Comment').val(comment.Data.Text);
			$('#textarea_Replies').val((comment.Data.Replies.length) ? comment.Data.Replies[0].Text : "");
			$('#select_Category').val((comment.Data.UserData) ? comment.Data.UserData.probCat.id : 0).trigger("change");
			$('#select_Severity').val((comment.Data.UserData) ? comment.Data.UserData.severity.id : 0).trigger("change");
			$('#select_Accept').val((comment.Data.UserData) ? comment.Data.UserData.accepted.id : 0).trigger("change");
			$('#select_Submit').val((comment.Data.UserData) ? comment.Data.UserData.submitted.id : 0).trigger("change");

		});

		var ExampleUserData = {
			probCat : [{id:0, text:'None'},{id:1, text:'Defect'},{id:2, text:'Bug'}],
			severity : [{id:0, text:'None'},{id:1, text:'General'},{id:2, text:'Normal'}],
			submitted : [{id:0, text:'None'}, {id:1, text:'User_1'},{id:2, text:'User_2'}],
			accepted : [{id:0, text:'None'}, {id:1, text:'Accepted'}, {id:2, text:'Not'}]
		};

		$('#select_Category').select2({
			data : ExampleUserData.probCat,
			minimumResultsForSearch: Infinity,
			width : '125px'
		});
		$('#select_Severity').select2({
			data : ExampleUserData.severity,
			minimumResultsForSearch: Infinity,
			width : '125px'
		});
		$('#select_Accept').select2({
			data : ExampleUserData.accepted,
			minimumResultsForSearch: Infinity,
			width : '130px'
		});
		$('#select_Submit').select2({
			data : ExampleUserData.submitted,
			width : '125px'
		});

		$('#scrollable-container-id').append(
			$('<div>', {
				id : 'CheckComments',
				append : $('<label>', {
					text : 'F',
					style : 'margin-left: 3px;'
				}),
				class : 'comments-check'
			}),
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
			}),
			$('<div>', {
				id : 'SubmittedComments',
				append : $('<label>', {
					text : 'Submitted by'
				}),
				class : 'comments-param'
			})
		);

		window.Asc.plugin.executeMethod("GetAllComments",null,function(comments) {
			// console.log(comments);
			Comments = comments;
			addComments(comments);
		});
	};

	addComments = (comments) => {
		comments.forEach((element, index) => {
			let UserData = (element.Data.UserData) ? JSON.parse(element.Data.UserData) : "";
			Comments[index].Data.UserData = UserData;
			showComment(element.Id, element.Data.Text, UserData.submitted);
		})
	};

	removeComments = (arrId) => {
		arrId.forEach((element) => {
			let index = Comments.findIndex((comment, id) => {
				if (comment.Id == element)
					return id
			});
			Comments.splice(index, 1);

			if(($('#check'+element)).hasClass('div-selected')) {
				$('#textarea_Comment').val('');
				$('#textarea_Replies').val('');
				$('#select_Category').val(0).trigger("change");
				$('#select_Severity').val(0).trigger("change");
				$('#select_Accept').val(0).trigger("change");
				$('#select_Submit').val(0).trigger("change");
			}
			($('#check'+element)).remove();
			($('#'+element)).remove();
			($('#text'+element)).remove();
			($('#sub'+element)).remove();
		});
	};

	changeComment = (updated) => {
		let comment = findComment(updated.Id);
		updated.Data.UserData = (updated.Data.UserData) ? JSON.parse(updated.Data.UserData) : "";
		comment.Data = updated.Data;
		$('#text'+comment.Id).text(comment.Data.Text);
		$('#sub'+comment.Id).text((comment.Data.UserData && comment.Data.UserData.submitted.text) ? comment.Data.UserData.submitted.text : "None");
		if(($('#check'+comment.Id)).hasClass('div-selected')) {
			showCommentData(comment.Id);
		}
	};

	showCommentData = (id) => {
		let comment = findComment(id);
		$('#textarea_Comment').val(comment.Data.Text);
		$('#textarea_Replies').val((comment.Data.Replies.length) ? comment.Data.Replies[0].Text : "");
		$('#select_Category').val((comment.Data.UserData) ? comment.Data.UserData.probCat.id : 0).trigger("change");
		$('#select_Severity').val((comment.Data.UserData) ? comment.Data.UserData.severity.id : 0).trigger("change");
		$('#select_Accept').val((comment.Data.UserData) ? comment.Data.UserData.accepted.id : 0).trigger("change");
		$('#select_Submit').val((comment.Data.UserData) ? comment.Data.UserData.submitted.id : 0).trigger("change");

	};

	findComment = (id) => {
		return Comments.find((element) => {
			if (element.Id == id)
				return element;
		  });
	};

	showComment = (id, text, userData) => {
		$('#CheckComments').append(
			$('<div>',{
				id : 'check'+id,
				for : '#CheckComments',
				class : 'div-check',
				append : $('<input>', {type : 'checkbox'}).attr('data-id', id),
				on : {
					click: function(){
						$('.div-selected').removeClass('div-selected');
						$(this).toggleClass('div-selected');
						let id = $(this).attr('data-id');
						$('#'+id).toggleClass('div-selected');
						$('#text'+id).toggleClass('div-selected');
						$('#sub'+id).toggleClass('div-selected');
						showCommentData(id);
					},
					mouseover: function(){
						$(this).addClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#'+id).addClass('div-hovered');
						$('#text'+id).addClass('div-hovered');
						$('#sub'+id).addClass('div-hovered');

					},
					mouseout: function(){
						$(this).removeClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#'+id).removeClass('div-hovered');
						$('#text'+id).removeClass('div-hovered');
						$('#sub'+id).removeClass('div-hovered');
					}
				}

			}).attr('data-id', id)
		);

		$('#IdComments').append(
			$('<div>',{
				id : id,
				for : '#IdComments',
				class : 'div-info',
				text : id,
				on : {
					click: function(){
						$('.div-selected').removeClass('div-selected');
						$(this).toggleClass('div-selected');
						let id = $(this).attr('id');
						$('#check'+id).toggleClass('div-selected');
						$('#text'+id).toggleClass('div-selected');
						$('#sub'+id).toggleClass('div-selected');
						showCommentData(id);
					},
					mouseover: function(){
						$(this).addClass('div-hovered');
						let id = $(this).attr('id');
						$('#check'+id).addClass('div-hovered');
						$('#text'+id).addClass('div-hovered');
						$('#sub'+id).addClass('div-hovered');

					},
					mouseout: function(){
						$(this).removeClass('div-hovered');
						let id = $(this).attr('id');
						$('#check'+id).removeClass('div-hovered');
						$('#text'+id).removeClass('div-hovered');
						$('#sub'+id).removeClass('div-hovered');
					}
				}

			}).attr('data-type', id)
		);

		$('#TextComments').append(
			$('<div>',{
				id : 'text' + id,
				for : '#TextComments',
				class : 'div-info',
				text : text,
				on : {
					click: function(){
						$('.div-selected').removeClass('div-selected');
						$(this).toggleClass('div-selected');
						let id = $(this).attr('data-id');
						$('#check'+id).toggleClass('div-selected');
						$('#'+id).toggleClass('div-selected');
						$('#sub'+id).toggleClass('div-selected');
						showCommentData(id);
					},
					mouseover: function(){
						$(this).addClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#check'+id).addClass('div-hovered');
						$('#'+id).addClass('div-hovered');
						$('#sub'+id).addClass('div-hovered');
					},
					mouseout: function(){
						$(this).removeClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#check'+id).removeClass('div-hovered');
						$('#'+id).removeClass('div-hovered');
						$('#sub'+id).removeClass('div-hovered');
					}
				}

			}).attr('data-id', id)
		);

		$('#SubmittedComments').append(
			$('<div>',{
				id : 'sub' + id,
				for : '#SubmittedComments',
				class : 'div-info',
				text : (userData && userData.text) ? userData.text : "None",
				on : {
					click: function(){
						$('.div-selected').removeClass('div-selected');
						$(this).toggleClass('div-selected');
						let id = $(this).attr('data-id');
						$('#'+id).toggleClass('div-selected');
						$('#text'+id).toggleClass('div-selected');
						showCommentData(id);
					},
					mouseover: function(){
						$(this).addClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#'+id).addClass('div-hovered');
						$('#text'+id).addClass('div-hovered');
					},
					mouseout: function(){
						$(this).removeClass('div-hovered');
						let id = $(this).attr('data-id');
						$('#'+id).removeClass('div-hovered');
						$('#text'+id).removeClass('div-hovered');
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
		comment.Data.UserData = (comment.Data.UserData) ? JSON.parse(comment.Data.UserData) : "";
		Comments.push(comment);
		showComment(comment.Id, comment.Data.Text, comment.Data.UserData.submitted);
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

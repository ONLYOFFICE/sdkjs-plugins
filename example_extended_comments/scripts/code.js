(function(window, undefined){
	
	var Comments = null;

    window.Asc.plugin.init = function()
    {
		var ExampleUserData = {
			probCat : [{id:0, text:'None'},{id:1, text:'Defect'},{id:2, text:'Bug'}],
			severity : [{id:0, text:'None'},{id:1, text:'General'},{id:2, text:'Normal'}],
			submitted : [{id:0, text:'None'}, {id:1, text:'User_1'},{id:2, text:'User_2'}]
			// ,accepted : [{id:0, text:'None'}, {id:1, text:'Accepted'}, {id:2, text:'Not'}]
		};

		$('#select_Category').select2({
			data : ExampleUserData.probCat,
			minimumResultsForSearch: Infinity,
			width : '120px'
		});
		$('#select_Severity').select2({
			data : ExampleUserData.severity,
			minimumResultsForSearch: Infinity,
			width : '120px'
		});
		// $('#select_Accept').select2({
		// 	data : ExampleUserData.accepted,
		// 	minimumResultsForSearch: Infinity,
		// 	width : '120px'
		// });
		$('#select_Submit').select2({
			data : ExampleUserData.submitted,
			width : '120px'
		});

		$('#btn_Submit').on('click', function() {
			var comment = $('#textarea_Comment').val().trim();
			var author = $('#inp_author').val().trim();
			if (!author)
				author = window.Asc.plugin.info.userName;
			if (!comment) {
				alert("Error! The comment text can't be empty.")
				return;
			}
			let userData = {
				probCat : {id: $('#select_Category').find(':selected').val(), text:$('#select_Category').find(':selected').text()},
				severity : {id: $('#select_Severity').find(':selected').val(), text:$('#select_Severity').find(':selected').text()},
				submitted : {id: $('#select_Submit').find(':selected').val(), text:$('#select_Submit').find(':selected').text()}
			};
			clearFields();
			window.Asc.plugin.executeMethod("AddComment",[{Text: comment, UserName: author, UserData : JSON.stringify(userData)}], function(comment) {
				console.log(comment)
			});
		});

		$('#btn_Cancel').on('click', function() {
			clearFields();
		})

		$('#btn_Delete').on('click', function() {
			let arrRem = [];
			let arrReply = [];
			$.each($("input:checked"), function(){   
				if ($(this).attr("data-type") === "reply") {
					arrReply.push({id : $(this).parent().parent().parent()[0].id, text : $($(this).parent().find('.user-message')[0]).text(), author : $($(this).parent().find('.user-name')[0]).text()})
				} else {
					var id = $(this).parent().parent()[0].id;
					arrRem.push(id);
				}
			});
			removeReply(arrReply);
			removeComments(arrRem);
			window.Asc.plugin.executeMethod("RemoveComments",[arrRem]);
		});

		window.Asc.plugin.executeMethod("GetAllComments",null,function(comments) {
			// console.log(comments);
			Comments = comments;
			addComments(comments);
		});
	};

	clearFields = () => {
		$('#inp_author').val('');
		$('#textarea_Comment').val('');
		$('#select_Category').val(0).trigger("change");
		$('#select_Severity').val(0).trigger("change");
		$('#select_Submit').val(0).trigger("change");
	};

	addComments = (comments) => {
		comments.forEach((element, index) => {
			// let UserData = (element.Data.UserData) ? JSON.parse(element.Data.UserData) : "";
			// Comments[index].Data.UserData = UserData;
			$('#scrollable-container-id').append(makeComment(element.Id, element));
		})
	};

	removeComments = (arrId) => {
		arrId.forEach((element) => {
			let index = Comments.findIndex((comment) => {
				if (comment.Id == element)
					return true;
			});
			if (index !== -1) {
				Comments.splice(index, 1);
				$('#' + element).remove();
			}
		});
	};

	findComment = (id) => {
		return Comments.find((element) => {
			if (element.Id == id)
				return true;
		  });
	};

	addReply = (id, text, accept) => {
		let comment = findComment(id);
		let reply = {Text: text, UserName: comment.Data.UserName};
		comment.Data.Replies.push(reply);
		window.Asc.plugin.executeMethod("ChangeComment",[comment.Id, comment.Data]);
		console.log('Add reply to comment ' + id);
	};

	removeReply = (arr) => {
		arr.forEach(function(el) {
			let comment = findComment(el.id);
			let reply_id = comment.Data.Replies.findIndex(function(rep) {
				if (el.text == rep.Text && el.author == rep.UserName)
					return true;
			});
			comment.Data.Replies.splice(reply_id, 1);
			window.Asc.plugin.executeMethod("ChangeComment",[comment.Id, comment.Data]);
		})
	};

	editComment = (id, text) => {
		let comment = findComment(id);
		comment.Data.Text = text;
		window.Asc.plugin.executeMethod("ChangeComment",[comment.Id, comment.Data]);
		console.log('Edit comment ' + id);
	};

	editReply = (id, index, text, accept) => {
		let comment = findComment(id);
		comment.Data.Replies[index].Text = text;
		window.Asc.plugin.executeMethod("ChangeComment",[comment.Id, comment.Data]);
		console.log('Edit reply ' + index + ' in comment ' + id);
	};

	changeComment = (updated) => {
		let comment = findComment(updated.Id);
		// updated.Data.UserData = (updated.Data.UserData) ? JSON.parse(updated.Data.UserData) : "";
		comment.Data = updated.Data;
		var replypnl = $('#' + updated.Id).find('.reply-view');
		replypnl.addClass('hidden');
		replies = updated.Data.Replies;
		$('#' + updated.Id).find('.link.hide-reply').trigger('click');
		$('#' + updated.Id).find('.reply-view').empty();
		if (replies.length) {
			replies && replies.forEach((element, index) => {
				replypnl.append(makeReply(updated.Id, element, index));
			})
			$('#' + comment.Id).find('.link.show-reply').removeClass('hidden');
		} else {
			$('#' + comment.Id).find('.link.show-reply').addClass('hidden');
		}
		
		$('#' + comment.Id).find('.user-message')[0].innerText = comment.Data.Text;
	};

	showEditContainer = (accept, callback) => {
		var el = $('<div class="comment-edit">' +
					'<textarea class="msg-edit form-control"></textarea>' +
					(accept ? '<div class="reply-accept">' +
									'<input type="checkbox" class="user-check form-control"><label class="for-combo">Accept</label>' +
								'</div>' : '') +
					'<button class="btn-text-default submit primary" style="width:90px;">' + (accept ? 'Reply' : 'OK') + '</button>' +
					'<button class="btn-text-default submit" style="margin-left:5px; width:90px;">Cancel</button>' +
			'</div>'
		);

		$(el.find('.submit')[0]).on('click', function() {
			//reply add button
			var val = el.find('textarea').val();
			var check = el.find('input').is("checked");
			if (val) {
				callback(val, check);
				el.remove();
			}
		});
		$(el.find('.submit')[1]).on('click', function() {
			//cancel reply button
			callback();
			el.remove();
		});
		return el;
	};

	moveToComment = (e) => {
		window.Asc.plugin.executeMethod("MoveToComment",[$(e.target).parent().parent()[0].id]);
	}

	makeReply = (id, reply, index) => {
		var UserName = reply.UserName;
		var text = reply.Text;
		var replyEl = $('<div class="main-actions">' +
							'<input type="checkbox" data-type="reply"  class="user-check form-control">' +
							'<div class="user-name">' + UserName + '</div>' +
							'<div>:</div>' +
							'<div class="user-message">' + (text || '') + '</div>' +
							'<div class="btn-edit"></div>' +
						'</div>'
		);
		replyEl.find('.btn-edit').on('click', function(e){
			$(e.target).addClass('hidden');
			var edt = showEditContainer(false, function(text, accept) {
				text && editReply(id, index, text, accept);
				$(e.target).removeClass('hidden');
			});
			$(e.target).parent().after(edt);
			$(e.target.parentElement.nextSibling).find('.msg-edit').text($(replyEl[0]).find('.user-message').text());

		});
		return replyEl;
	};

	makeComment = (id, comment) => {
		var UserName = comment.Data.UserName;
		var text = comment.Data.Text;
		var commentitem = $('<div class="user-comment-item" id="' + id + '">' +
								'<div class="main-actions">' +
									'<input type="checkbox" class="user-check form-control">' +
									'<div class="user-name">' + UserName + '</div>' +
									'<div>:</div>' +
									'<div class="user-message ' + ((comment.Data.QuoteText) ? "comments-text\" onclick=\"moveToComment(event)\"" : "\"") + '>' + (text || '') + '</div>' +
									'<div class="btn-edit"></div>' +
								'</div>' +
								'<div class="reply-view">' +
								'</div>' +
								'<div class="reply-actions">' +
									'<label class="link add-reply" style="margin-right: 5px;">Add Reply</label>' +
									'<label class="link show-reply">Show Reply</label>' +
									'<label class="link hide-reply hidden">Hide Reply</label>' +
								'</div>' +
							'</div>'
							);
		var replies = comment.Data.Replies;

		commentitem.find('.link.add-reply').on('click', function(e){
			$(e.target).parent().addClass('hidden');
			var edt = showEditContainer(true, function(text, accept) {
				text && addReply(id, text, accept);
				$(e.target).parent().removeClass('hidden');
			});
			commentitem.append(edt);
		});
		commentitem.find('.link.show-reply').on('click', function(e){
			$(e.target).addClass('hidden');
			$(e.target).parent().find('.link.hide-reply').removeClass('hidden');
			commentitem.find('.reply-view').removeClass('hidden');
		});
		commentitem.find('.link.hide-reply').on('click', function(e){
			$(e.target).addClass('hidden');
			$(e.target).parent().find('.link.show-reply').removeClass('hidden');
			commentitem.find('.reply-view').addClass('hidden');
		});
		(replies.length<1) && commentitem.find('.link.show-reply').addClass('hidden');

		commentitem.find('.btn-edit').on('click', function(e){
			$(e.target).addClass('hidden');
			var edt = showEditContainer(false, function(text, check) {
				//ok and cancel edit comments
				text && editComment(id, text);
				$(e.target).removeClass('hidden');
			});
			$(e.target).parent().after(edt);
			$(commentitem[0]).find('.msg-edit')[0].value = $(commentitem[0]).find('.user-message')[0].innerText;
		});

		var replypnl = commentitem.find('.reply-view');
		replypnl.addClass('hidden');
		replies && replies.forEach((element, index) => {
			replypnl.append(makeReply(id, element, index));
		})

		return commentitem;
	};

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
	};

	window.Asc.plugin.event_onAddComment = function(comment)
	{
		Comments.push(comment);
		// let UserData = (comment.Data.UserData) ? JSON.parse(comment.Data.UserData) : "";
		// Comments[Comments.length-1].Data.UserData = UserData;
		$('#scrollable-container-id').append(makeComment(comment.Id, comment));
	};
	window.Asc.plugin.event_onChangeCommentData = function(comment)
	{
		changeComment(comment);
	};
	window.Asc.plugin.event_onRemoveComment = function(comment)
	{
		removeComments([comment.Id]);
	};
})(window, undefined);
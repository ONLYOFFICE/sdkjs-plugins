(function(window, undefined){
	
	var Comments = null;

    window.Asc.plugin.init = function()
    {
		var ExampleUserData = {
			probCat : [{id:0, text:'None'},{id:1, text:'Defect'},{id:2, text:'Bug'}],
			severity : [{id:0, text:'None'},{id:1, text:'General'},{id:2, text:'Normal'}],
			submitted : [{id:0, text:'None'}, {id:1, text:'User_1'},{id:2, text:'User_2'}],
			accepted : [{id:0, text:'None'}, {id:1, text:'Accepted'}, {id:2, text:'Not'}]
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
		$('#select_Accept').select2({
			data : ExampleUserData.accepted,
			minimumResultsForSearch: Infinity,
			width : '120px'
		});
		$('#select_Submit').select2({
			data : ExampleUserData.submitted,
			width : '120px'
		});

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
			$('#scrollable-container-id').append(makeComment(element.Id, element));
		})
	};

	findComment = (id) => {
		return Comments.find((element) => {
			if (element.Id == id)
				return true;
		  });
	};

	addReply = (id, text, accept) => {
		let comment = findComment(id);
		// add reply to id-comment
		console.log('Add reply to comment ' + id);
	};

	editComment = (id, text) => {
		let comment = findComment(id);
		// edit id-comment
		console.log('Edit comment ' + id);
	};

	editReply = (id, index, text) => {
		let comment = findComment(id);
		// edit index reply in id-comment
		console.log('Edit reply ' + index + ' in comment ' + id);
	};

	showEditContainer = (accept, callback) => {
		var el = $('<div class="comment-edit">' +
					'<textarea class="msg-edit form-control"></textarea>' +
					(accept ? '<div class="reply-accept">' +
									'<input type="checkbox" class="user-check"><label class="for-combo">Accept</label>' +
								'</div>' : '') +
					'<button class="btn-text-default submit primary" style="width:90px;">' + (accept ? 'Reply' : 'OK') + '</button>' +
					'<button class="btn-text-default submit" style="margin-left:5px; width:90px;">Cancel</button>' +
			'</div>'
		);

		$(el.find('.submit')[0]).on('click', function() {
			var val = el.find('textarea').val();
			var check = el.find('input').val();
			if (val) {
				callback(val, check);
				el.remove();
			}
		});
		$(el.find('.submit')[1]).on('click', function() {
			callback();
			el.remove();
		});
		return el;
	};

	makeReply = (id, reply, index) => {
		var UserName = reply.UserName;
		var text = reply.Text;
		var replyEl = $('<div class="main-actions">' +
							'<input type="checkbox" class="user-check">' +
							'<div class="user-name">' + UserName + '</div>' +
							'<div>:</div>' +
							'<div class="user-message">' + (text || '') + '</div>' +
							'<div class="btn-edit"></div>' +
						'</div>'
		);
		replyEl.find('.btn-edit').on('click', function(e){
			$(e.target).addClass('hidden');
			var edt = showEditContainer(false, function(result, text) {
				result && editReply(id, index, text);
				$(e.target).removeClass('hidden');
			});
			$(e.target).parent().after(edt);
		});
		return replyEl;
	};

	makeComment = (id, comment) => {
		var UserName = comment.Data.UserName;
		var text = comment.Data.Text;
		var commentitem = $('<div class="user-comment-item" id="' + id + '">' +
								'<div class="main-actions">' +
									'<input type="checkbox" class="user-check">' +
									'<div class="user-name">' + UserName + '</div>' +
									'<div>:</div>' +
									'<div class="user-message">' + (text || '') + '</div>' +
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
			var edt = showEditContainer(true, function(result, text, accept) {
				result && addReply(id, text, accept);
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
			var edt = showEditContainer(false, function(result, text) {
				result && editComment(id, text);
				$(e.target).removeClass('hidden');
			});
			$(e.target).parent().after(edt);
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
		// comment.Data.UserData = (comment.Data.UserData) ? JSON.parse(comment.Data.UserData) : "";
		// Comments.push(comment);
		// showComment(comment.Id, comment.Data.Text, comment.Data.UserData.submitted);
	};
	window.Asc.plugin.event_onChangeCommentData = function(comment)
	{
		// changeComment(comment);

	};
	window.Asc.plugin.event_onRemoveComment = function(val)
	{
		// removeComments([val.Id]);
	};
})(window, undefined);

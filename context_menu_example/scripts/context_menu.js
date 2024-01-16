(function (window, undefined) {

	let lang;
	let hello = 'Hello World!';
	let asyncText = "Async Text!";
	let comment = "Comment from context menu";
	let type;
	let timeout = null;

    window.Asc.plugin.init = function () {
		// get current language for translations
		lang = window.Asc.plugin.info.lang.substring(0,2);
	};
    window.Asc.plugin.button = function () {};

	window.Asc.plugin.attachEvent('onContextMenuShow', function(options) {
		// dired when context menu is opened into the document
		if (!options)
			return;

			window.Asc.plugin.executeMethod('AddContextMenuItem', [ getContextMenuItems(options) ] );
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}
		if (options.type == 'Target') {
			timeout = setTimeout(function(){
				window.Asc.plugin.executeMethod('UpdateContextMenuItem', [ getContextMenuItems( {type : type}, true) ] );
			}, 2000)
		}
	});


	function getContextMenuItems(options, bTimeout) {
		// generate items for context menu
		let settings = {
			guid: window.Asc.plugin.guid,
			items: [
				{
					// id of current item to identifi a click on it
					id : 'custom_menu',
					// text for this item
					text : generateText('Custom menu'),
					// submenu for this item
					items : [],
					// if you wish you can add icons for your items
					icons : "resources/%theme-type%(light|dark)/%state%(normal)icon%scale%(default).%extension%(png)",
				}
			]
		};
		type = options.type;

		switch (options.type)
		{
			case 'Target':
			{
				settings.items[0].items.push({
					id : 'hello_world',
					text : generateText(hello),
					icons : "resources/%theme-type%(light|dark)/%state%(normal)icon%scale%(default).%extension%(png)",
				});

				break;
			}
			case 'Selection':
			{
				settings.items[0].items.push(
					{
						id : 'selection_action',
						text : generateText('Selection action'),
						icons : "resources/%theme-type%(light|dark)/%state%(normal)icon%scale%(default).%extension%(png)",
						items : [
							{
								id : 'add_cc',
								text : generateText('Add Content Control')
							},
							{
								id : 'add_comment',
								text : generateText('Add comment')
							},
							{
								id : 'replace_text',
								text : generateText('Replace text'),
								// add separator line before the current item
								separator : true
							}
						]
					}
				);

				break;
			}
			case 'Image':
			case 'OleObject':
			case 'Shape':
			{
				settings.items[0].items.push({
					id : 'process_image',
					text : generateText('Replace image')
				});

				break;
			}

			default:
				break;
		}

		if (bTimeout) {
			// add this item only if it's called after timeout
			settings.items[0].items.push({
				id : 'async_data',
				text : generateText('Async data')
			})
		}
		return settings;
	};

	window.Asc.plugin.attachContextMenuClickEvent('replace_text', function() {
		// processing click on context menu item : "Replace text"
		window.Asc.plugin.executeMethod('PasteText', [hello]);
	});

	window.Asc.plugin.attachContextMenuClickEvent('add_cc', function() {
		// processing click on context menu item : "Add Content control"
		window.Asc.plugin.executeMethod ("AddContentControl", [1]);
	});

	window.Asc.plugin.attachContextMenuClickEvent('add_comment', function() {
		// processing click on context menu item : "Add comment"
		Asc.scope.comment = comment;
		window.Asc.plugin.callCommand(function() {
			let oDocument = Api.GetDocument();
			let oRange = oDocument.GetRangeBySelect();
			oRange.AddComment(Asc.scope.comment, "John Smith");
		}, false);
	});

	window.Asc.plugin.attachContextMenuClickEvent('hello_world', function() {
		// processing click on context menu item : "Hello World!"
		window.Asc.plugin.executeMethod('GetCurrentWord', null, function(text) {
			if (!isEmpyText(text, true)) {
				window.Asc.plugin.executeMethod('ReplaceCurrentWord', [hello]);
			} else {
				window.Asc.plugin.executeMethod('PasteText', [hello]);
			}
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('process_image', function() {
		// processing click on context menu item : "Replace image"
		window.Asc.plugin.executeMethod('GetImageDataFromSelection', null, function(data) {
			// get current image data and log it into the console
			let oImageData = {
				"src": 'https://helpcenter.onlyoffice.com/images/Help/GettingStarted/Documents/big/EditDocument.png'
			};
			console.log(data);
			if (type == 'image') {
				oImageData['replaceMode'] = 'fill';
			} else {
				oImageData['height'] = data.height;
				oImageData['width'] = data.width;
			}
			// replace current image to other
			window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent('async_data', function() {
		// processing click on context menu item : "Async data"
		window.Asc.plugin.executeMethod('GetCurrentWord', null, function(text) {
			if (!isEmpyText(text, true)) {
				window.Asc.plugin.executeMethod('ReplaceCurrentWord', [asyncText]);
			} else {
				window.Asc.plugin.executeMethod('PasteText', [asyncText]);
			}
		});
	});

	

	function generateText(text) {
		// generate text with translations for context menu
		let result = { en: text	};
		result[lang] = window.Asc.plugin.tr(text);
		return result;
	};

	function isEmpyText(text, bDonShowErr) {
		// check if a text is empty
		if (text.trim() === '') {
			if (!bDonShowErr)
				console.error('No word in this position or nothing is selected.');

			return true;
		}
		return false;
	};

	window.Asc.plugin.onTranslate = function() {
		// translate text
		hello = window.Asc.plugin.tr(hello);
		asyncText = window.Asc.plugin.tr(asyncText);
		comment = window.Asc.plugin.tr(comment);
	};

})(window, undefined);

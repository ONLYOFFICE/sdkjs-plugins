(function(window, undefined)
{
	const ContentControlType = {
		Block: 1,
		Inline: 2,
		Picture: 'Picture'
	};

	function trimResult(data, posStart) {
		let pos = posStart || 0;
		if (-1 != pos) {
			let trimC = ["\"", "'", "\n", "\r"];
			while (pos < data.length && trimC.includes(data[pos]))
				pos++;

			let posEnd = data.length - 1;
			while (posEnd > 0 && trimC.includes(data[posEnd]))
				posEnd--;

			if (posEnd > pos)
				return data.substring(pos, posEnd + 1);				
		}
		return data;
	}

	//register contentcontrols buttons
	if (true)
	{
		let button1		= new Asc.ContentControlButtons(undefined, '33fb8c66-e900-58ad-5133-0e693c0fba01');
		button1.type	= "RegenerateAi";
		button1.attachOnClick(async function() {
			let stringifyData = await Asc.Editor.callCommand(function () {
				debugger
				let Doc				= Api.GetDocument();
				let CustomXmlParts 	= Doc.GetCustomXmlParts();
				let CC				= Doc.GetSelectedContentControl();

				let IdCC			= CC.GetInternalId();
				let oDataBinding	= CC.GetDataBinding();

				let ItemId			= oDataBinding.GetItemId();
				let xPath			= oDataBinding.GetXPath();

				let CustomXmlPart	= CustomXmlParts.GetById(ItemId);
				let CustomXmlNode	= CustomXmlPart.GetNodes(xPath + "/prompt");
				let CustomXMLPrompt	= CustomXmlNode.GetText();
				let isPicture		= CC.IsPicture();
				
				if (CustomXMLPrompt === undefined || CustomXMLPrompt === "")
					return;

				return JSON.stringify({
					isPicture,
					id: IdCC,
					customXMLPrompt: CustomXMLPrompt
				});
			});

			if (!stringifyData)
				return;
			
			debugger

			let data			= JSON.parse(stringifyData);
			let Id				= data.id;
			let IsPicture		= data.isPicture;
			let CustomXMLPrompt = data.customXMLPrompt;
			
			await Asc.Library.SelectContentControl(Id);

			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let prompt = IsPicture
				? Asc.Prompts.getImagePrompt(CustomXMLPrompt)
				: CustomXMLPrompt;

			let result = await requestEngine.chatRequest(prompt);
			if (!result)
				return;

			result = result.replace(/\n\n/g, '\n');

			if (IsPicture)
			{
				let urls = [
					"https://hips.hearstapps.com/hmg-prod/images/cha-teau-de-chenonceau-1603148808.jpg",
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg/1024px-Panor%C3%A1mica_Oto%C3%B1o_Alc%C3%A1zar_de_Segovia.jpg",
					"https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Bodiam-castle-10My8-1197.jpg/1280px-Bodiam-castle-10My8-1197.jpg",
					"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Windsor_Castle_at_Sunset_-_Nov_2006.jpg/1280px-Windsor_Castle_at_Sunset_-_Nov_2006.jpg",
					"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Baba_Vida_Klearchos_1.jpg/1920px-Baba_Vida_Klearchos_1.jpg",
					"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Raseborg_06042008_Innenhof_01.JPG/1024px-Raseborg_06042008_Innenhof_01.JPG",
					"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hunyad_Castle_TB1.jpg/1280px-Hunyad_Castle_TB1.jpg"
				];
				let i = Math.floor(Math.random() * urls.length);
				let r = urls[i];
				await Asc.Library.PasteImage(r);
			}
			else
			{
				//temp for groq
				let index = result.indexOf('</think>');
				const res = index !== -1 ? result.slice(index + "</think>".length) : result;
				//---

				await Asc.Library.ClearContentControl(Id);
				await Asc.Library.PasteText(res.trim());
			}
		});
		Asc.CustomXML.Buttons.regenerate = button1;

		let button2 = new Asc.ContentControlButtons(undefined, 'ea5aa8f1-f25d-b2ae-105d-074c25b415bc');
		button2.type = "AcceptAi";
		button2.attachOnClick(async function() {
			Asc.plugin.callCommand(function () {
				debugger
				let Doc				= Api.GetDocument();
				let CustomXmlParts 	= Doc.GetCustomXmlParts();

				let CC				= Doc.GetSelectedContentControl();
				let oDataBinding	= CC.GetDataBinding();

				let ItemId			= oDataBinding.GetItemId();
				let xPath			= oDataBinding.GetXPath();

				let CustomXmlPart	= CustomXmlParts.GetById(ItemId);
				// delete data about this content control
				let Node			= CustomXmlPart.GetNodes(xPath);
				if (Node)
					Node.Delete();
				
				//if promptdata empty - delete customXML 
				let PromptData		= CustomXmlPart.GetNodes("/promptData");
				
				if (PromptData.GetChildrenNodesCount() === 0)
					CustomXmlParts.Delete(ItemId);

				CC.Delete(true);
			});

		});
		Asc.CustomXML.Buttons.accept = button2;

		let button3 = new Asc.ContentControlButtons(undefined, 'ea8d21ac-ac6a-3da1-dd20-6ef66e1997dc');
		button3.type = "DiscardAi";
		button3.attachOnClick(async function() {
			Asc.plugin.callCommand(function () {
				debugger
				let Doc				= Api.GetDocument();
				let CC				= Doc.GetSelectedContentControl();
				let CustomXmlParts 	= Doc.GetCustomXmlParts();

				let oDataBinding	= CC.GetDataBinding();
				let ItemId			= oDataBinding.GetItemId();
				let xPath			= oDataBinding.GetXPath();
				
				let CustomXmlPart	= CustomXmlParts.GetById(ItemId);
				let CustomXMLNode	= CustomXmlPart.GetNodes(xPath + "/defaultContent");
				
				if (CustomXMLNode)
				{
					let DefaultContent	= CustomXMLNode.GetText();
					
					CC.FillWithCustomXMLContent(DefaultContent)
					CC.Delete(true);
	
					CustomXMLNode.GetParent().Delete();
					
					let PromptData = CustomXmlPart.GetNodes("/promptData");
					if (PromptData.GetChildrenNodesCount() === 0)
						CustomXmlParts.Delete(ItemId);
				}
			});
		});
		Asc.CustomXML.Buttons.discard = button3;
	}

	// register contextmenu buttons
	let buttonMain = new Asc.ButtonContextMenu();
	buttonMain.text = "AI";
	buttonMain.addCheckers("All");

	function chatWindowShow()
	{
		let requestEngine = AI.Request.create(AI.ActionType.Chat);
		if (!requestEngine)
			return;

		let variation = {
			url : "chat.html",
			description : window.Asc.plugin.tr("Chatbot"),
			isVisual : true,
			buttons : [],
			isModal : false,
			EditorsSupport : ["word", "cell", "slide"],
			size : [ 400, 400 ]
		};

		var chatWindow = new window.Asc.PluginWindow();
		chatWindow.attachEvent("onWindowReady", function() {
			Asc.Editor.callMethod("ResizeWindow", [chatWindow.id, [400, 400], [400, 400], [0, 0]])
		});
		chatWindow.attachEvent("onChatMessage", async function(message) {
			let requestEngine = AI.Request.create(AI.ActionType.Chat);
			if (!requestEngine)
				return;

			let result = await requestEngine.chatRequest(message);
			if (!result) result = "";

			//result = result.replace(/\n\n/g, '\n');
			chatWindow.command("onChatReply", result);
		});
		chatWindow.show(variation);
	}
	
	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Explain text in comment";
		button1.addCheckers("Target");
		button1.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetCurrentWord();
			let prompt = Asc.Prompts.getExplainPrompt(content);
			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			result = result.replace(/\n\n/g, '\n');
			await Asc.Library.InsertAsComment(result);
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Fix spelling & grammar";
		button1.editors = ["word"];
		button1.addCheckers("Selection");
		button1.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getFixAndSpellPrompt(content);
			
			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[	
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Inline
			);

			let result = await requestEngine.chatRequest(prompt);
			
			// temp groq
			let index = result.indexOf('</think>\n\n');
			result = index !== -1 ? result.slice(index + "</think>\n\n".length) : result;
			result = result.replace('\n', '');
			//==

			if (!result) return;

			if (result !== 'The text is correct, there are no errors in it.')
				await Asc.Library.ReplaceTextSmart([result]);

			else
				console.log('The text is correct, there are no errors in it.');
		});

		let button2 = new Asc.ButtonContextMenu(buttonMain);
		button2.text = "Rewrite differently";
		button2.editors = ["word"];
		button2.addCheckers("Selection");
		button2.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getTextRewritePrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);

			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			// temp groq
			let index = result.indexOf('</think>\n\n');
			result = index !== -1 ? result.slice(index + "</think>\n\n".length) : result;
			result = result.replace('\n', '');
			//==

			result = result.replace(/\n\n/g, '\n');

			await Asc.Library.PasteText(result);
		});

		let button3 = new Asc.ButtonContextMenu(buttonMain);
		button3.text = "Make longer";
		button3.editors = ["word"];
		button3.addCheckers("Selection");
		button3.attachOnClick(async function(data){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getTextLongerPrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);

			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			result = result.replace(/\n\n/g, '\n');
			await Asc.Library.PasteText(result);
		});

		let button4 = new Asc.ButtonContextMenu(buttonMain);
		button4.text = "Make shorter";
		button4.editors = ["word"];
		button4.addCheckers("Selection");
		button4.attachOnClick(async function(data){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getTextShorterPrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);
		
			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			result = result.replace(/\n\n/g, '\n');
			await Asc.Library.PasteText(result);
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Text analysis";
		button1.editors = ["word"];
		button1.addCheckers("Selection");

		let button2 = new Asc.ButtonContextMenu(button1);
		button2.text = "Summarize";
		button2.editors = ["word"];
		button2.addCheckers("Selection");
		button2.attachOnClick(async function(data){
			let requestEngine = AI.Request.create(AI.ActionType.Summarization);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getSummarizationPrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);

			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			result = "Summary:\n\n" + result;
			await Asc.Library.InsertAsText(result);
		});

		let button3 = new Asc.ButtonContextMenu(button1);
		button3.text = "Keywords";
		button3.editors = ["word"];
		button3.addCheckers("Selection");
		button3.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getTextKeywordsPrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Inline
			);

			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			await Asc.Library.InsertAsText(result);
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Word analysis";
		button1.editors = ["word"];
		button1.separator = true,
		button1.addCheckers("Selection");

		let button2 = new Asc.ButtonContextMenu(button1);
		button2.text = "Explain text in comment";
		button2.editors = ["word"];
		button2.addCheckers("Selection");
		button2.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getExplainPrompt(content);
			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			result = result.replace(/\n\n/g, '\n');
			await Asc.Library.InsertAsComment(result);
		});

		let button3 = new Asc.ButtonContextMenu(button1);
		button3.text = "Explain text in hyperlink";
		button3.editors = ["word"];
		button3.addCheckers("Selection");
		button3.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;

			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getExplainAsLinkPrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);

			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			result = result.replace(/\n\n/g, '\n');
			await Asc.Library.InsertAsHyperlink(result);
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Translate";
		button1.editors = ["word"];
		button1.addCheckers("Selection");

		let button2 = new Asc.ButtonContextMenu(button1);
		button2.text = "Translate to English";
		button2.editors = ["word"];
		button2.addCheckers("Selection");
		button2.data = "English";
		button2.attachOnClick(async function(data){
			let requestEngine = AI.Request.create(AI.ActionType.Translation);
			if (!requestEngine)
				return;

			let lang = data;
			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getTranslatePrompt(content, lang);
			
			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);

			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;

			await Asc.Library.PasteText(result);
		});

		let button3 = button2.copy();
		button3.text = "Translate to French";
		button3.data = "French";

		let button4 = button2.copy();
		button4.text = "Translate to German";
		button4.data = "German";

		let button5 = button2.copy();
		button5.text = "Translate to Chinese";
		button5.data = "Chinese";

		let button6 = button2.copy();
		button6.text = "Translate to Japanese";
		button6.data = "Japanese";

		let button7 = button2.copy();
		button7.text = "Translate to Russian";
		button7.data = "Russian";

		let button8 = button2.copy();
		button8.text = "Translate to Korean";
		button8.data = "Korean";

		let button9 = button2.copy();
		button9.text = "Translate to Spanish";
		button9.data = "Spanish";

		let button10 = button2.copy();
		button10.text = "Translate to Italian";
		button10.data = "Italian";
	}

	if (true)
	{
		// TODO:
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Generate image from text";
		button1.editors = ["word"];
		button1.addCheckers("Selection");

		let button2 = new Asc.ButtonContextMenu(button1);
		button2.text = "256x256";
		button2.editors = ["word"];
		button2.addCheckers("Selection");
		button2.data = "256";
		button2.attachOnClick(async function(data) {
			debugger
			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getImagePrompt(content);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[	
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Picture,
			);
		});

		let button3 = button2.copy();
		button3.text = "512x512";
		button3.data = "512";

		let button4 = button2.copy();
		button4.text = "1024x1024";
		button4.data = "1024";        
	}

	if (false)
	{
		// TODO:
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Generate image variation";
		button1.addCheckers("Shape", "Image");
		button1.attachOnClick(function(data){
			console.log(data);
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Show hyperlink content";
		button1.addCheckers("Hyperlink");

		button1.onContextMenuShowExtendItem = function(options, item)
		{
			item.data = options.value;
		};

		button1.attachOnClick(function(data){
			let variation = {
				url : "hyperlink.html",
				description : window.Asc.plugin.tr("Hyperlink"),
				isVisual : true,
				buttons : [],
				isModal : false,
				EditorsSupport : ["word", "cell", "slide"],
				size : [ 1000, 1000 ]
			};

			var linkWindow = new window.Asc.PluginWindow();
			linkWindow.attachEvent("onGetLink", async function(){
				let link = data;
				if (!link)
					link = await Asc.Library.GetSelectedText();
				link = link.replace(/\n/g, '');
				link = link.replace(/\r/g, '');
				linkWindow.command("onSetLink", link);
			});
			linkWindow.show(variation);
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Chat";
		button1.separator = true;
		button1.addCheckers("All");
		button1.attachOnClick(function(){
			chatWindowShow();
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonContextMenu(buttonMain);
		button1.text = "Settings";
		button1.separator = true;
		button1.addCheckers("All");
		button1.attachOnClick(function(){
			onOpenSettingsModal();
		});
	}

	// register toolbar buttons
	let buttonMainToolbar = new Asc.ButtonToolbar();
	buttonMainToolbar.text = "AI";

	function getToolBarButtonIcons(icon) {
		return "resources/icons/%theme-type%(light|dark)/big/" + icon + "%scale%(default).png";
	}

	if (true)
	{
		let button1 = new Asc.ButtonToolbar(buttonMainToolbar);
		button1.text = "Settings";
		button1.icons = getToolBarButtonIcons("settings");
		button1.attachOnClick(function(data){
			onOpenSettingsModal();
		});
	}

	if (true)
	{
		let button1 = new Asc.ButtonToolbar(buttonMainToolbar);
		button1.separator = true;
		button1.text = "Ask AI";
		button1.icons = getToolBarButtonIcons("ask-ai");
		button1.attachOnClick(function(data){
			chatWindowShow();
		});

		let button2 = new Asc.ButtonToolbar(buttonMainToolbar);
		button2.text = "Summarization";
		button2.icons = getToolBarButtonIcons("summarization");
		button2.attachOnClick(async function(data){
			let requestEngine = AI.Request.create(AI.ActionType.Summarization);
			if (!requestEngine)
				return;

			onOpenSummarizationModal();
		});

		/*
		// TODO:
		let button3 = new Asc.ButtonToolbar(buttonMainToolbar);
		button3.text = "Text to image";
		button3.icons = getToolBarButtonIcons("text-to-image");
		button3.attachOnClick(function(data){
			console.log(data);
		});
		*/

		let button4 = new Asc.ButtonToolbar(buttonMainToolbar);
		button4.text = "Translation";
		button4.icons = getToolBarButtonIcons("translation");
		button4.attachOnClick(async function(){
			let requestEngine = AI.Request.create(AI.ActionType.Translation);
			if (!requestEngine)
				return;

			let lang = "english";
			let content = await Asc.Library.GetSelectedText();
			let prompt = Asc.Prompts.getTranslatePrompt(content, lang);

			await Asc.Library.AddContentControl(
				prompt.replace(/\r?\n|\r/g, ''),
				[
					Asc.CustomXML.Buttons.regenerate,
					Asc.CustomXML.Buttons.accept,
					Asc.CustomXML.Buttons.discard
				],
				ContentControlType.Block
			);
			
			let result = await requestEngine.chatRequest(prompt);
			if (!result) return;
			await Asc.Library.PasteText(result);
		});
	}

	// register actions
	window.AI = window.AI || {};
	var AI = window.AI;

	AI.ActionType = {
		Chat             : "Chat",
		Summarization    : "Summarization",
		//Text2Image       : "Text2Image",
		Translation      : "Translation",
		TextAnalyze      : "TextAnalyze"
	};

	AI.Actions = {};

	function ActionUI(name, icon, modelId, capabilities) {
		this.name = name || "";
		this.icon = icon || "";
		this.model = modelId || "";
		this.capabilities = (capabilities === undefined) ? AI.CapabilitiesUI.Chat : capabilities;
	}

	AI.Actions[AI.ActionType.Chat]           = new ActionUI("Ask AI", "ask-ai");
	AI.Actions[AI.ActionType.Summarization]  = new ActionUI("Summarization", "summarization");
	//AI.Actions[AI.ActionType.Text2Image]   = new ActionUI("Text to image", "text-to-image", "", AI.CapabilitiesUI.Image);
	AI.Actions[AI.ActionType.Translation]    = new ActionUI("Translation", "translation");
	AI.Actions[AI.ActionType.TextAnalyze]    = new ActionUI("Text analysis", "");

	AI.ActionsGetKeys = function()
	{
		return [
			AI.ActionType.Chat,
			AI.ActionType.Summarization,
			//AI.ActionType.Text2Image,
			AI.ActionType.Translation,
			AI.ActionType.TextAnalyze
		];
	};

	AI.ActionsGetSorted = function()
	{
		let keys = AI.ActionsGetKeys();
		let count = keys.length;
		let actions = new Array(count);
		for (let i = 0; i < count; i++)
		{
			let src = AI.Actions[keys[i]];
			actions[i] = {
				id : keys[i],
				name : Asc.plugin.tr(src.name),
				icon : src.icon,
				model : src.model,
				capabilities : src.capabilities
			}
		}
		return actions;
	};

	var actions_key = "onlyoffice_ai_actions_key";
	AI.ActionsSave = function()
	{
		try
		{
			window.localStorage.setItem(actions_key, JSON.stringify(AI.Actions));
			return true;
		}
		catch (e)
		{
		}
		return false;
	};

	AI.ActionsLoad = function()
	{
		let obj = null;
		try
		{
			obj = JSON.parse(window.localStorage.getItem(actions_key));
		}
		catch (e)
		{
			obj = (AI.DEFAULT_SERVER_SETTINGS && AI.DEFAULT_SERVER_SETTINGS.actions) ? AI.DEFAULT_SERVER_SETTINGS.actions : null;
		}
		
		if (obj)
		{
			for (let i in obj)
			{
				if (AI.Actions[i] && obj[i].model)
					AI.Actions[i].model = obj[i].model;
			}
			return true;
		}
		return false;
	};

	AI.ActionsChange = function(id, model)
	{
		if (AI.Actions[id])
		{
			AI.Actions[id].model = model;
			AI.ActionsSave();
		}
	};

	AI.ActionsLoad();
   
})(window);

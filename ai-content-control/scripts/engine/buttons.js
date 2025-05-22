(function(window, undefined)
{
	function generateGuid()
	{
		if (!window.crypto || !window.crypto.getRandomValues)
		{
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
		
		var array = new Uint16Array(8);
		window.crypto.getRandomValues(array);
		var index = 0;
		function s4() {
			var value = 0x10000 + array[index++];
			return value.toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	function translateItem(text) {
		return window.Asc.plugin.tr(text);
	};

	window.Asc = window.Asc || {};
	var Asc = window.Asc;
	
	//Asc.Buttons = {};
	Asc.Buttons.ButtonsContextMenu = [];
	Asc.Buttons.ButtonsToolbar = [];

	Asc.Buttons.registerContentControlButtons = function()
	{
		function getChecker(isAttribute)
		{
			return async function() {
				Asc.scope.isAttribute = isAttribute;
				return await Asc.Editor.callCommand(function() {

					let doc = Api.GetDocument();
					let xmlManager = doc.GetCustomXmlParts();
					let contentControl = doc.GetCurrentContentControl();
					if (!contentControl)
						return false;
	
					let dataBinding = contentControl.GetDataBinding();
					if (!dataBinding)
						return false;
	
					let id = dataBinding.storeItemID;
					let xPath = dataBinding.xpath;
					let xml = xmlManager.GetById(id);
					if (!xml)
						return false;
	
					let currentContentNode;
					let currentContentNodes = xml.GetNodes(xPath);
					if (!currentContentNodes.length)
						return false;
					
					currentContentNode = currentContentNodes[0];
					let currentNodeName = currentContentNode.GetNodeName();
					if (currentNodeName !== 'currentContent')
						return false;
	
					let parentNode = currentContentNode.GetParent();
					let parentNodeName = parentNode.GetNodeName();
					if (parentNodeName !== 'ooAI')
						return false;

					if (Asc.scope.isAttribute)
						return parentNode.GetAttribute('text-generation') === "true";
	
					return true;
				})
			};
		}
		
		let button = new Asc.ButtonContentControl();
		button.icons = '/resources/icons/light/btn-update.png';
		button.attachOnClick(async function(){
			let stringifyData = await Asc.Editor.callCommand(function() {
				let doc	= Api.GetDocument();
				let contentControl = doc.GetCurrentContentControl();
				let contentControlId = contentControl.GetInternalId();
				let dataBinding = contentControl.GetDataBinding();
				let xmlId = dataBinding.storeItemID;

				let xmlManager = doc.GetCustomXmlParts();
				let xml = xmlManager.GetById(xmlId);
				let promptNode = xml.GetNodes('/ooAI/prompt')[0];
				let prompt = promptNode.GetText();
				let isPicture = contentControl.IsPicture();

				return JSON.stringify({
					isPicture: isPicture,
					id: contentControlId,
					xmlId: xmlId,
					prompt: prompt,
					ccType: contentControl.GetClassType()
				});
			});

			if (!stringifyData)
				return;
			
			let data = JSON.parse(stringifyData);
			let isPicture = data.isPicture;
			let id = data.id;
			let xmlId = data.xmlId;
			let prompt = data.prompt;
			let ccType = data.ccType;

			await Asc.Library.SelectContentControl(id);

			let requestEngine = AI.Request.create(AI.ActionType.TextAnalyze);
			if (!requestEngine)
				return;
			let result = await requestEngine.chatRequest(prompt);
			if (!result)
				return;

			if (isPicture)
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

				Asc.scope.url = r;
				Asc.scope.id = id;
				await Asc.Editor.callCommand(function() {
					let doc	= Api.GetDocument();
					let contentControl = doc.GetContentControlById(Asc.scope.id);
					contentControl.SetPicture(Asc.scope.url);
				});
			}
			else
			{
				await Asc.Library.ClearContentControl(id);
			
				if (ccType === "inlineLvlSdt")
					result = result.replace(/(\r\n|\n|\r)/gm, "").trim();

				await Asc.Library.PasteText(result);
			}
			await Asc.Library.SetCurrentContentControl(xmlId, id);
		});
		//button.addChecker(getChecker(true));

		button = new Asc.ButtonContentControl();
		button.icons = '/resources/icons/light/chevron-down.png';
		button.attachOnClick(async function(){
			Asc.plugin.callCommand(function () {
				let doc		= Api.GetDocument();
				let oCCPr	= Api.asc_GetContentControlProperties();
				let id		= oCCPr.InternalId;

				let xmlManager = doc.GetCustomXmlParts();
				let contentControl = doc.GetContentControlById(id);

				let dataBinding = contentControl.GetDataBinding();
				let xmlid = dataBinding.storeItemID;

				let xml = xmlManager.GetById(xmlid);
				if (!xml)
					return;

				xml.Delete();
				Api.asc_RemoveContentControlWrapper(id);
			});
		});
		//button.addChecker(getChecker());

		button = new Asc.ButtonContentControl();
		button.icons = '/resources/icons/light/close.png';
		button.attachOnClick(async function(){
			await Asc.Editor.callCommand(function () {
				let doc		= Api.GetDocument();
				let oCCPr	= Api.asc_GetContentControlProperties();
				let id		= oCCPr.InternalId;

				let xmlManager = doc.GetCustomXmlParts();
				let contentControl = doc.GetContentControlById(id);

				let dataBinding = contentControl.GetDataBinding();

				if (!dataBinding)
					return false;

				let xmlid = dataBinding.storeItemID;

				let xml = xmlManager.GetById(xmlid);
				if (!xml)
					return;

				let nodeDefault = xml.GetNodes('/ooAI/defaultContent')[0];
				let defaultText = nodeDefault.GetText();
				let nodeCurrent = xml.GetNodes('/ooAI/currentContent')[0];
				nodeCurrent.SetText(defaultText);

				contentControl.UpdateFromXmlMapping();
				xml.Delete();
				Api.asc_RemoveContentControlWrapper(id);
			});
		});
		//button.addChecker(getChecker());

		button = new Asc.ButtonContentControl();
		button.icons = '/resources/icons/light/error.png';
		button.attachOnClick(async function(){
			onOpenPromptChangeModal();
		});
		//button.addChecker(getChecker());
	};

	Asc.Buttons.registerContextMenu = function()
	{
		window.Asc.plugin.attachEvent("onContextMenuShow", function(options) {
			if (!options)
				return;

			let items = {
				guid: window.Asc.plugin.guid,
			};
			for (let i = 0, len = Asc.Buttons.ButtonsContextMenu.length; i < len; i++)
			{
				let button = Asc.Buttons.ButtonsContextMenu[i];
				if (button.parent === null)
				{
					button.onContextMenuShow(options, items);
				}
			}
	
			if (items.items)
				window.Asc.plugin.executeMethod("AddContextMenuItem", [items]);
		});
	};

	Asc.Buttons.registerToolbarMenu = function()
	{
		let items = {
			guid : window.Asc.plugin.guid,
			tabs : []
		};

		for (let i = 0, len = Asc.Buttons.ButtonsToolbar.length; i < len; i++)
		{
			let button = Asc.Buttons.ButtonsToolbar[i];
			if (button.parent === null)
			{
				button.toToolbar(items);
			}

			if (!!button.menu) {
				for (item of button.menu) {
					if (!!item.onclick) {
						window.Asc.plugin.attachToolbarMenuClickEvent(item.id, item.onclick);
					}
				}
			}
		}

		if (items.tabs.length > 0)
			window.Asc.plugin.executeMethod("AddToolbarMenuItem", [items]);
	};

	var ToolbarButtonType = {
		Button : "button",
		BigButton : "big-button"
	};

	var ItemType = {
		None : 0,
		ContextMenu : 1,
		Toolbar : 2
	};

	function Button(parent, id)
	{
		this.itemType = ItemType.None;
		this.editors = ["word", "cell", "slide"];

		this.id = (id === undefined) ? generateGuid() : id;

		this.icons = null;
		
		this.text = "";
		this.hint = null;
		this.data = "";

		this.separator = false;
		this.lockInViewMode = true;
		this.enableToggle = false;
		this.disabled = false;

		this.parent = parent ? parent : null;
		this.childs = null;

		if (this.parent)
		{
			if (!this.parent.childs)
				this.parent.childs = [];
			this.parent.childs.push(this);
		}
	}

	Button.prototype.toItem = function() 
	{
		let item = {
			id : this.id,
			text : translateItem(this.text)            
		};

		if (this.hint !== null)
			item.hint = translateItem(this.hint === "" ? this.hint : this.text);
		
		if (this.separator)
			item.separator = true;

		if (this.data)
			item.data = this.data;

		if (this.lockInViewMode)
			item.lockInViewMode = true;

		if (this.enableToggle)
			item.enableToggle = true;

		if (this.disabled)
			item.disabled = true;

		if (this.icons)
			item.icons = this.icons;

		if (this.itemType === ItemType.Toolbar)
			item.type = this.type;

		if (this.menu)
			item.items = this.menu.map(function(menuItem) {
				menuItem.text = translateItem(menuItem.text);
				return menuItem;
			});

		if (this.split)
			item.split = true;

		return item;
	};

	Button.prototype.attachOnClick = function(handler)
	{
	};

	Button.prototype.onClick = function() 
	{
		console.log("BUTTON: " + this.text);
	};

	function ButtonContextMenu(parent, id)
	{
		Button.call(this, parent, id);

		this.itemType = ItemType.ContextMenu;
		this.showOnOptionsType = [];

		Asc.Buttons.ButtonsContextMenu.push(this);
	}

	ButtonContextMenu.prototype = Object.create(Button.prototype);
	ButtonContextMenu.prototype.constructor = ButtonContextMenu;

	ButtonContextMenu.prototype.copy = function()
	{
		let ret = new ButtonContextMenu(this.parent, this.id);
		ret.editors = this.editors;

		ret.separator = this.separator;
		ret.lockInViewMode = this.lockInViewMode;
		ret.enableToggle = this.enableToggle;
		ret.disabled = this.disabled;
		ret.showOnOptionsType = this.showOnOptionsType.slice();

		return ret;
	};

	ButtonContextMenu.prototype.addCheckers = function()
	{
		let len = arguments.length;
		this.showOnOptionsType = new Array(len);
		for (let i = 0; i < len; i++)
			this.showOnOptionsType[i] = arguments[i];
	};

	ButtonContextMenu.prototype.attachOnClick = function(handler)
	{
		window.Asc.plugin.attachContextMenuClickEvent(this.id, handler);  
	};

	ButtonContextMenu.prototype.onContextMenuShowAnalyze = function(options, parent)
	{        
		return false;
	};

	ButtonContextMenu.prototype.onContextMenuShowExtendItem = function(options, item)
	{        
	};

	ButtonContextMenu.prototype.onContextMenuShow = function(options, parent) 
	{
		if (this.onContextMenuShowAnalyze(options, parent))
			return;

		let isSupport = false;
		for (let i = 0, len = this.editors.length; i < len; i++)
		{
			if (Asc.plugin.info.editorType === this.editors[i])
			{
				isSupport = true;
				break;
			}
		}

		if (!isSupport)
			return;

		for (let i = 0, len = this.showOnOptionsType.length; i < len; i++)
		{
			if (options.type === this.showOnOptionsType[i] || this.showOnOptionsType[i] === "All")
			{
				if (!parent.items)
					parent.items = [];

				let curItem = this.toItem();   
				this.onContextMenuShowExtendItem(options, curItem);                           
				
				if (this.childs)
				{
					for (let j = 0, childsLen = this.childs.length; j < childsLen; j++)
					{
						this.childs[j].onContextMenuShow(options, curItem);
					}
				}

				parent.items.push(curItem);
				return;
			}
		}
	};

	function ButtonToolbar(parent, id)
	{
		Button.call(this, parent, id);

		this.itemType = ItemType.Toolbar;
		this.type = ToolbarButtonType.BigButton;
		this.tab = "";
		
		Asc.Buttons.ButtonsToolbar.push(this);
	}

	ButtonToolbar.prototype = Object.create(Button.prototype);
	ButtonToolbar.prototype.constructor = ButtonToolbar;

	ButtonToolbar.prototype.attachOnClick = function(handler)
	{
		window.Asc.plugin.attachToolbarMenuClickEvent(this.id, handler);
	};

	ButtonToolbar.prototype.toItem = function(items)
	{        
		let item = Button.prototype.toItem.call(this);
		item.type = this.type;
		return item;
	};

	ButtonToolbar.prototype.toToolbar = function(items)
	{
		let currentItem = null;
		if (this.parent === null)
		{
			let tab = {
				id : this.id,
				text : translateItem(this.text),
				items : []
			};
			if (this.hint !== null)
				tab.hint = translateItem(this.hint === "" ? this.hint : this.text);

			items.tabs.push(tab);

			currentItem = tab;
		}
		else
		{
			currentItem = this.toItem();
			
			if (!items.items)
				items.items = [];
			
			items.items.push(currentItem);
		}

		if (this.childs)
		{
			for (let j = 0, childsLen = this.childs.length; j < childsLen; j++)
			{
				this.childs[j].toToolbar(currentItem);
			}
		}
	};

	Asc.ToolbarButtonType = ToolbarButtonType;
	Asc.ButtonContextMenu = ButtonContextMenu;
	Asc.ButtonToolbar = ButtonToolbar;
})(window);

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

	function translateItem2(text) {
		let lang = window.Asc.plugin.info.lang.substring(0,2);
		let result = { en: text	};
		if (lang !== "en")
			result[lang] = window.Asc.plugin.tr(text);
		return result;
	};

	window.Asc = window.Asc || {};
	var Asc = window.Asc;
	
	Asc.Buttons = {};
	Asc.Buttons.ButtonsContextMenu = [];
	Asc.Buttons.ButtonsToolbar = [];
	
	Asc.CustomXML = {};
	Asc.CustomXML.uid = null;
	Asc.CustomXML.content = '<?xml version="1.0" encoding="UTF-8"?><promptData/>';
	Asc.CustomXML.xPath = '/promptData';
	Asc.CustomXML.prefix = 'http://onlyoffice.com/storage/prompts';
	Asc.CustomXML.ContentControlButtons = [];
	Asc.CustomXML.ContentControlButtonsEvents = {};
	Asc.CustomXML.Buttons = {};
	Asc.CustomXML.registerContentControlButtons = function ()
	{
		for (let i = 0; i < Asc.CustomXML.ContentControlButtons.length; i++)
		{
			let oCurrentButton = Asc.CustomXML.ContentControlButtons[i];

			window.Asc.plugin.executeMethod("RegisterCCButtonType", [oCurrentButton.type, oCurrentButton.id]); 

			// temp register icons
			let url = '';
			if (oCurrentButton.type === "RegenerateAi")
				url = "toc";
			else if (oCurrentButton.type === "AcceptAi")
				url = "acceptai";
			else if (oCurrentButton.type === "DiscardAi")
				url = "discardai";

			window.Asc.plugin.executeMethod("RegisterContentControlsIcon", [oCurrentButton.id, url]);
		}
	};
	Asc.CustomXML.registerContentControlButtonClick = function()
	{
		window.Asc.plugin.attachEvent("onContentControlButtonClick", async function(obj) {
			if (Asc.CustomXML.ContentControlButtonsEvents[obj.type])
				Asc.CustomXML.ContentControlButtonsEvents[obj.type](obj);
		});
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
		Toolbar : 2,
		ContentControl: 3,
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

	function ContentControlButtons(parent, id)
	{
		Button.call(this, parent, id);

		this.itemType = ItemType.ContentControl;
		this.showOnOptionsType = [];
		this.type = null;
		this.typeId = null;

		Asc.CustomXML.ContentControlButtons.push(this);
	}
	ContentControlButtons.prototype = Object.create(Button.prototype);
	ContentControlButtons.prototype.constructor = ContentControlButtons;

	ContentControlButtons.prototype.attachOnClick = function(handler)
	{
		window.Asc.plugin.attachContextMenuClickEvent(this.id, handler);  
	};
	ContentControlButtons.prototype.registerType = function(type)
	{	
		//let oThis = this;
		//this.type = type;

		Asc.CustomXML.registerCCButtonType(type, this);
	};
	ContentControlButtons.prototype.attachOnClick = function(handler)
	{
		Asc.CustomXML.ContentControlButtonsEvents[this.id] = handler;
	};

	Asc.ToolbarButtonType = ToolbarButtonType;
	Asc.ButtonContextMenu = ButtonContextMenu;
	Asc.ButtonToolbar = ButtonToolbar;
	Asc.ContentControlButtons = ContentControlButtons;

})(window);

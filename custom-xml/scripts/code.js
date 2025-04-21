/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
(function(window, undefined){
	Editor = {};
	Editor.callMethod = async function(name, args)
	{
		return new Promise(resolve => (function(){
			Asc.plugin.executeMethod(name, args || [], function(returnValue){
				resolve(returnValue);
			});
		})());
	};

	Editor.callCommand = async function(func)
	{
		return new Promise(resolve => (function(){
			Asc.plugin.callCommand(func, false, true, function(returnValue){
				resolve(returnValue);
			});
		})());
	};

	let codeEditor	= null;
	let xmlData		= [];

	function getCurrentXmlId()
	{
		let select			= document.getElementById("xmlList");
		let index			= select.selectedIndex;
		
		if (index === -1)
			return "";

		let selectedItem	= select.options[index];

		return selectedItem.innerText
	}

	async function updateXmlText(id, str)
	{
		Asc.scope.id = id;
		Asc.scope.str = str;
		await Editor.callCommand(() => {

			function getFirstTagName(xmlText) {
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(xmlText, "application/xml");
				const parseError = xmlDoc.getElementsByTagName("parsererror");
		
				if (parseError.length > 0) {
				  return false;
				}
			  
				return xmlDoc.documentElement.nodeName;
			}

			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml			= XmlManager.GetById(Asc.scope.id);
			let xmlText		= xml.GetXml();

			let rootNodeName= getFirstTagName(xmlText);
			let rootNodes	= xml.GetNodes('/' + rootNodeName);
			if (rootNodes.length)
			{
				let rootNode	= rootNodes[0];
				rootNode.SetXml(Asc.scope.str);
			}
		});

		await updateAllContentControlsFromBinding();
	}

	async function getTextOfXml(id)
	{
		Asc.scope.id = id;

		return await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml			= XmlManager.GetById(Asc.scope.id);

			return xml.GetXml();
		});	
	}

	async function deleteXml(){
		let id = getCurrentXmlId();
		if (!id)
			return;

		Asc.scope.id = id;
		await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml = XmlManager.GetById(Asc.scope.id);
			xml.Delete();
		});

		document.getElementById('xmlList').value = '';
	}

	async function getXmls() {
		xmlData = await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xmls		= XmlManager.GetAll();

			return xmls.map(xml => {
				return {
					text: xml.GetXml(),
					id	: xml.id
				}
			});
		});

		if (xmlData.length)
			createListOfXmls(xmlData);
	}
	
	function createListOfXmls(xmlData)
	{	
		let listWrapper			= document.getElementById("xmlList");
		listWrapper.innerHTML	= '';

		xmlData.forEach(xml => {
			let oButton			= document.createElement("option");
			oButton.innerHTML	= xml.id;

			listWrapper.appendChild(oButton);
		});

		// select default loaded xml
		loadXmlTextAndStructure();
	}

	async function loadXmlTextAndStructure()
	{
		let id				= getCurrentXmlId();
		if (!id)
			return;

		let xmlText			= await getTextOfXml(id);
		let prettyXmlText	= prettifyXml(xmlText);

		codeEditor.setValue(prettyXmlText);
		await createStrucOfXml(id);
	}

	async function createStrucOfXml(id)
	{
		let oStructure = document.getElementById("structureOfXML");
		oStructure.innerHTML = '';

		Asc.scope.id = id;
		let data = await Editor.callCommand(() => {
			function GenerateDataFromNode (node, data)
			{
				if (node.baseName)
				{
					let nodeData = {
						name: node.baseName,
						attributes: [],
						child: [],
						xPath: node.GetXPath()
					}

					let attributes = node.GetAttributes();
					attributes.forEach(attribute => {
						attribute.xPath = nodeData.xPath + "/@" + attribute.name;
						nodeData.attributes.push(attribute);
					})


					let childnodes = node.GetNodes("/*");
					if (childnodes)	
						childnodes.forEach((cnode => {GenerateDataFromNode(cnode, nodeData.child)}))

					data.push(nodeData)
				}
				else
				{
					let childnodes = node.GetNodes("/*");
					if (childnodes)	
						childnodes.forEach((cnode => {GenerateDataFromNode(cnode, data)}))
				}
			}
			function GetFirstTagName(xmlText) {
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(xmlText, "application/xml");
				const parseError = xmlDoc.getElementsByTagName("parsererror");
		
				if (parseError.length > 0) {
				  return false;
				}
			  
				return xmlDoc.documentElement.nodeName;
			}

			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml			= XmlManager.GetById(Asc.scope.id);
			let xmlText		= xml.GetXml();
			let rootNodeName= GetFirstTagName(xmlText);
			let rootNodes	= xml.GetNodes('/' + rootNodeName);

			if (rootNodes.length)
			{
				let node	= rootNodes[0];
				let data	= [];
				GenerateDataFromNode(node, data);
				return data;
			}
		});

		function selectLi(el)
		{
			el.stopPropagation();
			Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function(element){
				element.classList.remove('selected');
			});
			el.currentTarget.classList.add('selected');
		}

		function isContainAttributes(node)
		{
			let arr = node.attributes.filter(att => !(att.name.startsWith('xmlns:')) && att.name !== 'xmlns');
			return arr.length > 0;
		}

		function proceedData(data, oStructure)
		{
			for (let i = 0; i < data.length; i++)
			{
				let oCurrentData = data[i];

				if (oCurrentData.child.length || isContainAttributes(oCurrentData))
				{
					let li		= document.createElement("li");
					let details = document.createElement("details");
					let summury = document.createElement("summary");
					let ul		= document.createElement("ul");
					
					summury.innerText = oCurrentData.name;
	
					oStructure.appendChild(li);
					li.appendChild(details);
					details.appendChild(summury);
					details.appendChild(ul);

					li.onclick	= selectLi;
					li.xPath	= oCurrentData.xPath;

					proceedData(oCurrentData.child, ul);
					
					oCurrentData.attributes.forEach(attribute => {
						if (attribute.name === 'xmlns' || attribute.name.startsWith('xmlns:'))
							return;

						let li			= document.createElement("li");
						let summury		= document.createElement("summary");
		
						ul.appendChild(li);
						li.appendChild(summury);
						
						li.onclick		= selectLi;
						li.xPath		= attribute.xPath;
		
						summury.innerText = "@" + attribute.name;
					})
				}
				else
				{
					let summury			= document.createElement("summary");
					let li				= document.createElement("li");
					
					summury.innerText	= oCurrentData.name;

					li.appendChild(summury);

					li.onclick			= selectLi;
					li.xPath			= oCurrentData.xPath;

					oStructure.appendChild(li);
				}
			}
		}

		proceedData(data, oStructure);
		
		return data;
	}

	function prettifyXml(sourceXml)
	{
		// Save declaration
		var xmlDeclaration = '';
		if (sourceXml.startsWith('<?xml')) {
			const match = sourceXml.match(/^<\?xml.*?\?>/);
			if (match) {
				xmlDeclaration = match[0] + '\n';
			}
		}

		var xmlDoc	= new DOMParser().parseFromString(sourceXml, 'application/xml');
		var xsltDoc	= new DOMParser().parseFromString([
			'<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
			'  <xsl:strip-space elements="*"/>',
			'  <xsl:template match="para[content-style][not(text())]">',
			'    <xsl:value-of select="normalize-space(.)"/>',
			'  </xsl:template>',
			'  <xsl:template match="node()|@*">',
			'    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
			'  </xsl:template>',
			'  <xsl:output indent="yes"/>',
			'</xsl:stylesheet>',
		].join('\n'), 'application/xml');

		var xsltProcessor = new XSLTProcessor();    
		xsltProcessor.importStylesheet(xsltDoc);
		var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
		var resultXml = new XMLSerializer().serializeToString(resultDoc);

		return xmlDeclaration + resultXml;
	}

	function getSelectedItemXPath()
	{
		let li = document.querySelectorAll('li.selected');
		
		if (li.length && li[0].xPath)
			return li[0].xPath;
	}

	async function updateAllContentControlsFromBinding()
	{
		Asc.scope.controls = await Editor.callMethod('GetAllContentControls');
		
		await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();

			for (let i = 0; i < Asc.scope.controls.length; i++)
			{
				let ccId	= Asc.scope.controls[i];
				let cc		= Doc.GetContentControl(ccId.InternalId);
				if (cc)
					cc.LoadFromDataBinding();
			}
		});
	}

    window.Asc.plugin.init = async function()
    {
		if (!codeEditor) {
			codeEditor = CodeMirror(document.getElementById("main"), {
				mode: "text/xml",
				value: "",
				lineNumbers: true,
				lineWrapping: false,
				matchTags: {bothTags: true},
				autoCloseTags: {whenClosing: true},
				extraKeys: {
					"Ctrl-J": "toMatchingTag", 
					"Ctrl-Q": function(cm){cm.foldCode(cm.getCursor())}
				},
				autoCloseBrackets: true,
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
			});
		}

		document.getElementById("xmlList").addEventListener("change", loadXmlTextAndStructure);

		getXmls();
		
		document.getElementById("reloadContentOfXml").onclick = getXmls;

		document.getElementById("updateContentOfXml").onclick = async function(e) {
			let id		= getCurrentXmlId()
			if (!id)
				return;
			let text	= codeEditor.getValue();
			
			await updateXmlText(id, text);
			await createStrucOfXml(id);
		};

		document.getElementById("createContentOfXml").onclick = async function(e) {
			let id = await Editor.callCommand(() => {
				let Doc				= Api.GetDocument();
				let XmlManager		= Doc.GetCustomXmlParts();
				let xmlDefaultText	= '<?xml version="1.0" encoding="UTF-8"?><defaultContent xmlns="http://example.com/picture">1</defaultContent>';

				return XmlManager.Add(xmlDefaultText).id;
			});

			let listWrapper		= document.getElementById("xmlList");
			let option			= document.createElement("option");
			option.innerHTML	= id;

			listWrapper.appendChild(option);
			document.getElementById('xmlList').value = id;
			loadXmlTextAndStructure();
		};
		
		document.getElementById("deleteContentOfXml").onclick = async function(e) {
			await deleteXml();
			codeEditor.setValue("");
			document.getElementById("structureOfXML").innerHTML = '';
			await getXmls();
		};

		document.getElementById("match_with_selected_сс").onclick = async function(e) {
			let ccId	= await Editor.callMethod("GetCurrentContentControl");
			let xmlId	= document.getElementById('xmlList').value;
			
			if (ccId !== null)
			{
				Asc.scope.xmlId	= xmlId;
				Asc.scope.id	= ccId;
				Asc.scope.xPath = getSelectedItemXPath();

				await Editor.callCommand(() => {
					let Doc			= Api.GetDocument();
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath)
					let cc			= Doc.GetContentControl(Asc.scope.id);
					cc.SetDataBinding(DataBinding);
				});
			}
		}

		document.getElementById("insert_cc").onclick = async function(e) {
			
			let select			= document.getElementById("ccType");
			let index			= select.selectedIndex;
			let selectedItem	= select.options[index];
			let value			= selectedItem.value

			let id				= getCurrentXmlId();
			if (!id)
				return;

			Asc.scope.xmlId = id;
			Asc.scope.xPath = getSelectedItemXPath();

			if (value === 'block')
			{
				await Editor.callCommand(() => {
					let doc = Api.GetDocument();
					let sdt			= Api.CreateBlockLvlSdt();
					doc.InsertContent([sdt]);
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath)
					sdt.SetDataBinding(DataBinding);

				});
			}
			else if (value === 'inline')
			{
				await Editor.callCommand(() => {
					let doc			= Api.GetDocument();
					let sdt			= Api.CreateInlineLvlSdt();
					let oParagraph  = Api.CreateParagraph();
					oParagraph.AddElement(sdt, 0);
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath);

					sdt.SetDataBinding(DataBinding);
					doc.InsertContent([oParagraph]);
				});
			}
			else if (value === 'checkbox')
			{
				await Editor.callCommand(() => {
					let doc			= Api.GetDocument();
					let sdt			= doc.AddCheckBoxContentControl();
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath);
					sdt.SetDataBinding(DataBinding);
				});
			}
			else if (value === 'picture')
			{
				await Editor.callCommand(() => {
					let doc			= Api.GetDocument();
					let sdt			= doc.AddPictureContentControl();
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath);
					sdt.SetDataBinding(DataBinding);
				});
			}
			else if (value === 'combobox' || value === 'dropdownlist')
			{
				Asc.scope.name = value;
				await Editor.callCommand(() => {
					let doc			= Api.GetDocument();
					let sdt			= (Asc.scope.name === 'combobox')
						? doc.AddComboBoxContentControl()
						: doc.AddDropDownListContentControl();
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath);
					sdt.SetDataBinding(DataBinding);
				});
			}
			else if (value === 'date')
			{
				await Editor.callCommand(() => {
					let doc			= Api.GetDocument();
					let sdt			= doc.AddDatePickerContentControl();
					let DataBinding = Api.CreateDataBinding("", Asc.scope.xmlId, Asc.scope.xPath);
					sdt.SetDataBinding(DataBinding);
				});
			}
		}

	}

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		if (theme.type.indexOf("dark") !== -1)
			setTimeout(function(){codeEditor && codeEditor.setOption("theme", "bespin")});
		else
			setTimeout(function(){codeEditor && codeEditor.setOption("theme", "default")});
	};

	window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};

})(window, undefined);

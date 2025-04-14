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


	let codeEditor = null;
	let xmlData = [];
	let currentXMLText = "";

	async function getXmls() {
		xmlData = await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xmls		= XmlManager.GetAll();

			return xmls.map(xml => {
				return {
					text: xml.GetXml(),
					id	: xml.itemId
				}
			});
		});

		createListOfXmls(xmlData);
	};

	async function getTextOfXmlById(id)
	{
		Asc.scope.id = id;
		return await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml			= XmlManager.GetById(Asc.scope.id);

			return xml.GetXml();
		});	
	};

	async function createStrucOfXml(id)
	{
		document.getElementById("structureOfXML").innerHTML = '';

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
						attribute.xPath = nodeData.xPath + "/@" + attribute.key;
						nodeData.attributes.push(attribute);
					})

					let childnodes = node.GetChildrenNodes();
					if (childnodes)
					{	
						childnodes.forEach((cnode => {GenerateDataFromNode(cnode, nodeData.child)}))
					}

					data.push(nodeData)
				}
				else
				{
					let childnodes = node.GetChildrenNodes();
					if (childnodes)
					{	
						childnodes.forEach((cnode => {GenerateDataFromNode(cnode, data)}))
					}
				}
			}

			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml			= XmlManager.GetById(Asc.scope.id);

			let node		= xml.GetMainNode();
			let data		= [];

			GenerateDataFromNode(node, data);

			return data;
		})

		let oStructure = document.getElementById("structureOfXML");

		function createTooltip(el)
		{
			el.stopPropagation();
			Array.prototype.slice.call(document.querySelectorAll('li')).forEach(function(element){
				element.classList.remove('selected');
			});
			el.currentTarget.classList.add('selected');
		}

		function proceedAttributes(data, oStructure)
		{
			for (let i = 0; i < data.length; i++)
			{
				let attribute = data[i];

				if (attribute.key === 'xmlns')
					continue;

				let li = document.createElement("li");
				oStructure.appendChild(li);

				let summury			= document.createElement("summary");
				summury.innerText	= "@" + attribute.key;
				

				li.appendChild(summury);
				li.onclick = createTooltip;
				li.xPath = attribute.xPath;
				//createTooltip(summury);
			}
		}

		function proceedData(data, oStructure)
		{
			debugger
			for (let i = 0; i < data.length; i++)
			{
				let oCurrentData = data[i];
				if (oCurrentData.child.length || oCurrentData.attributes.length)
				{
					let li = document.createElement("li");
					let details = document.createElement("details");
						
					let summury = document.createElement("summary");
					summury.innerText = oCurrentData.name;
	
					let ul = document.createElement("ul");
	
					li.appendChild(details);
					details.appendChild(summury);
					details.appendChild(ul);

					oStructure.appendChild(li);

					li.onclick = createTooltip;
					li.xPath = oCurrentData.xPath;

					proceedData(oCurrentData.child, ul);
					proceedAttributes(oCurrentData.attributes, ul);
				}
				else
				{
					let li = document.createElement("li");
					//li.innerText = oCurrentData.name;
					oStructure.appendChild(li);

					let summury			= document.createElement("summary");
					summury.innerText	= oCurrentData.name;

					li.appendChild(summury);
					li.onclick = createTooltip;
					li.xPath = oCurrentData.xPath;

				}
			}
		}

		proceedData(data, oStructure);
		
		return data;
	};

	async function updateXml(id, str)
	{
		Asc.scope.id = id;
		Asc.scope.str = str;
		return await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			let xml			= XmlManager.GetById(Asc.scope.id);
			return xml.ReFill(Asc.scope.str);
		})	
	};

	async function deleteXml(){
		let id = getCurrentXmlId();

		Asc.scope.id = id;
		await Editor.callCommand(() => {
			let Doc			= Api.GetDocument();
			let XmlManager	= Doc.GetCustomXmlParts();
			XmlManager.Delete(Asc.scope.id);
		});
	}

	var prettifyXml = function(sourceXml)
	{
		// Save declaration
		var xmlDeclaration = '';
		if (sourceXml.startsWith('<?xml')) {
			const match = sourceXml.match(/^<\?xml.*?\?>/);
			if (match) {
				xmlDeclaration = match[0] + '\n';
			}
		}

		var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
		var xsltDoc = new DOMParser().parseFromString([
			'<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
			'  <xsl:strip-space elements="*"/>',
			'  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
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
	};

	function getCurrentXmlId()
	{
		let select = document.getElementById("xmlList");
		let index			= select.selectedIndex;
		let selectedItem	= select.options[index];

		let id				= selectedItem.innerText
		return id;
	}

	function getSelectedItemXPath()
	{
		let li = document.querySelectorAll('li.selected');
		
		if (li.length && li[0].xPath)
			return li[0].xPath;
	}

	async function selectCurrentXml()
	{
		let id		= getCurrentXmlId();
		let xmlText	= await getTextOfXmlById(id);
		let prettyXmlText = prettifyXml(xmlText);
		
		currentXMLText = prettyXmlText;

		codeEditor.setValue(prettyXmlText);

		document.getElementById("updateContentOfXml").setAttribute('xml_id', id);

		await createStrucOfXml(id);
	}

	function createListOfXmls(xmlData)
	{	
		let listWrapper = document.getElementById("xmlList");
		listWrapper.innerHTML = '';
		listWrapper.addEventListener("change", selectCurrentXml);

		xmlData.forEach(xml => {
			let oButton			= document.createElement("option");
			oButton.innerHTML	= xml.id;
			listWrapper.appendChild(oButton);
		});

		selectCurrentXml();
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

		getXmls();

		document.getElementById("updateContentOfXml").onclick = async function(e) {
			let id		= e.currentTarget.getAttribute('xml_id');
			let text	= codeEditor.getValue();
			
			await updateXml(id, text);
			await createStrucOfXml(id);
		};

		document.getElementById("createContentOfXml").onclick = async function(e) {
			let id = await Editor.callCommand(() => {
				let Doc				= Api.GetDocument();
				let XmlManager		= Doc.GetCustomXmlParts();
				let xmlDefaultText	= '<?xml version="1.0" encoding="UTF-8"?><defaultContent></defaultContent>';

				return XmlManager.Add(xmlDefaultText).itemId;
			});

			let listWrapper		= document.getElementById("xmlList");
			let option			= document.createElement("option");
			option.innerHTML	= id;

			listWrapper.appendChild(option);
			document.getElementById('xmlList').value=id;
			selectCurrentXml();
		};
		
		document.getElementById("deleteContentOfXml").onclick = async function(e) {
			await deleteXml()
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
					let cc			= Doc.GetContentControlById(Asc.scope.id);

					cc.SetDataBinding(DataBinding);
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

	Asc.plugin.button = (id, windowId) => {
		if (!windowId) {
		  return
		}
	  
		if (windowId === newWindow.id) {
		  console.log("Plugin button")
		}
	}

})(window, undefined);

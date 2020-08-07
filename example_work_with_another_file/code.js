(function(window, undefined){

	var Macros = {
		macrosArray : [],
		current : -1
	};

	var Content = [];
	
	var DataEdit = {
		FlagEdit : false,
		id : null
	};

	CheckMacros = () => {
		var Found = false;
		for (var i = 0; i < Macros.macrosArray.length && !Found; i++) {
			if (Macros.macrosArray[i].name === "ForSavedLink") {
				Content = JSON.parse(Macros.macrosArray[i].value);
				Content["current"] = i;
				Found = true;
			}
		}
		if (!Found) {
			Macros.macrosArray.push({ name : "ForSavedLink", value : "" });
			Content["current"] = Macros.macrosArray.length - 1;
		}
		GenerateRemoveID(true);
	};

	GenerateRemoveID = (flag) => {
		for (var i = 0; i < Content.length; i++) {
			if (flag) {
				Content[i].id = "ForSavedLink" + i;
			} else {
				delete Content[i]["id"];
			}
		}
	};

	UpdateList = () => {
		document.getElementById("divIDList").innerHTML = "";
		for (var i = 0; i < Content.length; i++) {
			AddLabel(Content[i], "#divIDList");
		}
	};

	AddLabel = (Content, element) => {
		$(element).append(
			$('<label>',{
				id : Content.id,
				for : element,
				class : 'label-info',
				text : Content.link + "	" + Content.cell,
				on : {
					click: function(){
						fClickLabel = true;
						$('.label-selected').removeClass('label-selected');
						$(this).addClass('label-selected');
					},
					mouseover: function(){
						$(this).addClass('label-hovered');
					},
					mouseout: function(){
						$(this).removeClass('label-hovered');
					}
				}
			})
		);
	};

	AddNewLink = () => {
		var prevId = (Content.length) ? Content[Content.length-1].id[Content[Content.length-1].id.length-1] : 0;
		Content.push({link: document.getElementById("inputIDFile").value,
					  cell: document.getElementById("inputIDCell").value,
					  cellin: null,
					  id : "ForSavedLink" + ++prevId
					});
	};

	RemoveNewLink = () => {
		var IDRemove =  ($('.label-selected').length) ? $('.label-selected')[0].id : null;
		if (!IDRemove) {
			return;
		}
		for (var i = 0; i < Content.length; i++) {
			if (Content[i].id === IDRemove) {
				Content.splice(i,1);
				break;
			}
		}
	};

	GetLinkForEdit = (id) => {
		DataEdit.FlagEdit = true;
		DataEdit.id = id;
		for (var i = 0; i < Content.length; i++) {
			if (Content[i].id === id) {
				document.getElementById("inputIDFile").value = Content[i].link;
				document.getElementById("inputIDCell").value = Content[i].cell;
				break;
			}
		}
	};

	EditLink = () => {
		for (var i = 0; i < Content.length; i++) {
			if (Content[i].id === DataEdit.id) {
				Content[i].link = document.getElementById("inputIDFile").value;
				Content[i].cell = document.getElementById("inputIDCell").value;
				DataEdit.FlagEdit = false;
				DataEdit.id = null;
				break;
			}
		}
	};

	window.Asc.plugin.init = function() {
		// this.callCommand(function() {
		// 	var oWorksheet = Api.GetActiveSheet();
		// 	oRange = oWorksheet.GetRange('E5');
		// 	console.log("bla bla");
		// 	oRange.range.getName();
		// }, false, false, function(data) {
		// 	console.log("1111111111");
		// 	console.log(data);
		// });
		
		//нет еще получения файла 
		this.executeMethod("GetMacros", [JSON.stringify(Macros)], function(data) {    
			try {
				Macros = JSON.parse(data);
			}
			catch (err) {
				Macros = {
						macrosArray : [],                    
						current 	: -1
				};
			}
			CheckMacros();
			UpdateList();
		});
		
		document.getElementById("buttonIDAdd").onclick = function() {
			document.getElementById("divIdLink").style.display = "block";	
		};

		document.getElementById("buttonIDEdit").onclick = function() {
			document.getElementById("divIdLink").style.display = "block";
			if ($('.label-selected').length){
				GetLinkForEdit($('.label-selected')[0].id);
			}
		};

		document.getElementById("buttonIDOk").onclick = function() {
			if (DataEdit.FlagEdit) {
				EditLink();
			} else {
				AddNewLink();
			}
			document.getElementById("inputIDFile").value = "";
			document.getElementById("inputIDCell").value = "";
			document.getElementById("divIdLink").style.display = "none";
			UpdateList();
		};

		document.getElementById("buttonIDCancel").onclick = function() {
			document.getElementById("inputIDFile").value = "";
			document.getElementById("inputIDCell").value = "";
			document.getElementById("divIdLink").style.display = "none";
		};

		document.getElementById("buttonIDDelete").onclick = function() {
			RemoveNewLink();
			UpdateList();
		};
	};

	window.Asc.plugin.button = function() {
		GenerateRemoveID(false);
		Macros.macrosArray[Content["current"]].value = JSON.stringify(Content);
		this.executeMethod("SetMacros", [JSON.stringify(Macros)], function(){
			window.Asc.plugin.executeCommand("close", "");    
		});
	}; 

})(window, undefined);
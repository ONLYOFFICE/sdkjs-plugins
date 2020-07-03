window.onload = function() {
	
	var isDragging = false;
	var oldSendPos = null;
	
	var element = document.getElementById("id_text");
	element.style.cursor = "default";
	
	var editor = document.getElementById("frameEditor");
	
	function sendToEditor(obj)
	{
		editor.contentWindow.postMessage(JSON.stringify(obj), "*");
	}
	
	window.ondragstart = function(e)
	{		
		document.body.style.cursor = "copy";
		
		if (e.preventDefault)
			e.preventDefault();
		return false;
	}
	
	window.onmousedown = function(e)
	{
		editor.style.pointerEvents = "none";
		document.body.style.cursor = "copy";
		
		isDragging = true;
		oldSendPos = null;
		if (e.preventDefault)
			e.preventDefault();
		return false;
	}
	
	function getEditorPosition(e)
	{
		var X = e.pageX;
		var Y = e.pageY;
		
		if (undefined === X)
			X = e.clientX;
		if (undefined === Y)
			Y = e.clientY;
		
		var jF = jQuery(editor);
		var off = jF.offset();
		var x = off.left;
		var y = off.top;
		var r = x + jF.width();
		var b = y + jF.height();
		
		if (X >= x && X <= r && Y >= y && Y <= b)
		{
			return { x : X - x, y : Y - y };
		}
		
		return null;
	}
	
	window.onmousemove = function(e)
	{
		if (!isDragging)
			return;
		
		document.body.style.cursor = "copy";
		
		var pos = getEditorPosition(e);
		
		if (pos)
		{
			oldSendPos = { x : pos.x, y : pos.y };
			sendToEditor({
				type : "onExternalPluginMessage",
				subType: "internalCommand",
				data : {
					type: "onbeforedrop",
					x : pos.x,
					y : pos.y
				}
			});
		}
	}
	
	window.onmouseup = function(e)
	{	
		editor.style.pointerEvents = "";
		document.body.style.cursor = "default";
		
		if (isDragging)
		{
			var pos = getEditorPosition(e);
		
			if (pos)
			{
				sendToEditor({
					type : "onExternalPluginMessage",
					subType: "internalCommand",
					data : {
						type: "ondrop",
						x : pos.x,
						y : pos.y,
						text : "test text",
						html : "<span>test html</span>"
					}
				});
			}
			else
			{
				if (oldSendPos)
				{
					sendToEditor({
						type : "onExternalPluginMessage",
						subType: "internalCommand",
						data : {
							type: "ondrop",
							x : oldSendPos.x,
							y : oldSendPos.y
						}
					});
				}
			}
		}
				
		isDragging = false;
		oldSendPos = null;
		
		if (e.preventDefault)
			e.preventDefault();
		return false;
	}

};

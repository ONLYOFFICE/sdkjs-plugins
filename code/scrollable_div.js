/*
Before use this module you need include in your script JQuery library
If you need to create a scrollable div then use the function in your code
div has position: absolute and overflow: hidden
result.create_div (parent_id,width,height,top,right,bottom,left);
parent_id - id of the element, after which the div is inserted;
width - width div;
height - height div;
top, right, left, bottom - the distance from the parent element to the div
For update scroll use funcrion result.updateScroll();
After the creation outer div has id = scrollable-container-id, and inner div has id = conteiner_id
You can apply your classes to this divs
*/

(function(window,undefined) {

	var container = document.createElement("div");
	container.id = "scrollable-container-id";
	var textElem = document.createElement("div");
	textElem.id = "conteiner_id";

	var lockMouseInterval = -1;
	var mousePos = { x : 0, y : 0 };
	
	result = {
		  
		create_div: function (parent_id,width,height,top,right,bottom,left) {
			if (!parent_id)
				return;

			var parent = document.getElementById(parent_id); 
			container.style.position = "absolute";
			container.style.width = width || "100%";
			if(height)
				container.style.height = height || "100%";
			container.style.left = left || "1%";
			container.style.top = top || "1%";
			container.style.right = right || "1%";
			container.style.bottom = bottom || "1%";
			container.style.overflow = "hidden";

			textElem.style.position = "absolute";
			textElem.style.width = "98%";
			textElem.style.height = "98%";
			textElem.style.left = "0";
			textElem.style.top = "0";
			textElem.style.outline = "none";
			textElem.style.whiteSpace = "pre";
			textElem.contentEditable = "true";			
			
			container.appendChild(textElem);
			$(container).insertAfter(("#" + parent_id));
		},

		updateScroll: function()
		{
			Ps.update(container);
			if($('.ps__scrollbar-y').height() === 0){
				$('.ps__scrollbar-y').css('border-width', '0px');
			}
			else{
				$('.ps__scrollbar-y').css('border-width', '1px');
			}
			if($('.ps__scrollbar-x').width() === 0){
				$('.ps__scrollbar-x').css('border-height', '0px');
			}
			else{
				$('.ps__scrollbar-x').css('border-height', '1px');
			}
		}
	} 

	Ps.initialize(container, {
		theme : 'custom-theme'
	});
	
	
	
	result.updateScroll();
  
	function onSelectWheel()
	{
		var $textElem = $(textElem);
		var position = $textElem.offset();
		
		var width = $textElem.outerWidth();
		var height = $textElem.outerHeight();
		
		var maxX = container.scrollWidth;
		var maxY = container.scrollHeight;
				
		var scrollX = container.scrollLeft;
		var scrollY = container.scrollTop;
		
		var left = position.left + scrollX;
		var top = position.top + scrollY;
		
		var step = 20;
		if (mousePos.x < left)
			scrollX -= step;
		else if (mousePos.x > (left + width))
			scrollX += step;

		if (mousePos.y < top)
			scrollY -= step;
		else if (mousePos.y > (top + height))
			scrollY += step;
	
		if (scrollX < 0)
			scrollX = 0;
		if (scrollX > maxX)
			scrollX = maxX;
		if (scrollY < 0)
			scrollY = 0;
		if (scrollY > maxY)
			scrollY = maxY;
		
		container.scrollLeft = scrollX;
		container.scrollTop = scrollY;
	}

	textElem.onmousedown = function(e) {
		
		if (-1 == lockMouseInterval)
			lockMouseInterval = setInterval(onSelectWheel, 20);
		
		mousePos.x = e.pageX || e.clientX;
		mousePos.y = e.pageY || e.clientY;
				
	};
	textElem.onmouseup = function(e) {
		
		if (-1 != lockMouseInterval)
			clearInterval(lockMouseInterval);
		lockMouseInterval = -1;
		
	};
	
	window.addEventListener('mousemove', function(e) {
		
		if (-1 == lockMouseInterval)
			return;
		
		mousePos.x = e.pageX || e.clientX;
		mousePos.y = e.pageY || e.clientY;
	
	}, false);
	
	window.addEventListener('mouseup', function() {
		
		if (-1 != lockMouseInterval)
			clearInterval(lockMouseInterval);
		lockMouseInterval = -1;
		
	}, false);
	
	
	})(window,undefined);
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
	var flagInit = false;
	var fBtnGetAll = false;
	var ArrContentControls = {};

    window.Asc.plugin.init = function()
    {
		//event "init" from plugin
		document.getElementById("buttonIDPaste").onclick = function() {
			if (!$.isEmptyObject(ArrContentControls) && $('.label-selected').length) {
				var tmpArr = ArrContentControls[$('.label-selected')[0].id].id;
				for (var i = 0; i < tmpArr.length; i++) {
					//method for select content control by id
					window.Asc.plugin.executeMethod("SelectContentControl",[tmpArr[i]]);
					//method for paste text into document
					window.Asc.plugin.executeMethod("PasteText", ["Test paste for document"]);
				}
			} else {
				window.Asc.plugin.executeMethod("PasteText", ["Test paste for document"]);
			}
			

		};

		document.getElementById("buttonIDGetAll").onclick = function() {
			//method for get all content controls
			window.Asc.plugin.executeMethod("GetAllContentControls");
			fBtnGetAll = true;					

		};

		if (!flagInit) {
			flagInit = true;
			//method for get all content controls
			window.Asc.plugin.executeMethod("GetAllContentControls");
		}
	};
	
	addLabel = (arrEl, element) => {
		$(element).append(
			$('<label>',{
				id : arrEl.tag,
				for : element,
				class : 'label-info',
				text : arrEl.tag,
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

	compareArr = (arr) => {
		ArrContentControls = {};
		for (var i = 0; i < arr.length; i++) {
			if (!arr[i].Tag) {
				continue;
			}
			if (ArrContentControls[arr[i].Tag]) {
				ArrContentControls[arr[i].Tag].id.push(arr[i].InternalId);
			} else {
				ArrContentControls[arr[i].Tag] = {
					id : [arr[i].InternalId],
					tag : arr[i].Tag 
				};
			}
		}
	};
	
    window.Asc.plugin.button = function()
    {
		this.executeCommand("close", "");
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		//evend return for completed methods
		var _plugin = window.Asc.plugin;
		if (_plugin.info.methodName == "GetAllContentControls")
		{
			compareArr(returnValue);
			fBtnGetAll = false;

			document.getElementById("divG").innerHTML = "";
			for (const key in ArrContentControls) {
				addLabel(ArrContentControls[key], "#divG");
			}
		} 
	};
})(window, undefined);
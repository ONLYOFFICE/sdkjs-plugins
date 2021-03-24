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

    window.Asc.plugin.init = function(text)
    {
		if (!flagInit) {
			//get all content controls
			this.executeMethod("GetAllContentControls",null,function(data){
				for (var i = 0; i < data.length; i++) {
					if (data[i].Tag == 11) {
						//select content control with tag 11 (for example)
						this.Asc.plugin.executeMethod("SelectContentControl",[data[i].InternalId]);
						break;
					}
				}
			});
			flagInit = true;
		} else {
			if (Asc.scope.text) {
				//paste text into document
				this.executeMethod("PasteText",[Asc.scope.text],function (){
					Asc.scope.text = null;
					this.Asc.plugin.executeCommand("close", "");
				});
			} else {
				Asc.scope.text = text;
				//get all content controls
				this.executeMethod("GetAllContentControls",null,function(data){
					for (var i = 0; i < data.length; i++) {
						if (data[i].Tag == 14) {
						
							//select content control with tag 14 (for example)	
							this.Asc.plugin.executeMethod("SelectContentControl",[data[i].InternalId]);
							break;
						}
					}
				});
			}
		}
	};
		
    window.Asc.plugin.button = function()
    {
    };

})(window, undefined);
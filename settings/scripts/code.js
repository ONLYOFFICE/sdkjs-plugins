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

// Example set settings to editors
(function(window, undefined){
    
    window.Asc.plugin.init = function()
    {
		var initSettings = {
			copyoutenabled : false,
			watermark_on_draw : JSON.stringify({
				//watermark settings
				"transparent" : 0.3,
				"type" : "rect",
				"width" : 100,
				"height" : 100,
				"rotate" : -45,
				"margins" : [ 10, 10, 10, 10 ],
				"fill" : [255, 0, 0],
				"stroke-width" : 1,
				"stroke" : [0, 0, 255],
				"align" : 1,
				
				"paragraphs" : [ {
					"align" : 2,
					"fill" : [255, 0, 0],
					"linespacing" : 1,
					
					"runs" : [
							{
								//text settings
								"text" : "Do not steal, %user_name%!",
								"fill" : [0, 0, 0],
								"font-family" : "Arial",
								"font-size" : 40,
								"bold" : true,
								"italic" : false,
								"strikeout" : false,
								"underline" : false
							},
							{
								"text" : "<%br%>"
							}
						]
					}
				]
			})
		};
		//method for set properties to document
        this.executeMethod("SetProperties", [initSettings], function() {
            window.Asc.plugin.executeCommand("close", "");
        });
    };

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    };

})(window, undefined);

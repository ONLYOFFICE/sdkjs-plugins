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

	var loader;

    window.Asc.plugin.init = function()
    {
		$('#select_example').select2({
			data : [{id:0, text:'Item 1'},{id:1, text:'Item 2'},{id:2, text:'Item 3'}],
			minimumResultsForSearch: Infinity,
			width : '120px'
		});

		$('#show-loader').on('click', function(){
			loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
			loader = showLoader($('#loader-container')[0], 'Loading...');
		});

		$('#hide-loader').on('click', function(){
			loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
			loader = undefined;
		});
	};

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
	};
})(window, undefined);

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

(function(window){

	// available formats for editors
	const formats = {
		document : ['DOCX', 'PDF', 'ODT', 'TXT', 'DOTX', 'PDFA', 'OOT', 'RTF', 'DOCXF', 'OFORM', 'HTML', 'FB2', 'EPUB'],
		spreadsheet : ['XLSX', 'PDF', 'ODS', 'CSV', 'XLSTX', 'PDFA', 'OTS'],
		presentation : ['PPTX', 'PDF', 'ODP', 'POTX', 'PDFA', 'OTP', 'PPSX', 'PNG', 'JPG']
	};
	let loader;

    window.Asc.plugin.init = function()
    {
		const select = document.getElementById('select_format');
		let arr;
		// detect type of editor
		switch (window.Asc.plugin.info.editorType) {
			case 'word':
				arr = formats.document;
				break;
			case 'cell':
				arr = formats.spreadsheet
				break;
			case 'slide':
				arr = formats.presentation
				break;
		};
		// create options with formats for select
		arr.forEach((el)=>{
			let opt = document.createElement('option');
			opt.value = el;
			opt.innerText = el;
			select.appendChild(opt)
		});
		document.getElementById('btn_download').onclick = function() {
			// create loader
			loader = showLoader($('#loader-container')[0], 'Loading...');
			// get format (must be in upper case)
			let format = select.selectedOptions[0].value;
			// ececute method for getting file
			window.Asc.plugin.executeMethod("GetFileToDownload", [format], function(data){
				if (data == "error") {
					console.error(new Error('error with download'));
				} else if (window["AscDesktopEditor"]) {
					// if it's desktop, then will oped dialog window for save (we musn't create link for download)
					// do nothing
				} else {
					console.log(data);
					// create link for download
					let a = document.createElement('a');
					// add url to link
					a.href = data;
					// add link to document
					document.body.appendChild(a);
					// hide link
					a.style = 'display: none';
					// click link to download
					a.click();
					// remove link from document
					(a.remove ? a.remove() : $(document).removeChild(a));
				}
				// hide loader
				loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
				loader = undefined;
			});
		};
    };

    window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};

})(window);

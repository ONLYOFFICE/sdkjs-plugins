/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (window, undefined) {
	let loader;
	let isDarkTheme = false;
	let elements = {};
	let apiKey = null;
	let errTimeout = null;
	let modalTimeout = null;
	let maxChars = 1000;
	let startQuery;
	const isIE = checkInternetExplorer();

	const arrAllowedSize = [{id: 'idx256', text: '256x256', width: 256},
							{id: 'idx512', text: '512x512', width: 512}, 
							{id: 'idx1024', text: '1024x1024', width: 1024}]; 

	window.Asc.plugin.init = function() {
		if (isIE) {
			document.getElementById('div_ie_error').classList.remove('hidden');
			return;
		} 

		apiKey = localStorage.getItem('OpenAiApiKey') || null;

		addSlidersListeners();
		addTitlelisteners();
		initElements();
		initScrolls();
		queryDocumentSelectedText();

		if (apiKey) {
			elements.divContent.classList.remove('hidden');
		} else {
			elements.divConfig.classList.remove('hidden');
		}

		// elements.textArea.value = startQuery;
		elements.inpTopSl.oninput = onSlInput;

		elements.btnSaveConfig.onclick = function() {
			elements.apiKeyField.classList.remove('error_border');
			elements.textArea.classList.remove('error_border');
			document.getElementById('apiKeyError').classList.add('hidden');
			document.getElementById('lb_key_err').innerHTML = '';
			document.getElementById('lb_key_err_mes').innerHTML = '';
			elements.divConfig.classList.add('hidden');
			apiKey = elements.apiKeyField.value.trim();
			localStorage.setItem('OpenAiApiKey', apiKey);

			elements.divContent.classList.remove('hidden');
		};

		elements.reconfigure.onclick = function() {
			if (errTimeout) {
				clearTimeout(errTimeout);
				errTimeout = null;
				clearMainError();
			}
			localStorage.removeItem('OpenAiApiKey');
			elements.apiKeyField.value = apiKey;
			apiKey = '';
			elements.divContent.classList.add('hidden');
			elements.divConfig.classList.remove('hidden');
		};

		elements.btnClear.onclick = function() {
			elements.textArea.value = '';
			elements.textArea.focus();
		};

		elements.textArea.oninput = function(event) {
			elements.textArea.classList.remove('error_border');

			elements.lbTokens.innerText = event.target.value.trim().length;
			checkLen();
		};

		elements.divTokens.onmouseenter = function() {
			elements.modal.classList.remove('hidden');
			if (modalTimeout) {
				clearTimeout(modalTimeout);
				modalTimeout = null;
			}
		};

		elements.divTokens.onmouseleave = function() {
			modalTimeout = setTimeout(function() {
				elements.modal.classList.add('hidden');
			},100)
		};

		elements.modal.onmouseenter = function() {
			if (modalTimeout) {
				clearTimeout(modalTimeout);
				modalTimeout = null;
			}
		};

		elements.modal.onmouseleave = function() {
			elements.modal.classList.add('hidden');
		};

		elements.labelMore.onclick = function() {
			elements.linkMore.click();
		};

		elements.btnShowSettins.onclick = function() {
			elements.divParams.classList.toggle('hidden');
			elements.arrow.classList.toggle('arrow_down');
			elements.arrow.classList.toggle('arrow_up');
		};

		elements.btnSubmit.onclick = function() {
			const settings = {
				prompt: elements.textArea.value,
				size: "256x256",
				n: Number.parseInt(elements.inpTopSl.value),
				response_format: "b64_json",
			};

			const _size_val = $('#idx_imgsize').val();
			const _model = arrAllowedSize.find(m => m.id == _size_val);

			const _insert_image = info => {
				let sImageSrc = /^data\:image\/png\;base64/.test(info.base64img) ? info.base64img : `data:image/png;base64,${info.base64img}`;
				let oImageData = {
					"src": sImageSrc,
					"width": _model.width,
					"height": _model.width
				};
				window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);	
			}

			const _parse_img = info => {
				if ( info.data && typeof info.data == 'object' ) 
				{
					let cnt = document.getElementById("idx-preview");
					cnt.addEventListener('dblclick', e => {
						if ( !!e.target.dataset && !!info.data[e.target.dataset.index] ) {
							_insert_image({base64img: info.data[e.target.dataset.index].b64_json});
						}
					});

					let box = document.getElementById("idx-boxpreview");
					box.innerHTML = "";
					for (let i in info.data) {
						const img = document.createElement('img');
						img.src = `data:image/png;base64, ${info.data[i].b64_json}`;
						img.classList.add('gen-img-preview');
						img.setAttribute('data-index', i);
						box.appendChild(img);
					}
				} 
			}

			// _f();
			// return;

			createLoader();
			fetch('https://api.openai.com/v1/images/generations', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + apiKey,
				},
				body: JSON.stringify(settings),
			}).then(function(response) {
				return response.json()
			}).then(function(obj) {
				if ( obj.data && typeof obj.data == 'object' && 
						settings.response_format == 'b64_json' && obj.data["0"].b64_json ) 
				{
					_parse_img(obj);
				}
			}).catch(function(error) {
				elements.mainError.classList.remove('hidden');
				elements.mainErrorLb.innerHTML = error.message;
				if (errTimeout) {
					clearTimeout(errTimeout);
					errTimeout = null;
				}
				errTimeout = setTimeout(clearMainError, 10000);
			}).finally(function(){
				destroyLoader();
			});
		}
	};

	function queryDocumentSelectedText () {
		const _setStartQueryText = function(text) {
			document.getElementById('textarea').value = text;
			document.getElementById('lb_tokens').innerText = text.trim().length;

			checkLen();
		}

		switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                    _setStartQueryText(data.replace(/\r/g, ' '));
                });
                break;
            }
            case 'cell':
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                    // if (data == '')
						// startQuery = startQuery.replace(/\r/g, ' ').replace(/\t/g, '\n');
                    // else 
						_setStartQueryText(startQuery = data.replace(/\r/g, ' '));
                });
                break;
        }

	};

	function initElements() {
		$('#idx_imgsize').select2({
			data: arrAllowedSize,
			minimumResultsForSearch: Infinity
		});


		elements.inpTopSl       = document.getElementById('inp_top_sl');
		elements.textArea       = document.getElementById('textarea');
		elements.btnSubmit      = document.getElementById('btn_submit');
		elements.btnClear       = document.getElementById('btn_clear');
		elements.btnSaveConfig  = document.getElementById('btn_saveConfig');
		elements.apiKeyField    = document.getElementById('apiKeyField');
		elements.divContent     = document.getElementById('div_content');
		elements.divConfig      = document.getElementById('div_config');
		elements.reconfigure    = document.getElementById('logoutLink');
		elements.mainError      = document.getElementById('div_err');
		elements.mainErrorLb    = document.getElementById('lb_err');
		elements.keyError       = document.getElementById('apiKeyError');
		elements.keyErrorLb     = document.getElementById('lb_key_err');
		elements.keyErrorMes    = document.getElementById('lb_key_err_mes');
		elements.lbTokens       = document.getElementById('lb_tokens');
		elements.divTokens      = document.getElementById('div_tokens');
		elements.modal          = document.getElementById('div_modal');
		elements.modalErrLen    = document.getElementById('modal_err_len');
		elements.modalError     = document.getElementById('modal_error');
		elements.modalLink      = document.getElementById('modal_link');
		elements.labelMore      = document.getElementById('lb_more');
		elements.linkMore       = document.getElementById('link_more');
		elements.btnShowSettins = document.getElementById('div_show_settings');
		elements.divParams      = document.getElementById('div_parametrs');
		elements.arrow          = document.getElementById('arrow');
	};

	function initScrolls() {
		PsMain = new PerfectScrollbar('#div_content', {});
		PsConf = new PerfectScrollbar('#div_config', {});
	};

	function addSlidersListeners() {
		const rangeInputs = document.querySelectorAll('input[type="range"]');

		function handleInputChange(e) {
			let target = e.target;
			if (e.target.type !== 'range') {
				target = document.getElementById('range');
			} 
			const min = target.min;
			const max = target.max;
			const val = target.value;
			
			target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
		};

		rangeInputs.forEach(function(input) {
			input.addEventListener('input', handleInputChange);
		});
	};

	function addTitlelisteners() {
		let divs = document.querySelectorAll('.div_parametr');
		divs.forEach(function(div) {
			div.addEventListener('mouseenter', function handleClick(event) {
				event.target.children[0].classList.remove('hidden');
			});

			div.addEventListener('mouseleave', function handleClick(event) {
				event.target.children[0].classList.add('hidden');
			});
		});
	};

	function onSlInput(e) {
		e.target.nextElementSibling.innerText = e.target.value;
	};

	function createLoader() {
		$('#loader-container').removeClass( "hidden" );
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = showLoader($('#loader-container')[0], getMessage('Loading...'));
	};

	function destroyLoader() {
		$('#loader-container').addClass( "hidden" )
		loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
		loader = undefined;
	};

	function clearMainError() {
		elements.mainError.classList.add('hidden');
		elements.mainErrorLb.innerHTML = '';
	};

	function getMessage(key) {
		return window.Asc.plugin.tr(key);
	};

	function updateScroll() {
		PsMain && PsMain.update();
		PsConf && PsConf.update();
	};

	function checkInternetExplorer() {
		let rv = -1;
		if (window.navigator.appName == 'Microsoft Internet Explorer') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		} else if (window.navigator.appName == 'Netscape') {
			const ua = window.navigator.userAgent;
			const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');

			if (re.exec(ua) != null) {
				rv = parseFloat(RegExp.$1);
			}
		}
		return rv !== -1;
	};

	function checkLen() {
		let cur = Number.parseInt(elements.lbTokens.innerText);
		if (cur > maxChars) {
			elements.modalError.classList.remove('hidden');
			elements.modalLink.classList.remove('hidden');
			elements.lbTokens.parentNode.classList.add('lb_err');
		} else {
			elements.modalError.classList.add('hidden');
			elements.modalLink.classList.add('hidden');
			elements.lbTokens.parentNode.classList.remove('lb_err');
		}
	};

	window.Asc.plugin.onTranslate = function() {
		let elements = document.querySelectorAll('.i18n');

		for (let index = 0; index < elements.length; index++) {
			let element = elements[index];
			element.innerText = getMessage(element.innerText);
		}
	};

	window.Asc.plugin.onThemeChanged = function(theme)
	{
		window.Asc.plugin.onThemeChangedBase(theme);
		if (isIE) return;

		let rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
		let sliderBG, thumbBG
		if (theme.type.indexOf('dark')) {
			isDarkTheme = true;
			sliderBG = theme.Border || '#757575';
			// for dark '#757575';
			// for contrast dark #616161
			thumbBG = '#fcfcfc';
		} else {
			isDarkTheme = false;
			sliderBG = '#ccc';
			thumbBG = '#444';
		}
		rule += '\n input[type="range"] { background-color: '+sliderBG+' !important; background-image: linear-gradient('+thumbBG+', '+thumbBG+') !important; }';
		rule += '\n input[type="range"]::-webkit-slider-thumb { background: '+thumbBG+' !important; }';
		rule += '\n input[type="range"]::-moz-range-thumb { background: '+thumbBG+' !important; }';
		rule += '\n input[type="range"]::-ms-thumb { background: '+thumbBG+' !important; }';
		rule += "\n .arrow { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
		
		let styleTheme = document.createElement('style');
		styleTheme.type = 'text/css';
		styleTheme.innerHTML = rule;
		document.getElementsByTagName('head')[0].appendChild(styleTheme);
	};

	window.onresize = function() {
		updateScroll();
	};

	window.Asc.plugin.button = function(id) {
		window.Asc.plugin.executeCommand("close", "");
	};

})(window, undefined);

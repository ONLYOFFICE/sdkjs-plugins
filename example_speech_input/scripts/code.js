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

	var curLang;

	// If you modify this array, also update default language / dialect below.
	var langs =
		[['Afrikaans',      [['af-ZA']]],
		['አማርኛ',           [['am-ET']]],
		['Azərbaycanca',    [['az-AZ']]],
		['বাংলা',            [['bn-BD', 'বাংলাদেশ'],
							['bn-IN', 'ভারত']]],
		['Bahasa Indonesia',[['id-ID']]],
		['Bahasa Melayu',   [['ms-MY']]],
		['Català',          [['ca-ES']]],
		['Čeština',         [['cs-CZ']]],
		['Dansk',           [['da-DK']]],
		['Deutsch',         [['de-DE']]],
		['English',         [['en-AU', 'Australia'],
							['en-CA', 'Canada'],
							['en-IN', 'India'],
							['en-KE', 'Kenya'],
							['en-TZ', 'Tanzania'],
							['en-GH', 'Ghana'],
							['en-NZ', 'New Zealand'],
							['en-NG', 'Nigeria'],
							['en-ZA', 'South Africa'],
							['en-PH', 'Philippines'],
							['en-GB', 'United Kingdom'],
							['en-US', 'United States']]],
		['Español',         [['es-AR', 'Argentina'],
							['es-BO', 'Bolivia'],
							['es-CL', 'Chile'],
							['es-CO', 'Colombia'],
							['es-CR', 'Costa Rica'],
							['es-EC', 'Ecuador'],
							['es-SV', 'El Salvador'],
							['es-ES', 'España'],
							['es-US', 'Estados Unidos'],
							['es-GT', 'Guatemala'],
							['es-HN', 'Honduras'],
							['es-MX', 'México'],
							['es-NI', 'Nicaragua'],
							['es-PA', 'Panamá'],
							['es-PY', 'Paraguay'],
							['es-PE', 'Perú'],
							['es-PR', 'Puerto Rico'],
							['es-DO', 'República Dominicana'],
							['es-UY', 'Uruguay'],
							['es-VE', 'Venezuela']]],
		['Euskara',         [['eu-ES']]],
		['Filipino',        [['fil-PH']]],
		['Français',        [['fr-FR']]],
		['Basa Jawa',       [['jv-ID']]],
		['Galego',          [['gl-ES']]],
		['ગુજરાતી',           [['gu-IN']]],
		['Hrvatski',        [['hr-HR']]],
		['IsiZulu',         [['zu-ZA']]],
		['Íslenska',        [['is-IS']]],
		['Italiano',        [['it-IT', 'Italia'],
							['it-CH', 'Svizzera']]],
		['ಕನ್ನಡ',             [['kn-IN']]],
		['ភាសាខ្មែរ',          [['km-KH']]],
		['Latviešu',        [['lv-LV']]],
		['Lietuvių',        [['lt-LT']]],
		['മലയാളം',          [['ml-IN']]],
		['मराठी',            [['mr-IN']]],
		['Magyar',          [['hu-HU']]],
		['ລາວ',             [['lo-LA']]],
		['Nederlands',      [['nl-NL']]],
		['नेपाली भाषा',         [['ne-NP']]],
		['Norsk bokmål',    [['nb-NO']]],
		['Polski',          [['pl-PL']]],
		['Português',       [['pt-BR', 'Brasil'],
							['pt-PT', 'Portugal']]],
		['Română',          [['ro-RO']]],
		['සිංහල',            [['si-LK']]],
		['Slovenščina',     [['sl-SI']]],
		['Basa Sunda',      [['su-ID']]],
		['Slovenčina',      [['sk-SK']]],
		['Suomi',           [['fi-FI']]],
		['Svenska',         [['sv-SE']]],
		['Kiswahili',       [['sw-TZ', 'Tanzania'],
							['sw-KE', 'Kenya']]],
		['ქართული',         [['ka-GE']]],
		['Հայերեն',         [['hy-AM']]],
		['தமிழ்',            [['ta-IN', 'இந்தியா'],
						    ['ta-SG', 'சிங்கப்பூர்'],
							['ta-LK', 'இலங்கை'],
							['ta-MY', 'மலேசியா']]],
		['తెలుగు',           [['te-IN']]],
		['Tiếng Việt',      [['vi-VN']]],
		['Türkçe',          [['tr-TR']]],
		['اُردُو',            [['ur-PK', 'پاکستان'],
							['ur-IN', 'بھارت']]],
		['Ελληνικά',        [['el-GR']]],
		['български',       [['bg-BG']]],
		['Русский',         [['ru-RU']]],
		['Српски',          [['sr-RS']]],
		['Українська',      [['uk-UA']]],
		['한국어',            [['ko-KR']]],
		['中文',             [['cmn-Hans-CN', '普通话 (中国大陆)'],
							['cmn-Hans-HK', '普通话 (香港)'],
							['cmn-Hant-TW', '中文 (台灣)'],
							['yue-Hant-HK', '粵語 (香港)']]],
		['日本語',           [['ja-JP']]],
		['हिन्दी',             [['hi-IN']]],
		['ภาษาไทย',         [['th-TH']]]];

	var is_chrome = ((navigator.userAgent.indexOf("Chrome") !== -1) && (navigator.vendor.indexOf("Google Inc") !== -1)) ? true : false;

	window.Asc.plugin.init = function() {
		if (!is_chrome) {
			showInfo("info_use_chrome");
			document.getElementById("div_main").style.display = "none";
			return;
		}
		var languages = langs.map(function(el, ind) {
			return {
				id : ind,
				text : el[0],
				code : el[1]
			};
		});
		curLang = languages[0].code[0][0];

		updateSecondMenu = (data) => {
			var tmp = data.code.map(function(el, ind) {
				return {
					id : ind,
					text : el[1] || $('#custom_menu option:selected')[0].text,
					code : el[0]
				};
			});
			curLang = data.code[0][0];
			$('#custom_menu2').data('select2').dataAdapter.updateOptions(tmp);
		};


		$('#custom_menu').select2({
			data : languages
		}).on('select2:select', function (e) {
			updateSecondMenu(e.params.data);
			// console.log(e.params.data);
		});
		
		$.fn.select2.amd.define('select2/data/customAdapter', ['select2/data/array', 'select2/utils'],
			function (ArrayAdapter, Utils) {
				function CustomDataAdapter ($element, options) {
					CustomDataAdapter.__super__.constructor.call(this, $element, options);
				}
				Utils.Extend(CustomDataAdapter, ArrayAdapter);
				CustomDataAdapter.prototype.updateOptions = function (data) {
					this.$element.find('option').remove();
					this.addOptions(this.convertToOptions(data));
				}        
				return CustomDataAdapter;
			}
		);

		var customAdapter = $.fn.select2.amd.require('select2/data/customAdapter');
		$('#custom_menu2').select2({
			dataAdapter: customAdapter,
			data : [{id : 0, text: languages[0].text, code: languages[0].code}]
		}).on('select2:select', function (e) {
			// console.log(e.params.data);
			curLang = e.params.data.code;
		});
		
		var final_transcript = '',
		recognizing = false,
		ignore_onend,
		start_timestamp;

		if (!('webkitSpeechRecognition' in window)) {
			upgrade();
		} else {
			start_button.style.display = 'inline-block';
			var recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;

			recognition.onstart = function() {
				recognizing = true;
				showInfo('info_speak_now');
				start_img.src = './resources/img/mic_src/mic-animate.png';
			};

			recognition.onerror = function(event) {
				if (event.error == 'no-speech') {
					start_img.src = './resources/img/mic_src/mic.png';
					showInfo('info_no_speech');
					ignore_onend = true;
				}
				if (event.error == 'audio-capture') {
					start_img.src = './resources/img/mic_src/mic.png';
					showInfo('info_no_microphone');
					ignore_onend = true;
				}
				if (event.error == 'not-allowed') {
					if (event.timeStamp - start_timestamp < 100) {
						showInfo('info_blocked');
					} else {
						showInfo('info_denied');
					}
					ignore_onend = true;
				}
			};

			recognition.onend = function() {
				recognizing = false;
				if (ignore_onend) {
					return;
				}
				start_img.src = './resources/img/mic_src/mic.png';
				if (!final_transcript) {
					showInfo('info_start');
					return;
				}
				showInfo('info_start');
			};

			recognition.onresult = function(event) {
				var interim_transcript = '';
				final_transcript = '';
				if (typeof(event.results) == 'undefined') {
					recognition.onend = null;
					recognition.stop();
					upgrade();
					return;
				}
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						final_transcript += event.results[i][0].transcript;
					} else {
						interim_transcript += event.results[i][0].transcript;
					}
				}
				final_transcript = capitalize(final_transcript);
				if (event.results[0].isFinal) {
					window.Asc.plugin.executeMethod("PasteHtml",[linebreak(final_transcript)]);
				}
				interim_span.innerHTML = linebreak(interim_transcript);
			};
		};

		function upgrade() {
			start_button.style.visibility = 'hidden';
			showInfo('info_upgrade');
		};

		const paragraph = '<!--StartFragment--><p style="margin-top:0pt;margin-bottom:9.999977952755906pt;border:none;mso-border-left-alt:none;mso-border-top-alt:none;mso-border-right-alt:none;mso-border-bottom-alt:none;mso-border-between:none" class="docData;DOCY;v5;1177;BAiAAgAABoQCAAAD3AIAAAXqAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUAAAAAE8AAAABGAAAAAEGAAAAAAkGAAAAABoGAAAAABsGAAAAAAItAAAABQoAAAABAAAAAAgAAAAABQoAAAABAAAAAAgAAAAABQoAAAABAAAAAAgAAAAACgAAAAAAAAAAEQAAAACrAQAAAOIAAAAAAQABBhIAAAACBQAAAAADBQAAAAAEBQAAAAAFAQEGAQAHAQAIAQAJBhsAAAAKBTfBAQALAQEcAQAMBQAAAAAdAQANBQliBQAOBg4AAAAAAQEBA////wIGAAAAABkBARsGfQAAAAAUAAAAAAMAAAABBQAAAAACBeZEAAADAQABFAAAAAADAAAAAQUAAAAAAgXmRAAAAwEAAhQAAAAAAwAAAAEFAAAAAAIF5kQAAAMBAAMUAAAAAAMAAAABBQAAAAACBeZEAAADAQALFAAAAAADAAAAAQUAAAAAAgXmRAAAAwEAAboAAAAAAQABAQACAQADAQAEBgoAAABBAHIAaQBhAGwABQYKAAAAQQByAGkAYQBsAAcGCgAAAEEAcgBpAGEAbAAGBgoAAABBAHIAaQBhAGwACAQWAAAACgEADAEADgUAAAAADwEAEAEAEQEAEgUAAAAAFAEAFQEAFgQWAAAAFwEAGAEAGQYKAAAAZQBuAC0AVQBTABoGCgAAAGEAcgAtAFMAQQAbBgoAAABlAG4ALQBVAFMAHAYCAAAAAAAeAQACAAAAAA==">&nbsp;</p><!--EndFragment-->'; 
		const two_line = /\n\n/g;
		const one_line = /\n/g;
		function linebreak(s) {
			if (s.indexOf('\n') !== -1) {
				s = s.substr(1);
			}
			return s.replace(two_line, paragraph).replace(one_line, paragraph);
		};

		const first_char = /\S/;
		function capitalize(s) {
			return s.replace(first_char, function(m) { return m.toUpperCase(); });
		};

		start_button.onclick = function(event) {
			if (recognizing) {
				recognition.stop();
				return;
			}
			final_transcript = '';
			recognition.lang = curLang;
			recognition.start();
			ignore_onend = false;
			interim_span.innerHTML = '';
			start_img.src = './resources/img/mic_src/mic-slash.png';
			showInfo('info_allow');
			start_timestamp = event.timeStamp;
		};

		function showInfo(s) {
			if (s) {
				for (var child = info.firstChild; child; child = child.nextSibling) {
					if (child.style) {
						child.style.display = child.id == s ? 'inline' : 'none';
					}
				}
				info.style.visibility = 'visible';
			} else {
				info.style.visibility = 'hidden';
			}
		};
	
	};

})(window, undefined);
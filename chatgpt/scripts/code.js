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
(function(window, undefined){
	let ApiKey = '';
	let bHasKey = false;
	const model = 'text-davinci-003';
	const maxLen = 4000;
	let loadingPhrase = 'Loading...';

	window.Asc.plugin.init = function() {
		ApiKey = localStorage.getItem('OpenAIApiKey') || '';
		if (!ApiKey.length) {
			console.error(new Error('Please enter Api key!'));
		} else {
			bHasKey = true;
		}
	};

	window.Asc.plugin.attachEvent("onContextMenuShow", function(options) {
		if (!bHasKey || !options)
			return;

		switch (options.type)
		{
			case "Target":
			{
				// this.executeMethod("AddContextMenuItem", [{
				// 	guid : this.guid,
				// 	items : [
				// 		{
				// 			id : "onRandomImage",
				// 			text : { en : "Random image", ru : "Рандомная картинка" },
				// 		}
				// 	]
				// }]);
				break;
			}
			case "Selection":
			{
				this.executeMethod("AddContextMenuItem", [{
					guid : this.guid,
					items : [
						{
							id : "TextAnalysis",
							text : { en : "Text analysis", ru : "Анализ Текста" },
							items : [
								{
									id : "onSummarize",
									text : { en : "Summarize", ru : "Резюмировать" }
								},
								{
									id : "onKeyWords",
									text : { en : "Keywords", ru : "Ключевые слова" }
								},
							]
						},
						{
							id : "Tex Meaning",
							text : { en : "Word analysis", ru : "Анализ слова" },
							items : [
								{
									id : "onMeaning",
									text : { en : "Explain text in comment", ru : "Значение слова" }
								},
								{
									id : "onMeaningLink",
									text : { en : "Explain text in hyperlink", ru : "Ссылка на значение" }
								}
							]
						},
						{
							id : "TranslateText",
							text : { en : "Translate", ru : "Перевести" },
							items : [
								{
									id : "onFrenchTr",
									text : { en : "Translate to French", ru : "Перевести на Французкий" }
								},
								{
									id : "onGermanTr",
									text : { en : "Translate to German", ru : "Перевсти на Немецкий" }
								}
							]
						},
						{
							id : "OnGenerateImage",
							text : { en : "Generate image from text", ru : "Создать картинку по тексту" },
						}
					]
				}]);
				break;
			}
			case "Image":
				// TODO
				break;

			default:
				break;
		}
	});

	window.Asc.plugin.attachContextMenuClickEvent("onSummarize", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 1);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent("onKeyWords", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 2);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent("onMeaning", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 3);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent("onMeaningLink", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 4);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent("onFrenchTr", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 6);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent("onGermanTr", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 7);
		});
	});

	window.Asc.plugin.attachContextMenuClickEvent("onRandomImage", function() {
		let text = 'Get a random image as html tag.';
		let tokens = window.Asc.OpenAIEncode(text);
		createSettings(text, tokens, 5);
	});

	window.Asc.plugin.attachContextMenuClickEvent("OnGenerateImage", function() {
		window.Asc.plugin.executeMethod("GetSelectedText", null, function(text) {
			let tokens = window.Asc.OpenAIEncode(text);
			createSettings(text, tokens, 8);
		});
	});

	function createSettings(text, tokens, type) {
		let url;
		let settings = {
			model : model,
			max_tokens : maxLen - tokens.length
		};

		if (settings.max_tokens < 100) {
			console.error(new Error('This request is too big!'));
			return;
		}
		
		window.Asc.plugin.executeMethod('StartAction', ['Block', 'ChatGPT: ' + loadingPhrase]);

		switch (type) {
			case 1:
				settings.prompt	= `Summarize this text: "${text}"`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 2:
				settings.prompt = `Get Key words from this text: "${text}"`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 3:
				settings.prompt = `What does it mean "${text}" ?`;
				url = 'https://api.openai.com/v1/completions';
				break;
			
			case 4:
				settings.prompt = `Give a link to the explanation of the word "${text}"`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 5:
				settings.prompt = text;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 6:
				settings.prompt = `Translate in to Franch: "${text}"`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 7:
				settings.prompt = `Translate in to German: "${text}"`;
				url = 'https://api.openai.com/v1/completions';
				break;

			case 8:
				delete settings.model;
				delete settings.max_tokens;
				settings.prompt = `Generate image: "${text}"`;
				settings.n = 1;
				settings.size = "1024x1024";
				url = 'https://api.openai.com/v1/images/generations';
				break;
		}
		fetchData(settings, url, type);
	};

	function fetchData(settings, url, type) {
		fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + ApiKey,
				},
				body: JSON.stringify(settings),
			})
			.then(function(response) {
				return response.json()
			})
			.then(function(data) {
				if (data.error)
					throw data.error

				processResult(data, type);
			})
			.catch(function(error) {
				console.error(error);
				window.Asc.plugin.executeMethod('EndAction', ['Block', 'ChatGPT: ' + loadingPhrase]);
			});
	};

	function processResult(data, type) {
		let text, start, end;
		window.Asc.plugin.executeMethod('EndAction', ['Block', 'ChatGPT: ' + loadingPhrase]);
		switch (type) {
			case 1:
				Asc.scope.data = data.choices[0].text.split('\n\n');
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					let sumPar = Api.CreateParagraph();
					sumPar.AddText('Summarize selected text: ');
					oDocument.Push(sumPar);
					for(let ind = 0; ind < Asc.scope.data.length; ind++) {
						let text = Asc.scope.data[ind];
						if (text.length) {
							let oParagraph = Api.CreateParagraph();
							oParagraph.AddText(text);
							oDocument.Push(oParagraph);
						}
					}
				}, false);
				break;
			
			case 2:
				Asc.scope.data = data.choices[0].text.split('\n\n');
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					for(let ind = 0; ind < Asc.scope.data.length; ind++) {
						let text = Asc.scope.data[ind];
						if (text.length) {
							let oParagraph = Api.CreateParagraph();
							oParagraph.AddText(text);
							oDocument.Push(oParagraph);
						}
					}
				}, false);
				break;

			case 3:
				text = data.choices[0].text;
				Asc.scope.comment = text.startsWith('\n\n') ? text.substring(2) : text;
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					let oRange = oDocument.GetRangeBySelect();
					oRange.AddComment(Asc.scope.comment, 'OpenAI');
				}, false);
				break;

			case 4:
				Asc.scope.link = null;
				text = data.choices[0].text;
				start = text.indexOf('htt');
				end = text.indexOf(' ', start);
				if (end == -1) {
					end = text.length;
				}
				Asc.scope.link = text.slice(start, end);
				if (Asc.scope.link) {
					window.Asc.plugin.callCommand(function() {
						let oDocument = Api.GetDocument();
						let oRange = oDocument.GetRangeBySelect();
						oRange.AddHyperlink(Asc.scope.link, 'Meaning of the word');
					}, false);
				}
				break;

			case 5:
				Asc.scope.link = null;
				text = data.choices[0].text;
				start = text.indexOf('<img');
				end = text.indexOf('/>', start);
				if (end == -1) {
					end = text.length;
				}
				let link =  text.slice(start, end);
				if (link) {
					window.Asc.plugin.executeMethod('PasteHtml', [link])
				}
				break;

			case 6:
				text = data.choices[0].text.startsWith('\n\n') ? data.choices[0].text.substring(2) : data.choices[0].text;
				//window.Asc.plugin.executeMethod("PasteText", [text]);
				Asc.scope.comment = text;
				window.Asc.plugin.callCommand(function() {
					let oDocument = Api.GetDocument();
					let oRange = oDocument.GetRangeBySelect();
					oRange.AddComment(Asc.scope.comment, 'OpenAI');
				}, false);
				break;

			case 7:
				text = data.choices[0].text.startsWith('\n\n') ? data.choices[0].text.substring(2) : data.choices[0].text;
				window.Asc.plugin.executeMethod("PasteText", [text]);
				break;

			case 8:
				Asc.scope.url = null;
				let url = (data.data && data.data[0]) ? data.data[0].url : null;
				if (url) {
					Asc.scope.url = url;
					window.Asc.plugin.callCommand(function() {
						let oDocument = Api.GetDocument();
						let oParagraph = Api.CreateParagraph();
						let oDrawing = Api.CreateImage(Asc.scope.url, 102 * 36000, 102 * 36000);
						oParagraph.AddDrawing(oDrawing);
						oDocument.Push(oParagraph);
					}, false);
				}
				break;
		}
	};

	window.Asc.plugin.button = function() {
		this.executeCommand("close", "");
	};

	window.Asc.plugin.onTranslate = function() {
		loadingPhrase = window.Asc.plugin.tr(loadingPhrase);
	};

})(window, undefined);

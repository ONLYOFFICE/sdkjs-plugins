"use strict";

class Provider extends AI.Provider {

	constructor() {
		super("Google-Gemini", "https://generativelanguage.googleapis.com", "", "v1beta");
	}

	correctModelInfo(model) {
		model.id = model.name;
		let index = model.name.indexOf("models/");
		if (index === 0)
			model.name = model.name.substring(7);
	}

	checkExcludeModel(model) {
		if (model.id === "models/chat-bison-001" ||
			model.id === "models/text-bison-001")
			return true;
		
		if (-1 !== model.id.indexOf("gemini-1.0"))
			return true;

		return false;
	}

	checkModelCapability(model) {
		if (model.inputTokenLimit)
			model.options.max_input_tokens = model.inputTokenLimit;

		if (Array.isArray(model.supportedGenerationMethods) && 
			model.supportedGenerationMethods.includes("generateContent"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Chat_Completions);
			let caps = AI.CapabilitiesUI.Chat;
			if (-1 !== model.id.indexOf("vision"))
				caps |= AI.CapabilitiesUI.Vision;
			
			return AI.CapabilitiesUI.Chat | AI.CapabilitiesUI.Vision;
		}

		if (Array.isArray(model.supportedGenerationMethods) && 
			model.supportedGenerationMethods.includes("embedContent"))
		{
			model.endpoints.push(AI.Endpoints.Types.v1.Embeddings);
			return AI.CapabilitiesUI.Embeddings;
		}

		return AI.CapabilitiesUI.All;
	}

	getEndpointUrl(endpoint, model) {
		let Types = AI.Endpoints.Types;
		let url = "";
		switch (endpoint)
		{
		case Types.v1.Models:
			url = "/models";
			break;
		default:
			url = "/" + model.id + ":generateContent";
			break;
		}
		if (this.key)
			url += "?key=" + this.key;
		return url;
	}

	getRequestHeaderOptions() {
		let headers = {
			"Content-Type" : "application/json"
		};
		return headers;
	}

	getChatCompletions(message, model) {
		let body = { contents : [] };
		for (let i = 0, len = message.messages.length; i < len; i++) {
			let rec = {
				role : message.messages[i].role,
				parts : [ { text : message.messages[i].content } ]
			};
			if (rec.role === "assistant")
				rec.role = "model";
			body.contents.push(rec);
		}
		return body;
	}

}

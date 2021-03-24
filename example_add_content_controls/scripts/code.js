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

	//properties for content controls
	var _placeholderPlainRich = "{\r\n\
	\"commonPr\" :\r\n\
	{\r\n\
		\"Id\" : 1,\r\n\
		\"Tag\" : \"{Document1}\",\r\n\
		\"Lock\" : 1,\r\n\
		\"Appearance\" : 1,\r\n\
		\"Color\" : { \"R\" : 0, \"G\" : 255, \"B\" : 0 },\r\n\
		\"PlaceHolderText\":\"Place holder example\"\r\n\
	},\r\n\
	\"type\":1\r\n\
}";

	var _placeholderCheckBox = "{\r\n\
	\"checkBoxPr\":\r\n\
	{\r\n\
		\"Checked\":false,\r\n\
		\"CheckedSymbol\":9746,\r\n\
		\"UncheckedSymbol\":9744\r\n\
	},\r\n\
	\"commonPr\":\r\n\
	{\r\n\
		\"Id\":2,\r\n\
		\"Tag\":\"{Document2}\",\r\n\
		\"Lock\":3\r\n\
	}\r\n\
}";

	var _placeholderPicture = "{\"commonPr\" : \r\n\
{\r\n\
	\"Id\" : 3,\r\n\
	\"Tag\" : \"{Document3}\",\r\n\
	\"Lock\" : 3,\r\n\
	\"Appearance\" : 1,\r\n\
	\"Color\" : { \"R\" : 255, \"G\" : 0, \"B\" : 0 }\r\n\
}}";

	var _placeholderList = "{\r\n\
	\"commonPr\" :\r\n\
	{\r\n\
		\"Id\":4,\r\n\
		\"Tag\":\"{Document4}\",\r\n\
		\"Lock\":3,\r\n\
		\"PlaceHolderText\":\"Place holder example\"\r\n\
	},\r\n\
	\"List\" :\r\n\
	[{\r\n\
		\"Display\":\"Item1_D\",\r\n\
		\"Value\":\"Item1_V\"\r\n\
	},\r\n\
	{\r\n\
		\"Display\":\"Item2_D\",\r\n\
		\"Value\":\"Item2_V\"\r\n\
	}],\r\n\
	\"type\":1\r\n\
}";

	var _placeholderDataPicker = "{\r\n\
	\"commonPr\":\r\n\
	{\r\n\
		\"Id\":5,\r\n\
		\"Tag\":\"{Document5}\",\r\n\
		\"Lock\":3\r\n\
	},\r\n\
	\"datePickerPr\":\r\n\
	{\r\n\
		\"DateFormat\":\"DD MMMM YYYY\",\r\n\
		\"Date\":\"For example always current date\"\r\n\
	}\r\n\
}";

	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};

    window.Asc.plugin.init = function(text)
    {
		document.getElementById("textareaS").value = _placeholderPlainRich;
		document.getElementById("textareaCB").value = _placeholderCheckBox;
		document.getElementById("textareaP").value = _placeholderPicture;
		document.getElementById("textareaL").value = _placeholderList;
		document.getElementById("textareaDP").value = _placeholderDataPicker;

    	document.getElementById("buttonIDInsertS").onclick = function() {
    		var _val = document.getElementById("textareaS").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);

			window.Asc.plugin.executeMethod("AddContentControl", [_obj.type, _obj.commonPr]);
		};

		document.getElementById("buttonIDInsertCB").onclick = function() {
    		var _val = document.getElementById("textareaCB").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);

			window.Asc.plugin.executeMethod("AddContentControlCheckBox", [_obj.checkBoxPr, _obj.commonPr]);
		};

		document.getElementById("buttonIDInsertP").onclick = function() {
    		var _val = document.getElementById("textareaP").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);

			window.Asc.plugin.executeMethod("AddContentControlPicture", [_obj.commonPr]);
		};

		document.getElementById("buttonIDInsertL").onclick = function() {
    		var _val = document.getElementById("textareaL").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);

			window.Asc.plugin.executeMethod("AddContentControlList", [_obj.type, _obj.List, _obj.commonPr]);
		};

		document.getElementById("buttonIDInsertDP").onclick = function() {
    		var _val = document.getElementById("textareaDP").value;
			_val = _val.replaceAll("\r\n", "");
			_val = _val.replaceAll("\n", "");
			var _obj = JSON.parse(_val);

			_obj.datePickerPr.Date = new window.Date();
			window.Asc.plugin.executeMethod("AddContentControlDatePicker", [_obj.datePickerPr, _obj.commonPr]);
		};
	}

    window.Asc.plugin.button = function(id)
    {
		this.executeCommand("close", "");
    }; 

})(window, undefined);

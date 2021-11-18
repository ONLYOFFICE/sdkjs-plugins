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

	function _generatePassword()
	{
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	function _getPasswordByFile(hash)
	{
		try
		{
			return localStorage.getItem(hash);
		}
		catch (err)
		{
			return "";
		}
	}

	function _setPasswordByFile(hash, pass)
	{
		try
		{
			return localStorage.setItem(hash, pass);
		}
		catch (err)
		{
			return "";
		}
	}

	window.Asc.plugin.init = function(obj)
    {
    	if (!obj)
    		return;

    	switch (obj.type)
		{
			case "generatePassword":
			{
				var _pass = _generatePassword();
				this.executeMethod("OnlyPass", [{ type : "generatePassword", password : _pass }]);
				break;
			}
			case "getPasswordByFile":
			{
				var _pass = _getPasswordByFile(obj.hash);
				this.executeMethod("OnlyPass", [{ type : "getPasswordByFile", password : _pass }]);
				break;
			}
			case "setPasswordByFile":
			{
				_setPasswordByFile(obj.hash, obj.password);
				break;
			}
			default:
				break;
		}
    };

	window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };

	window.Asc.plugin.onMethodReturn = function(returnValue)
	{
		// not used (method return undefined)
	};

})(window, undefined);

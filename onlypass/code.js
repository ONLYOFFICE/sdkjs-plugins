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

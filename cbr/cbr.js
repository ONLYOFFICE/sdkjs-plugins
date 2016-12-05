(function (window, undefined) {
	var apiCurrency = 'https://api.fixer.io/';

	function formatDate(date) {
		var month = '' + (date.getMonth() + 1);
		var day = '' + date.getDate();
		var year = date.getFullYear();

		if (month.length < 2) {
			month = '0' + month;
		}
		if (day.length < 2) {
			day = '0' + day;
		}

		return [year, month, day].join('-');
	}

	function loadCurrency(date, base, callback) {
		base = base ? base : 'RUB';
		date = date ? formatDate(date) : 'latest';
		var httpRequest;
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...
			httpRequest = new XMLHttpRequest();
		} else if (window.ActiveXObject) { // IE
			try {
				httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
				}
			}
		}

		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === 4) {
				callback(httpRequest.status === 200 ? httpRequest.responseText : null);
			}
		};
		httpRequest.open('GET', apiCurrency + date + '?base=' + base, true);
		httpRequest.send();
	}

	window.Asc.plugin.init = function () {
		this.button(-1);
	};

	window.Asc.plugin.button = function (id) {
		var t = this;
		loadCurrency($('#DP').datepicker('getDate'), null, function (value) {
			var command = '';
			if (value) {
				try {
					var rates = JSON.parse(value).rates;
					var keys = Object.keys(rates);
					command += 'var oSheet = Api.GetActiveSheet();';
					command += 'var active = oSheet.GetActiveCell();';
					command += 'var row = active.GetRow();';
					command += 'var col = active.GetCol();';
					for (var i = 0; i < keys.length; ++i) {
						command += 'oSheet.GetRangeByNumber(row, col).SetValue("' + keys[i] + '");';
						command += 'oSheet.GetRangeByNumber(row, col + 1).SetValue("' + rates[keys[i]] + '");';
						command += '++row;';
					}

					window.Asc.plugin.info.recalculate = true;
				} catch (e) {
				}
			}
			t.executeCommand('close', command);
		});
	};
})(window, undefined);

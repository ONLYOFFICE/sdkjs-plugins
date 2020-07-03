(function (window, undefined) {
	var number = '';

	function sum_propis(num, w) {
// Все варианты написания разрядов прописью скомпануем в один небольшой массив
		var m = [['ноль'], ['-', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
			['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать',
				'восемнадцать', 'девятнадцать'],
			['-', '-', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
			['-', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
			['-', 'одна', 'две']]

// Все варианты написания разрядов прописью скомпануем в один небольшой массив
		var r = [['...ллион', 'ов', '', 'а'], // используется для всех неизвестно больших разрядов
			['тысяч', '', 'а', 'и'], ['миллион', 'ов', '', 'а'], ['миллиард', 'ов', '', 'а'], ['триллион', 'ов', '', 'а'],
			['квадриллион', 'ов', '', 'а'], ['квинтиллион', 'ов', '', 'а'], ['секстилион', 'ов', '', 'а'],
			['септилион', 'ов', '', 'а'], ['окталион', 'ов', '', 'а'], ['ноналион', 'ов', '', 'а'],
			['декалион', 'ов', '', 'а'], ['эндекалион', 'ов', '', 'а'], ['додекалион', 'ов', '', 'а']
			// ,[... список можно продолжить
		]

		if (num == 0) {
			return m[0][0]
		} // Если число ноль, сразу сообщить об этом и выйти
		var o = [] // Сюда записываем все получаемые результаты преобразования

		// Разложим исходное число на несколько трехзначных чисел и каждое полученное такое число обработаем отдельно
		num = ['', '00', '0'][num.split(/\d{3}/).join('').length] + num
		var numlength = num.length
		var k = 0, n = -1

// Алгоритм, преобразующий трехзначное число в строку прописью
		while (k * 3 < numlength) {
			pp = num.substr(-3 * (k + 1), 3)
			if (pp != '000') {
				o[++n] = [];
			} else {
				k++;
				continue
			}
			for (var i = 0; i <= 2; i++) {
				if (pp[i] == 0) {
					continue;
				} else {
					switch (i) {
						case 0:
							o[n][o[n].length] = m[4][pp[i]];
							break
						case 1:
							if (pp[i] == 1) {
								o[n][o[n].length] = m[2][pp[2]];
								i = 3;
								continue
							} else {
								o[n][o[n].length] = m[3][pp[i]]
							}
							break
						case 2:
							if ((k == 1 && pp[i] <= 2) || (pp[i] <= 2 && w)) {
								o[n][o[n].length] = m[5][pp[i]]
							} else {
								o[n][o[n].length] = m[1][pp[i]]
							}
							break
					}
				}
			}

// Окончание для числительных
			if (pp > 0 && k > 0) {
				o[n][o[n].length] = ci(pp, r[k])
			}
			o[n] = o[n].join(' ');
			k++
		}
		return o.reverse().join(" ")
	}

// Окончание для числительных
	function ci(n, c) {
		n = n.toString().substr(-2)
		return c[0] + ((/^[0,2-9]?[1]$/.test(n)) ? c[2] : ((/^[0,2-9]?[2-4]$/.test(n)) ? c[3] : c[1]))
	}

	window.Asc.plugin.init = function (text) {
		number = text;
		this.button(-1);
	};

	window.Asc.plugin.button = function (id) {
		var command = '';
		command += 'var oSheet = Api.GetActiveSheet();';
		command += 'var active = oSheet.GetActiveCell();';
		command += 'var row = active.GetRow();';
		command += 'var col = active.GetCol();';
		command += 'oSheet.GetRangeByNumber(row + 1, col).SetValue("' + sum_propis(number) + '");';

		window.Asc.plugin.info.recalculate = true;
		this.executeCommand('close', command);
	};
})(window, undefined);

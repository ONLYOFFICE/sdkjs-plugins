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
(function (window, undefined) {
	var number = '';

	function sum_propis(num, w) {
// All variants of writing digits in words will be compiled into one small array
		var m = [['ноль'], ['-', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
			['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать',
				'восемнадцать', 'девятнадцать'],
			['-', '-', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
			['-', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
			['-', 'одна', 'две']]

// All variants of writing digits in words will be compiled into one small array
		var r = [['...ллион', 'ов', '', 'а'], // used for all unknown large digits
			['тысяч', '', 'а', 'и'], ['миллион', 'ов', '', 'а'], ['миллиард', 'ов', '', 'а'], ['триллион', 'ов', '', 'а'],
			['квадриллион', 'ов', '', 'а'], ['квинтиллион', 'ов', '', 'а'], ['секстилион', 'ов', '', 'а'],
			['септилион', 'ов', '', 'а'], ['окталион', 'ов', '', 'а'], ['ноналион', 'ов', '', 'а'],
			['декалион', 'ов', '', 'а'], ['эндекалион', 'ов', '', 'а'], ['додекалион', 'ов', '', 'а']
			// ,[... the list goes on
		]

		if (num == 0) {
			return m[0][0]
		} // If the number is zero, report it immediately and exit
		var o = [] // Here we write all the results of the conversion

		// Decompose the initial number of several three-digit numbers, and each number received is processed separately
		num = ['', '00', '0'][num.split(/\d{3}/).join('').length] + num
		var numlength = num.length
		var k = 0, n = -1

// Algorithm that converts a three-digit number to a string in words
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

// Endings for numerals
			if (pp > 0 && k > 0) {
				o[n][o[n].length] = ci(pp, r[k])
			}
			o[n] = o[n].join(' ');
			k++
		}
		return o.reverse().join(" ")
	}

// Endings for numerals
	function ci(n, c) {
		n = n.toString().substr(-2)
		return c[0] + ((/^[0,2-9]?[1]$/.test(n)) ? c[2] : ((/^[0,2-9]?[2-4]$/.test(n)) ? c[3] : c[1]))
	}

	window.Asc.plugin.init = function (text) {
		number = text;
		this.button(-1);
	};

	window.Asc.plugin.button = function (id) {
		// serialize command as text
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

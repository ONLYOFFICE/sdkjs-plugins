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
		var m = [['zero'], ['-', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
			['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fiveteen', 'sixteen', 'seventeen',
				'eighteen', 'nineteen'],
			['-', '-', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
			['-', 'one hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'],
			['-', 'one', 'two']]


		// information from https://simple.wikipedia.org/wiki/Names_of_large_numbers
		// All variants of writing digits in words will be compiled into one small array
		var r = 
		[	'infinity', // used for all unknown large digits
			'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextilion', 'septilion', 'octalion', 'nonillion',
			'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion', 'quindecillion', 'sexdecillion', 'septendecillion',
			'octodecillion', 'novemdecillion', 'vigintillion', 'unvigintillion', 'duovigintillion', 'trevigintillion', 'quattuorvigintillion',
			'quinvigintillion', 'sexvigintillion', 'septenvigintillion', 'octovigintillion', 'novemvigintillion', 'trigintillion', 'untrigintillion',
			'duotrigintillion', 'googol', 'tretrigintillion', 'quarttourtrigintillion', 'quintrigintillion', 'sextrigintillion', 'septemtrigintillion',
			'octotrigintillion', 'novemtrigintillion', 'quardragintillion', 'quinquagintillion', 'centillion', 'millionillion', 'micrillion', 'nanillion',
			'picillion', 'mecillion', 'googolplex', 'hectillion', 'killionillion', 'scewe\'s number', 'googolplexian', 'hotillion'
		];
		// ,[... the list goes on

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
					if (i ==2) {
						o[n][o[n].length-1] = o[n][o[n].length-1].replace('-','')
					}
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
								o[n][o[n].length] = m[3][pp[i]] + m[3][0]
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
				var tmp = ci(pp, r[k]);
				if (tmp !== -1)
					o[n][o[n].length] = ci(pp, r[k])
				else
					return[r[0]];
			}
			o[n] = o[n].join(' ');
			k++
		}
		return o.reverse().join(" ")
	}

	// Endings for numerals
	function ci(n, c) {
		n = n.toString().substr(-2)
		return c === undefined ? -1 : c + ((/^[0,2-9]?[1]$/.test(n) ? '' : 's'));
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

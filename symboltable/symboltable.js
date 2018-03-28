(function(window, undefined){

    window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
    
	var _userAgent = navigator.userAgent.toLowerCase();
	var _userAgentIE =  ((_userAgent.indexOf("msie") > -1 || _userAgent.indexOf("trident") > -1) && (_userAgent.indexOf("edge") < 0));

        var oRangeNames = {};
       oRangeNames[1] =  'Basic Latin';                                    
       oRangeNames[2] =  'Latin 1 Supplement';                             
       oRangeNames[3] =  'Latin Extended A';                               
       oRangeNames[4] =  'Latin Extended B';                               
       oRangeNames[5] =  'IPA Extensions';                                 
       oRangeNames[6] =  'Spacing Modifier Letters';                       
       oRangeNames[7] =  'Combining Diacritical Marks';                    
       oRangeNames[8] =  'Greek and Coptic';                               
       oRangeNames[9] =  'Cyrillic';                                       
       oRangeNames[10] =  'Cyrillic Supplement';                            
       oRangeNames[11] =  'Armenian';                                       
       oRangeNames[12] =  'Hebrew';                                         
       oRangeNames[13] =  'Arabic';                                         
       oRangeNames[14] =  'Syriac';                                         
       oRangeNames[15] =  'Arabic Supplement';                              
       oRangeNames[16] =  'Thaana';                                         
       oRangeNames[17] =  'NKo';                                            
       oRangeNames[18] =  'Samaritan';                                      
       oRangeNames[19] =  'Mandaic';                                        
       oRangeNames[20] =  'Arabic Extended A';                              
       oRangeNames[21] =  'Devanagari';                                     
       oRangeNames[22] =  'Bengali';                                        
       oRangeNames[23] =  'Gurmukhi';                                       
       oRangeNames[24] =  'Gujarati';                                       
       oRangeNames[25] =  'Oriya';                                          
       oRangeNames[26] =  'Tamil';                                          
       oRangeNames[27] =  'Telugu';                                         
       oRangeNames[28] =  'Kannada';                                        
       oRangeNames[29] =  'Malayalam';                                      
       oRangeNames[30] =  'Sinhala';                                        
       oRangeNames[31] =  'Thai';                                           
       oRangeNames[32] =  'Lao';                                            
       oRangeNames[33] =  'Tibetan';                                        
       oRangeNames[34] =  'Myanmar';                                        
       oRangeNames[35] =  'Georgian';                                       
       oRangeNames[36] =  'Hangul Jamo';                                    
       oRangeNames[37] =  'Ethiopic';                                       
       oRangeNames[38] =  'Ethiopic Supplement';                            
       oRangeNames[39] =  'Cherokee';                                       
       oRangeNames[40] =  'Unified Canadian Aboriginal Syllabics';          
       oRangeNames[41] =  'Ogham';                                          
       oRangeNames[42] =  'Runic';                                          
       oRangeNames[43] =  'Tagalog';                                        
       oRangeNames[44] =  'Hanunoo';                                        
       oRangeNames[45] =  'Buhid';                                          
       oRangeNames[46] =  'Tagbanwa';                                       
       oRangeNames[47] =  'Khmer';                                          
       oRangeNames[48] =  'Mongolian';                                      
       oRangeNames[49] =  'Unified Canadian Aboriginal Syllabics Extended'; 
       oRangeNames[50] =  'Limbu';                                          
       oRangeNames[51] =  'Tai Le';                                         
       oRangeNames[52] =  'New Tai Lue';                                    
       oRangeNames[53] =  'Khmer Symbols';                                  
       oRangeNames[54] =  'Buginese';                                       
       oRangeNames[55] =  'Tai Tham';                                       
       oRangeNames[56] =  'Combining Diacritical Marks Extended';           
       oRangeNames[57] =  'Balinese';                                       
       oRangeNames[58] =  'Sundanese';                                      
       oRangeNames[59] =  'Batak';                                          
       oRangeNames[60] =  'Lepcha';                                         
       oRangeNames[61] =  'Ol Chiki';                                       
       oRangeNames[62] =  'Cyrillic Extended C';                            
       oRangeNames[63] =  'Sundanese Supplement';                           
       oRangeNames[64] =  'Vedic Extensions';                               
       oRangeNames[65] =  'Phonetic Extensions';                            
       oRangeNames[66] =  'Phonetic Extensions Supplement';                 
       oRangeNames[67] =  'Combining Diacritical Marks Supplement';         
       oRangeNames[68] =  'Latin Extended Additional';                      
       oRangeNames[69] =  'Greek Extended';                                 
       oRangeNames[70] =  'General Punctuation';                            
       oRangeNames[71] =  'Superscripts and Subscripts';                    
       oRangeNames[72] =  'Currency Symbols';                               
       oRangeNames[73] =  'Combining Diacritical Marks for Symbols';        
       oRangeNames[74] =  'Letterlike Symbols';                             
       oRangeNames[75] =  'Number Forms';                                   
       oRangeNames[76] =  'Arrows';                                         
       oRangeNames[77] =  'Mathematical Operators';                         
       oRangeNames[78] =  'Miscellaneous Technical';                        
       oRangeNames[79] =  'Control Pictures';                               
       oRangeNames[80] =  'Optical Character Recognition';                  
       oRangeNames[81] =  'Enclosed Alphanumerics';                         
       oRangeNames[82] =  'Box Drawing';                                    
       oRangeNames[83] =  'Block Elements';                                 
       oRangeNames[84] =  'Geometric Shapes';                               
       oRangeNames[85] =  'Miscellaneous Symbols';                          
       oRangeNames[86] =  'Dingbats';                                       
       oRangeNames[87] =  'Miscellaneous Mathematical Symbols A';           
       oRangeNames[88] =  'Supplemental Arrows A';                          
       oRangeNames[89] =  'Braille Patterns';                               
       oRangeNames[90] =  'Supplemental Arrows B';                          
       oRangeNames[91] =  'Miscellaneous Mathematical Symbols B';           
       oRangeNames[92] =  'Supplemental Mathematical Operators';            
       oRangeNames[93] =  'Miscellaneous Symbols and Arrows';               
       oRangeNames[94] =  'Glagolitic';                                     
       oRangeNames[95] =  'Latin Extended C';                               
       oRangeNames[96] =  'Coptic';                                         
       oRangeNames[97] =  'Georgian Supplement';                            
       oRangeNames[98] =  'Tifinagh';                                       
       oRangeNames[99] =  'Ethiopic Extended';                              
       oRangeNames[100] =  'Cyrillic Extended A';                            
       oRangeNames[101] =  'Supplemental Punctuation';                       
       oRangeNames[102] =  'CJK Radicals Supplement';                        
       oRangeNames[103] =  'Kangxi Radicals';                                
       oRangeNames[104] =  'Ideographic Description Characters';             
       oRangeNames[105] =  'CJK Symbols and Punctuation';                    
       oRangeNames[106] =  'Hiragana';                                       
       oRangeNames[107] =  'Katakana';                                       
       oRangeNames[108] =  'Bopomofo';                                       
       oRangeNames[109] =  'Hangul Compatibility Jamo';                      
       oRangeNames[110] =  'Kanbun';                                         
       oRangeNames[111] =  'Bopomofo Extended';                              
       oRangeNames[112] =  'CJK Strokes';                                    
       oRangeNames[113] =  'Katakana Phonetic Extensions';                   
       oRangeNames[114] =  'Enclosed CJK Letters and Months';                
       oRangeNames[115] =  'CJK Compatibility';                              
       oRangeNames[116] =  'CJK Unified Ideographs Extension';               
       oRangeNames[117] =  'Yijing Hexagram Symbols';                        
       oRangeNames[118] =  'CJK Unified Ideographs';                         
       oRangeNames[119] =  'Yi Syllables';                                   
       oRangeNames[120] =  'Yi Radicals';                                    
       oRangeNames[121] =  'Lisu';                                           
       oRangeNames[122] =  'Vai';                                            
       oRangeNames[123] =  'Cyrillic Extended B';                            
       oRangeNames[124] =  'Bamum';                                          
       oRangeNames[125] =  'Modifier Tone Letters';                          
       oRangeNames[126] =  'Latin Extended D';                               
       oRangeNames[127] =  'Syloti Nagri';                                   
       oRangeNames[128] =  'Common Indic Number Forms';                      
       oRangeNames[129] =  'Phags pa';                                       
       oRangeNames[130] =  'Saurashtra';                                     
       oRangeNames[131] =  'Devanagari Extended';                            
       oRangeNames[132] =  'Kayah Li';                                       
       oRangeNames[133] =  'Rejang';                                         
       oRangeNames[134] =  'Hangul Jamo Extended A';                         
       oRangeNames[135] =  'Javanese';                                       
       oRangeNames[136] =  'Myanmar Extended B';                             
       oRangeNames[137] =  'Cham';                                           
       oRangeNames[138] =  'Myanmar Extended A';                             
       oRangeNames[139] =  'Tai Viet';                                       
       oRangeNames[140] =  'Meetei Mayek Extensions';                        
       oRangeNames[141] =  'Ethiopic Extended A';                            
       oRangeNames[142] =  'Latin Extended E';                               
       oRangeNames[143] =  'Cherokee Supplement';                            
       oRangeNames[144] =  'Meetei Mayek';                                   
       oRangeNames[145] =  'Hangul Syllables';                               
       oRangeNames[146] =  'Hangul Jamo Extended B';                         
       oRangeNames[147] =  'High Surrogates';                                
       oRangeNames[148] =  'High Private Use Surrogates';                    
       oRangeNames[149] =  'Low Surrogates';                                 
       oRangeNames[150] =  'Private Use Area';                               
       oRangeNames[151] =  'CJK Compatibility Ideographs';                   
       oRangeNames[152] =  'Alphabetic Presentation Forms';                  
       oRangeNames[153] =  'Arabic Presentation Forms A';                    
       oRangeNames[154] =  'Variation Selectors';                            
       oRangeNames[155] =  'Vertical Forms';                                 
       oRangeNames[156] =  'Combining Half Marks';                           
       oRangeNames[157] =  'CJK Compatibility Forms';                        
       oRangeNames[158] =  'Small Form Variants';                            
       oRangeNames[159] =  'Arabic Presentation Forms B';                    
       oRangeNames[160] =  'Halfwidth and Fullwidth Forms';                  
       oRangeNames[161] =  'Specials';                                       
       oRangeNames[162] =  'Linear B Syllabary';                             
       oRangeNames[163] =  'Linear B Ideograms';                             
       oRangeNames[164] =  'Aegean Numbers';                                 
       oRangeNames[165] =  'Ancient Greek Numbers';                          
       oRangeNames[166] =  'Ancient Symbols';                                
       oRangeNames[167] =  'Phaistos Disc';                                  
       oRangeNames[168] =  'Lycian';                                         
       oRangeNames[169] =  'Carian';                                         
       oRangeNames[170] =  'Coptic Epact Numbers';                           
       oRangeNames[171] =  'Old Italic';                                     
       oRangeNames[172] =  'Gothic';                                         
       oRangeNames[173] =  'Old Permic';                                     
       oRangeNames[174] =  'Ugaritic';                                       
       oRangeNames[175] =  'Old Persian';                                    
       oRangeNames[176] =  'Deseret';                                        
       oRangeNames[177] =  'Shavian';                                        
       oRangeNames[178] =  'Osmanya';                                        
       oRangeNames[179] =  'Osage';                                          
       oRangeNames[180] =  'Elbasan';                                        
       oRangeNames[181] =  'Caucasian Albanian';                             
       oRangeNames[182] =  'Linear A';                                       
       oRangeNames[183] =  'Cypriot Syllabary';                              
       oRangeNames[184] =  'Imperial Aramaic';                               
       oRangeNames[185] =  'Palmyrene';                                      
       oRangeNames[186] =  'Nabataean';                                      
       oRangeNames[187] =  'Hatran';                                         
       oRangeNames[188] =  'Phoenician';                                     
       oRangeNames[189] =  'Lydian';                                         
       oRangeNames[190] =  'Meroitic Hieroglyphs';                           
       oRangeNames[191] =  'Meroitic Cursive';                               
       oRangeNames[192] =  'Kharoshthi';                                     
       oRangeNames[193] =  'Old South Arabian';                              
       oRangeNames[194] =  'Old North Arabian';                              
       oRangeNames[195] =  'Manichaean';                                     
       oRangeNames[196] =  'Avestan';                                        
       oRangeNames[197] =  'Inscriptional Parthian';                         
       oRangeNames[198] =  'Inscriptional Pahlavi';                          
       oRangeNames[199] =  'Psalter Pahlavi';                                
       oRangeNames[200] =  'Old Turkic';                                     
       oRangeNames[201] =  'Old Hungarian';                                  
       oRangeNames[202] =  'Rumi Numeral Symbols';                           
       oRangeNames[203] =  'Brahmi';                                         
       oRangeNames[204] =  'Kaithi';                                         
       oRangeNames[205] =  'Sora Sompeng';                                   
       oRangeNames[206] =  'Chakma';                                         
       oRangeNames[207] =  'Mahajani';                                       
       oRangeNames[208] =  'Sharada';                                        
       oRangeNames[209] =  'Sinhala Archaic Numbers';                        
       oRangeNames[210] =  'Khojki';                                         
       oRangeNames[211] =  'Multani';                                        
       oRangeNames[212] =  'Khudawadi';                                      
       oRangeNames[213] =  'Grantha';                                        
       oRangeNames[214] =  'Newa';                                           
       oRangeNames[215] =  'Tirhuta';                                        
       oRangeNames[216] =  'Siddham';                                        
       oRangeNames[217] =  'Modi';                                           
       oRangeNames[218] =  'Mongolian Supplement';                           
       oRangeNames[219] =  'Takri';                                          
       oRangeNames[220] =  'Ahom';                                           
       oRangeNames[221] =  'Warang Citi';                                    
       oRangeNames[222] =  'Pau Cin Hau';                                    
       oRangeNames[223] =  'Bhaiksuki';                                      
       oRangeNames[224] =  'Marchen';                                        
       oRangeNames[225] =  'Cuneiform';                                      
       oRangeNames[226] =  'Cuneiform Numbers and Punctuation';              
       oRangeNames[227] =  'Early Dynastic Cuneiform';                       
       oRangeNames[228] =  'Egyptian Hieroglyphs';                           
       oRangeNames[229] =  'Anatolian Hieroglyphs';                          
       oRangeNames[230] =  'Bamum Supplement';                               
       oRangeNames[231] =  'Mro';                                            
       oRangeNames[232] =  'Bassa Vah';                                      
       oRangeNames[233] =  'Pahawh Hmong';                                   
       oRangeNames[234] =  'Miao';                                           
       oRangeNames[235] =  'Ideographic Symbols and Punctuation';            
       oRangeNames[236] =  'Tangut';                                         
       oRangeNames[237] =  'Tangut Components';                              
       oRangeNames[238] =  'Kana Supplement';                                
       oRangeNames[239] =  'Duployan';                                       
       oRangeNames[240] =  'Shorthand Format Controls';                      
       oRangeNames[241] =  'Byzantine Musical Symbols';                      
       oRangeNames[242] =  'Musical Symbols';                                
       oRangeNames[243] =  'Ancient Greek Musical Notation';                 
       oRangeNames[244] =  'Tai Xuan Jing Symbols';                          
       oRangeNames[245] =  'Counting Rod Numerals';                          
       oRangeNames[246] =  'Mathematical Alphanumeric Symbols';              
       oRangeNames[247] =  'Sutton SignWriting';                             
       oRangeNames[248] =  'Glagolitic Supplement';                          
       oRangeNames[249] =  'Mende Kikakui';                                  
       oRangeNames[250] =  'Adlam';                                          
       oRangeNames[251] =  'Arabic Mathematical Alphabetic Symbols';         
       oRangeNames[252] =  'Mahjong Tiles';                                  
       oRangeNames[253] =  'Domino Tiles';                                   
       oRangeNames[254] =  'Playing Cards';                                  
       oRangeNames[255] =  'Enclosed Alphanumeric Supplement';               
       oRangeNames[256] =  'Enclosed Ideographic Supplement';                
       oRangeNames[257] =  'Miscellaneous Symbols and Pictographs';          
       oRangeNames[258] =  'Emoticons';                                      
       oRangeNames[259] =  'Ornamental Dingbats';                            
       oRangeNames[260] =  'Transport and Map Symbols';                      
       oRangeNames[261] =  'Alchemical Symbols';                             
       oRangeNames[262] =  'Geometric Shapes Extended';                      
       oRangeNames[263] =  'Supplemental Arrows C';                          
       oRangeNames[264] =  'Supplemental Symbols and Pictographs';           
       oRangeNames[265] =  'CJK Unified Ideographs Extension B';             
       oRangeNames[266] =  'CJK Unified Ideographs Extension C';             
       oRangeNames[267] =  'CJK Unified Ideographs Extension D';             
       oRangeNames[268] =  'CJK Unified Ideographs Extension E';             
       oRangeNames[269] =  'CJK Compatibility Ideographs Supplement';        
       oRangeNames[270] =  'Tags';                                           
       oRangeNames[271] =  'Variation Selectors Supplement';                 
       oRangeNames[272] =  'Supplementary Private Use Area A';               
       oRangeNames[273] =  'Supplementary Private Use Area B';               
    
    

    var CELL_WIDTH = 31;
    var CELL_HEIGHT = 33;



    var aFontSelects = [];
    var aRanges = [];
    var aRecents = [];
    var nCurrentFont = -1;// индекс в aFontSelects
    var nCurrentSymbol = -1;// code
    var bMainFocus = true;//фокус в основной таблице
	var nFontNameRecent = -1;

    var nMaxRecent = 36;
	var bScrollMouseUp = false;
	
	var sInitFont = "";
	var sInitSymbol = "";


    function encodeSurrogateChar(nUnicode)
    {
        if (nUnicode < 0x10000)
        {
            return String.fromCharCode(nUnicode);
        }
        else
        {
            nUnicode = nUnicode - 0x10000;
            var nLeadingChar = 0xD800 | (nUnicode >> 10);
            var nTrailingChar = 0xDC00 | (nUnicode & 0x3FF);
            return String.fromCharCode(nLeadingChar) + String.fromCharCode(nTrailingChar);
        }
    }
	
	
	function fixedCharCodeAt(str, idx) {
	  idx = idx || 0;
	  var code = str.charCodeAt(idx);
	  var hi, low;
	  if (0xD800 <= code && code <= 0xDBFF) {
		hi = code;
		low = str.charCodeAt(idx + 1);
		if (isNaN(low)) {
		  throw 'Старшая часть суррогатной пары без следующей младшей в fixedCharCodeAt()';
		}
		return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
	  }
	  if (0xDC00 <= code && code <= 0xDFFF) {
		return false;
	  }
	  return code;
	}

    function getArrRangesByFont(nFontName){
        var _ret = getSupportedRangesByFont(aFontSelects[nFontName]);
        if(_ret.length === 0){
            _ret.push({Start:0x20, End: 0xFF});
        }
        if(_ret[0].Start < 0x20){
            _ret[0].Start = 0x20;
        }
        return _ret;
    }

    function getRangeBySymbol(arrRanges, nCode){
        for(var i = 0; i < arrRanges.length; ++i){
            if(arrRanges[i].Start <= nCode && arrRanges[i].End >= nCode){
                return arrRanges[i];
            }
        }
        return null;
    }

    function getRangeByName(arrRanges, nName){
        for(var i = 0; i < arrRanges.length; ++i){
            if(arrRanges[i].Name === nName){
                return arrRanges[i];
            }
        }
        return null;
    }

    function getLinearIndexByCode(arrRanges, nCode){
        var nLinearIndex = -1;
        var nCounter = 0;
        var oCurRange;
        for(var i = 0; i < arrRanges.length; ++i){
            oCurRange = arrRanges[i];
            if(oCurRange.Start > nCode){
                return -1;
            }
            if(oCurRange.Start <= nCode && oCurRange.End >= nCode){
                return nCounter + (nCode - oCurRange.Start);
            }
            nCounter += (oCurRange.End - oCurRange.Start + 1);
        }
        return nLinearIndex;
    }

    function getCodeByLinearIndex(arrRanges, nIndex){
        if(nIndex < 0){
            return -1;
        }
        var nCount = 0;
        var oCurRange = arrRanges[0];
        var nDiff;
        for(var i = 0; i < arrRanges.length; ++i){
            oCurRange = arrRanges[i];
            nDiff = oCurRange.End - oCurRange.Start + 1;
            if(nCount + nDiff > nIndex){
                return oCurRange.Start + nIndex - nCount;
            }
            nCount += nDiff;
        }
        return -1;
    }

    function createTable(arrSym, nRowsCount, nColsCount, oDiv){

        var nDivCount = nRowsCount*nColsCount;
        var nCellsCounter = 0;
        var sInnerHtml = '';
        var sId;
		var sStyle = 'style=\'border-bottom: none\'';
		var sCellStyle;
        for(var i = 0; i < nDivCount; ++i){
			
			
			if(((i / nColsCount) >> 0) === (nRowsCount - 1)){
				sCellStyle = sStyle;
			}
			else{
				sCellStyle = '';
			}
            if(i < arrSym.length){
                sId = 'c' + arrSym[i];
                sInnerHtml += '<div class=\"cell\" '+sCellStyle +' id=\"' + sId + '\">' + '&#' + arrSym[i].toString(10) + '</div>';
            }
            else{
                sInnerHtml += '<div class=\"cell\"'+sCellStyle +'></div>';
            }
            ++nCellsCounter;
            if(nCellsCounter >= nColsCount){
                sInnerHtml +=  '<br class=\"noselect\">';
                nCellsCounter = 0;
            }
        }
        oDiv.innerHTML = sInnerHtml;
    }

    function fillRecentSymbols(){
        var sRecents = window.localStorage.getItem('recentSymbols');
        var aRecentCookies;
        if(sRecents != ''){
            aRecentCookies = JSON.parse(sRecents);
        }
        if(Array.isArray(aRecentCookies)){
            aRecents = aRecentCookies;
        }
    }

    function saveRecent(){
        var sJSON = JSON.stringify(aRecents);
        window.localStorage.setItem('recentSymbols', sJSON);
    }


    function checkRecent(sSymbol, sFont){
        if(aRecents.length === 0){
            aRecents.push({symbol: sSymbol, font: sFont});
            return;
        }
        for(var i = 0; i < aRecents.length; ++i){
            if(aRecents[i].symbol === sSymbol && aRecents[i].font === sFont){
                aRecents.splice(i, 1);
                break;
            }
        }
        aRecents.splice(0, 0, {symbol: sSymbol, font: sFont});
        if(aRecents.length > nMaxRecent){
            aRecents.splice(nMaxRecent, aRecents.length - nMaxRecent);
        }
        saveRecent();
    }


    function createScript(sFont, sText){
        var sScript = '';
        switch (window.Asc.plugin.info.editorType) {
            case 'word':{
                sScript += 'var oDocument = Api.GetDocument();';
                sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oTextPr;';

                sScript += '\noParagraph = Api.CreateParagraph();';
                sScript += '\narrInsertResult.push(oParagraph);';

                sScript += '\noRun = oParagraph.AddText(\'' + sText+ '\');';
                sScript += '\noTextPr = oRun.GetTextPr();';
                sScript += '\noTextPr.SetFontFamily(\'' + sFont + '\');';
                sScript += '\noDocument.InsertContent(arrInsertResult);';
                break;
            }
            case 'cell':{
                sScript += 'var oSheet = Api.GetActiveSheet();';
                sScript += 'var active = oSheet.GetActiveCell();';
                sScript += 'var row = active.GetRow();';
                sScript += 'var col = active.GetCol();';
                sScript += 'oSheet.GetRangeByNumber(row, col).SetFontName("' + sFont + '");';
                sScript += 'oSheet.GetRangeByNumber(row, col).SetValue("' + sText + '");';
                break;
            }
        }

        return sScript;
    }

    function createCell(nSymbolCode, sFontName){
        var sId;
		if(sFontName){
			var nFontIndex = 0;
			aFontSelects[nCurrentFont].m_wsFontName
			for(var i = 0; i < aFontSelects.length; ++i){
				if(aFontSelects[i].m_wsFontName === sFontName){
					nFontIndex = i;
					break;
				}
			}
			sId = 'r_' + nSymbolCode + '_' + nFontIndex;
		}
		else{
			sId = 'r' + nSymbolCode;
		}
        var _ret = $('<div id=\"' + sId + '\">&#' + nSymbolCode.toString() + '</div>');
        _ret.addClass('cell');
        _ret.addClass('noselect');
        _ret.mousedown(cellClickHandler);
        if(sFontName){
            _ret.css('font-family', '\'' + sFontName + '\'');
        }
        //_ret.mouseup(function (e) {
        //    e.stopPropagation();
        //});
        return _ret;
    }

    function updateRecents(){
        var oRecentsDiv = $('#recent-table');
        oRecentsDiv.empty();
        var nRecents = Math.min(getColsCount(), aRecents.length);
		if(aRecents.length === 0){
			oRecentsDiv.css('border', '1px solid rgb(247, 247, 247)');
			return;
		}
		oRecentsDiv.css('border', '1px solid rgb(122, 122, 122)');
        for(var i = 0; i < nRecents; ++i){
            var oCell = createCell(aRecents[i].symbol, aRecents[i].font);

            oCell.css('border-bottom', 'none');
            oRecentsDiv.append(oCell);
            if(i === (nRecents - 1)){
                oCell.css('border-right', 'none');
            }
        }
    }
    function getColsCount(){
        var nMaxWidth = $('#main-div').innerWidth() - 17 - 2;
        return ((nMaxWidth/CELL_WIDTH) >> 0);
    }


    function getMaxHeight(){

        var nMaxHeight = $('#main-div').innerHeight() - 10 - $('#header-div').outerHeight(true) - $('#recent-symbols-wrap').outerHeight(true)
            - $('#value-wrap').outerHeight(true) - $('#insert-button').outerHeight(true) - 2;
        return nMaxHeight;
    }
    function getRowsCount() {
        return  Math.max(1, ((getMaxHeight()/CELL_HEIGHT) >> 0));
    }

    function getAllSymbolsCount(arrRanges){
        var _count = 0;
        var oRange;
        for(var i = 0; i < arrRanges.length; ++i){
            oRange = arrRanges[i];
            _count += (oRange.End - oRange.Start + 1);
        }
        return _count;
    }

    


    function setTable(nStartCode){
        var nColsCount = getColsCount();
        var nRowsCount = getRowsCount();
        var nIndexSymbol = getLinearIndexByCode(aRanges, nStartCode);
        var nAllSymbolsCount = getAllSymbolsCount(aRanges);
        var nAllRowsCount = Math.ceil(nAllSymbolsCount/nColsCount);
        var nRowsSkip = Math.max(0, Math.min(nAllRowsCount - nRowsCount, ((nIndexSymbol / nColsCount) >> 0)));
        var nFirst = nRowsSkip*nColsCount;
        var nSymbolsCount = nRowsCount*nColsCount;
        var aSymbols = [];
        var nCode;
        for(var i = 0; i < nSymbolsCount; ++i){
            nCode = getCodeByLinearIndex(aRanges, nFirst + i);
            if(nCode === -1){
                break;
            }
            aSymbols.push(nCode);
        }
        var oSymbolTable = $('#symbols-table')[0];
        $('#symbols-table').css('font-family',  '\'' + aFontSelects[nCurrentFont].m_wsFontName + '\'');
        createTable(aSymbols, nRowsCount, nColsCount, oSymbolTable);
        return nRowsSkip;
    }





    var sLastId = "";
    var nLastTime = -1000;

    function cellClickHandler(e) {

        var id = $(this).attr('id');
        if(!id){
            return;
        }
        var nTime = (new Date()).getTime();
        if(id === sLastId && (nTime - nLastTime) < 300 ){
            cellDblClickHangdler.call(this, e)
        }
        else{
            if(id[0] === 'c'){
				nCurrentSymbol = parseInt(id.slice(1, id.length));
                bMainFocus = true;
            }
            else{
				var aStrings = id.split('_');
				nCurrentSymbol = parseInt(aStrings[1]);
				nFontNameRecent = parseInt(aStrings[2]);
                bMainFocus = false;
            }
            updateView(false);
        }
        sLastId = e.target.id;
        nLastTime = nTime;
    }

    function cellDblClickHangdler(){
		/*
        var bUpdateRecents = $(this).attr('id')[0] === 'c';
        bUpdateRecents && checkRecent(nCurrentSymbol, aFontSelects[nCurrentFont].m_wsFontName);
        var sScript = createScript(aFontSelects[nCurrentFont].m_wsFontName, String.fromCharCode(nCurrentSymbol));
        bUpdateRecents && updateView(false, undefined, undefined, true);
        window.Asc.plugin.info.recalculate = true;
        window.Asc.plugin.executeCommand('command', sScript);
		*/



		var sIdCell = $(this).attr('id');
		var bUpdateRecents = sIdCell[0] === 'c';
		var sFont;
		if(bUpdateRecents){
		    sFont = aFontSelects[nCurrentFont].m_wsFontName;
        }
        else{
			var nFontId = parseInt(sIdCell.split('_')[2]);
		    sFont = aFontSelects[nFontId].m_wsFontName;
        }
		bUpdateRecents && checkRecent(nCurrentSymbol, sFont);
		var _htmlPaste = "<span style=\"font-family:'" + sFont + "'\">" + encodeSurrogateChar(nCurrentSymbol) + "</span>";
		window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
		bUpdateRecents && updateView(false, undefined, undefined, true);
    }

    var nLastScroll = -1000;


    function onScrollEnd(){

        var container = document.getElementById('fake-symbol-table-wrap');

        if(container.scrollTop === nLastScroll){
            return;
        }

        var nSymbolsCount = getAllSymbolsCount(aRanges);
        var nColsCount = getColsCount();
        var nRows = getRowsCount();
        var nAllRowsCount = Math.ceil(nSymbolsCount/nColsCount);
        var nFullHeight = nAllRowsCount*CELL_HEIGHT;


            var nRowSkip = Math.max(0, Math.min(nAllRowsCount - nRows, (nAllRowsCount*container.scrollTop/nFullHeight + 0.5) >> 0));
        container.scrollTop = nRowSkip*CELL_HEIGHT;
        nLastScroll = container.scrollTop;
        if(!bMainFocus){
            nCurrentSymbol = getCodeByLinearIndex(aRanges, nRowSkip*nColsCount);
            bMainFocus = true;
        }
        else{
            var oFirstCell = $('#symbols-table').children()[0];
            if(oFirstCell){
                var id = oFirstCell.id;
                if(id){
                    var nOldFirstCode = parseInt(id.slice(1, id.length));
                    var nOldFirstLinearIndex = getLinearIndexByCode(aRanges, nOldFirstCode);
                    var nOldCurrentLinearIndex = getLinearIndexByCode(aRanges, nCurrentSymbol);
                    var nDiff = nOldCurrentLinearIndex - nOldFirstLinearIndex;
                    var nNewCurLinearIndex = nRowSkip*nColsCount + nDiff;
                    nCurrentSymbol = getCodeByLinearIndex(aRanges, nNewCurLinearIndex);
                    var nFirstIndex = nRowSkip*nColsCount;
                    nNewCurLinearIndex -= nColsCount;
                    while(nCurrentSymbol === -1 && nNewCurLinearIndex >= nFirstIndex){
                        nCurrentSymbol = getCodeByLinearIndex(aRanges, nNewCurLinearIndex);
                        nNewCurLinearIndex -= nColsCount;
                    }
                    if(nCurrentSymbol === -1){
                        nCurrentSymbol = getCodeByLinearIndex(aRanges, nFirstIndex);
                    }
                }
                else{
                    nCurrentSymbol = getCodeByLinearIndex(aRanges, nRowSkip*nColsCount);
                }
            }

        }
        $('#tooltip-div').hide();
        updateView(true, getCodeByLinearIndex(aRanges, nRowSkip*nColsCount));
    }
    var bShowTooltip = true;

    function updateView(bUpdateTable, nTopSymbol, bUpdateInput, bUpdateRecents, bUpdateRanges) {
        if(bUpdateTable !== false){
            //fill fonts combo box
            var oFontSelector = $('#font-select');
            oFontSelector.val(nCurrentFont);
        }
        //fill ranges combo box
        if(bMainFocus){
			if(bUpdateRanges !== false){
				updateRangeSelector();	
			}
        }
		
		if(bMainFocus){
			if(aFontSelects[nCurrentFont]){
				$("#font-name-label").text(aFontSelects[nCurrentFont].m_wsFontName);
			}
			else{
				$("#font-name-label").text('');
			}			
        }
        else{
			if(aFontSelects[nFontNameRecent]){
				$("#font-name-label").text(aFontSelects[nFontNameRecent].m_wsFontName);
			}
			else{
				$("#font-name-label").text('');
			}
        }
		
		 if(bUpdateTable !== false){
            //fill fonts combo box
            var oFontSelector = $('#font-select');
            oFontSelector.val(nCurrentFont);
             //
             // var oFont2 = oFontSelector.next()[0];
             // oFont2.css('width', 'auto');


            // var oRange2 = $('#range-select').next();
            //  oRange2.css('width', 'auto');



            //
			// var nResultWidth = Math.max(oFont2[0].clientWidth, oRange2[0].clientWidth);
            //
             // oFont2.width(nResultWidth);
             // oRange2.width(nResultWidth);
				
        }
		
        //main table
        var nRowsCount = getRowsCount();

        var nHeight = nRowsCount*CELL_HEIGHT - 1;
        $('#scrollable-table-div').height(nHeight);
        $('#scrollable-table-div').css('margin-bottom', getMaxHeight() - nHeight);


		
		bScrollMouseUp = false;	
        if(bUpdateTable !== false){
            //fill table
            var nSymbol = (nTopSymbol !== null && nTopSymbol !== undefined)? nTopSymbol : nCurrentSymbol;
            var nRowSkip = setTable(nSymbol);
            //update scroll
            var nSymbolsCount = getAllSymbolsCount(aRanges);
            var nAllRowsCount = Math.ceil(nSymbolsCount/getColsCount());
            var nFullHeight = nAllRowsCount*CELL_HEIGHT;
			
            var nOldHeight = $("#fake-symbol-table-wrap").height();
            $("#fake-symbol-table-wrap").height(nHeight);
            $("#fake-symbol-table").height(nFullHeight);

			
			var container = document.getElementById('fake-symbol-table-wrap');
			if(nOldHeight !== nHeight){	
				Ps.destroy(container);
				Ps.initialize(container, {
					theme: 'custom-theme',
					minScrollbarLength: Math.max((CELL_HEIGHT*2.0/3.0 + 0.5) >> 0, ((nHeight/8.0 + 0.5) >> 0))
				});			
			}
            bShowTooltip = false;            
            container.scrollTop = nRowSkip*CELL_HEIGHT;
            Ps.update(container);
            if($('.ps__scrollbar-y').height() === 0 || ((nFullHeight) <= (nHeight + 1))){
                $('.ps__scrollbar-y').css('border-width', '0px');
				$('.ps__scrollbar-y').hide();
            }
            else{
				$('.ps__scrollbar-y').show();
                $('.ps__scrollbar-y').css('border-width', '1px');
            }
            bShowTooltip = true;
            var aCells = $('#symbols-table > .cell');
            aCells.mousedown(cellClickHandler);
            //aCells.mouseup(function (e) {
            //    e.stopPropagation();
            //});
        }

        //fill recent
        if(bUpdateRecents){
            updateRecents();
        }

        //reset selection
        $('.cell').removeClass('cell-selected');

        //select current cell
        if(bMainFocus){
            $('#c' + nCurrentSymbol).addClass('cell-selected');		
        }
        else{
            $('#r_' + nCurrentSymbol + '_' + nFontNameRecent).addClass('cell-selected');
        }

        //update input
        if(bUpdateInput !== false){
            updateInput();
        }

    }

    function updateInput(){

        var sVal = nCurrentSymbol.toString(16).toUpperCase();
        var sValLen = sVal.length;
        for(var i = sValLen; i < 5; ++i){
            sVal = '0' + sVal;
        }
        $('#symbol-code-input').val(sVal);
    }


    function updateRangeSelector() {
        var oRangeSelector = $('#range-select');
        var oCurrentRange = getRangeBySymbol(aRanges, nCurrentSymbol);
        if(!oCurrentRange || !oCurrentRange.Name){
            oRangeSelector.empty();
            oRangeSelector.hide();
            $('#range-label').hide();
        }
        else{
            oRangeSelector.show();
            $('#range-label').show();
            oRangeSelector.empty();
            var oOption, i;
            for(i = 0; i < aRanges.length; ++i){
                oOption = $('<option></option>');
                oOption.attr('value', '' + aRanges[i].Name);
                oOption.text(oRangeNames[aRanges[i].Name]);
                oRangeSelector.append(oOption);
            }
            oRangeSelector.val(''+oCurrentRange.Name);
        }
		
		oRangeSelector.on('select2:select select2:unselecting', function(){});
		oRangeSelector.select2("destroy");
		oRangeSelector.select2({
			minimumResultsForSearch: Infinity
		});
        $('#range-select').next().css('width', $('#font-select').next()[0].clientWidth + 'px');
    }

    window.Asc.plugin.onMethodReturn = function(returnValue)
    {
		if (window.Asc.plugin.info.methodName != "GetFontList")
			return;
		
        var _this = this;
		returnValue.sort(function(a, b){
			if(a.m_wsFontName < b.m_wsFontName) return -1;
			if(a.m_wsFontName > b.m_wsFontName) return 1;
			return 0;
		});
        $(document).ready(function () {

            var oCurFont, oLastFont;
            var data = [];
            var oFontsByName = {};
            var sCurFontNameInMap;
            for(var i = 0; i < returnValue.length; ++i){
                oCurFont = returnValue[i];
                sCurFontNameInMap = oCurFont.m_wsFontName;
                oLastFont = oFontsByName[sCurFontNameInMap];
                if(!oLastFont){
                    oFontsByName[sCurFontNameInMap] = oCurFont;
                }
                else{
                    if(oLastFont.m_bBold && oLastFont.m_bItalic){
                        oFontsByName[sCurFontNameInMap] = oCurFont;
                    }
                    else if(oLastFont.m_bBold && !oCurFont.m_bBold){
                        oFontsByName[sCurFontNameInMap] = oCurFont;
                    }
                    else if(oLastFont.m_bItalic && !oCurFont.m_bBold && !oCurFont.m_bItalic){
                        oFontsByName[sCurFontNameInMap] = oCurFont;
                    }
                }
            }
            delete oFontsByName['ASCW3'];
            for(var key in oFontsByName){
                if(oFontsByName.hasOwnProperty(key)){
                    data.push(oFontsByName[key]);
                }
            }

            //initialize params
            aFontSelects = data;
			aFontSelects.sort(function(a, b){return (a.m_wsFontName.toLowerCase() > b.m_wsFontName.toLowerCase()) ? 1 : -1;});
            if(!oFontsByName[sInitFont]){
                if(oFontsByName['Cambria Math']){
                    sInitFont = 'Cambria Math';
                }
                else if(oFontsByName['Asana-Math']){
                    sInitFont = 'Asana-Math';
                }
            }
            if(oFontsByName[sInitFont]){
                for(i = 0; i < aFontSelects.length; ++i){
                    if(aFontSelects[i].m_wsFontName === sInitFont){
                        nCurrentFont = i;
                        break;
                    }
                }
            }
			if (nCurrentFont < 0)
				nCurrentFont = 0;
			
			
            aRanges = getArrRangesByFont(nCurrentFont);
			if(sInitSymbol && sInitSymbol.length > 0){
                nCurrentSymbol = fixedCharCodeAt(sInitSymbol, 0);
                if(false === nCurrentSymbol){
                    nCurrentSymbol = -1;
                }
                else{
                    for(i = 0; i < aRanges.length; ++i){
                        if(nCurrentSymbol >= aRanges[i].Start && nCurrentSymbol <= aRanges[i].End){
                            break;
                        }
                    }
                    if(i === aRanges.length){
                        nCurrentSymbol = -1;
                    }
                }
            }
			if(nCurrentSymbol === -1){
				nCurrentSymbol = aRanges[0].Start;	
			}            

            //fill fonts combo box
            var oFontSelector = $('#font-select');
            oFontSelector.empty();
            var oOption;
            for(i = 0; i < aFontSelects.length; ++i){
                oOption = $('<option></option>');
                oOption.attr('value', i);
                oOption.text(aFontSelects[i].m_wsFontName);
                oFontSelector.append(oOption);
            }			
            oFontSelector.val(nCurrentFont).trigger("change");
            //fill recents
            fillRecentSymbols();




            $( window ).resize(function(){
                updateView(undefined, undefined, undefined, true);
            });

            $('#font-select').change(
                function(){
                    var oCurrentRange = getRangeBySymbol(aRanges, nCurrentSymbol);
                    nCurrentFont = parseInt($('#font-select').val());
                    aRanges = getArrRangesByFont(nCurrentFont);
					if(oCurrentRange){
						for(var i = 0; i < aRanges.length; ++i){
							if(oCurrentRange.Name === aRanges[i].Name){
								break;
							}
						}
						if(i === aRanges.length){
							nCurrentSymbol = aRanges[0].Start;
						}	
					}
					else{
						nCurrentSymbol = aRanges[0].Start;							
					}
                    bMainFocus = true;
                    updateView();
                }
            );
			
			
		/*$('#range-select').on('select2:select select2:unselecting', function () {
                    var oCurrentRange = getRangeByName(aRanges, parseInt($('#range-select').val()));
                    nCurrentSymbol = oCurrentRange.Start;
                    bMainFocus = true;
                    updateView();
                });*/

           $('#range-select').change(
                function () {
                    var oCurrentRange = getRangeByName(aRanges, parseInt($('#range-select').val()));
                    nCurrentSymbol = oCurrentRange.Start;
                    bMainFocus = true;
                    updateView(undefined, undefined, undefined, undefined, false);
                }
            );

            $('#symbol-code-input').on('input',
                function(){
                    var value = parseInt($(this).val(), 16);
                    if(!isNaN(value) && value > 0x1F){
                        var oRange = getRangeBySymbol(aRanges, value);
                        if(oRange){
                            var bUpdateTable = ($("#c" + value).length === 0);
                            nCurrentSymbol = value;
                            bMainFocus = true;
                            updateView(bUpdateTable, undefined, false);
                        }
                    }
                }
            );

            $('#symbol-code-input').focusout(
                function(){

                    updateInput();
                }
            );


            $(document).on('ps-scroll-y', function () {

                var oTooltip = $('#tooltip-div');
                if(!bShowTooltip){
                    bShowTooltip = true;
                    oTooltip.hide();
                    return;
                }
                var container = document.getElementById('fake-symbol-table-wrap');

                var nSymbolsCount = getAllSymbolsCount(aRanges);
                var nColsCount = getColsCount();
                var nRows = getRowsCount();
                var nAllRowsCount = Math.ceil(nSymbolsCount/nColsCount);
                var nFullHeight = nAllRowsCount*CELL_HEIGHT;

                var nSymbol;
                var nRowSkip = Math.min(nAllRowsCount - nRows, (nAllRowsCount*container.scrollTop/nFullHeight + 0.5) >> 0);
                if(!bMainFocus){
                    nSymbol = getCodeByLinearIndex(aRanges, nRowSkip*nColsCount);
                }
                else{
                    var id = $('#symbols-table').children()[0].id;
                    if(id){
                        var nOldFirstCode = parseInt(id.slice(1, id.length));
                        var nOldFirstLinearIndex = getLinearIndexByCode(aRanges, nOldFirstCode);
                        var nOldCurrentLinearIndex = getLinearIndexByCode(aRanges, nCurrentSymbol);
                        var nDiff = nOldCurrentLinearIndex - nOldFirstLinearIndex;
                        var nNewCurLinearIndex = nRowSkip*nColsCount + nDiff;
                        nSymbol = getCodeByLinearIndex(aRanges, nNewCurLinearIndex);
                    }
                    else{
                        nSymbol = getCodeByLinearIndex(aRanges, nRowSkip*nColsCount);
                    }
                }

                var oRange = getRangeBySymbol(aRanges, nSymbol);
                if(!oRange){
                    oTooltip.hide();
                    return;
                }
                var sRangeName = oRangeNames[oRange.Name];
                oTooltip.text(sRangeName);
                oTooltip.css('top', $('.ps__scrollbar-y').css('top'));
                oTooltip.css('right', $('#fake-symbol-table-wrap').width() + 4);
                if(!oTooltip.is(":visible")){
                    oTooltip.show();
                }
				if(bScrollMouseUp){
					bScrollMouseUp = false;					
					onScrollEnd();
				}
            });


            $("#fake-symbol-table-wrap").on('mouseup.perfect-scroll', function(){
				bScrollMouseUp = true;						
				onScrollEnd();
			});
            document.getElementById("fake-symbol-table-wrap").addEventListener("wheel",  function () {
                onScrollEnd();
                bShowTooltip = false;
            });
            document.addEventListener("mouseup", function(){
				//bScrollMouseUp = true;						
				onScrollEnd();
			});
            document.getElementById("symbols-table").addEventListener("wheel", function(e){
                var container = document.getElementById('fake-symbol-table-wrap');
                var delta = e.detail || e.wheelDelta || 0;
                if(e.wheelDelta){
                    delta = e.wheelDelta;
                }
                else if(e.deltaY){
                    delta = e.deltaY*(-40);
                }
                else{
                    delta = 0;
                }
                container.scrollTop -= delta;
                onScrollEnd();
                bShowTooltip = false;
            });
            $('#fake-symbol-table').on('scroll',

                function () {
                    onScrollEnd();
                    bShowTooltip = false;
                }

                );
            $('.ps__scrollbar-y-rail').on('scroll',

                function () {
                    bShowTooltip = false;
                }

                );

            $('.ps__scrollbar-y').on('scroll',

                function () {
                    bShowTooltip = false;
                }

                );


            $('#insert-button').click(
                function () {
					/*
                    checkRecent(nCurrentSymbol, aFontSelects[nCurrentFont].m_wsFontName);
                    var sScript = createScript(aFontSelects[nCurrentFont].m_wsFontName, String.fromCharCode(nCurrentSymbol));
                    updateRecents();
                    window.Asc.plugin.info.recalculate = true;
                    window.Asc.plugin.executeCommand('command', sScript);
					*/

                    var sIdCell = $('.cell-selected').attr('id');
                    var bUpdateRecents = sIdCell[0] === 'c';
                    var sFont;
                    if(bUpdateRecents){
                        sFont = aFontSelects[nCurrentFont].m_wsFontName;
                    }
                    else{
                        var nFontId = parseInt(sIdCell.split('_')[2]);
                        sFont = aFontSelects[nFontId].m_wsFontName;
                    }
                    bUpdateRecents && checkRecent(nCurrentSymbol, sFont);
					var _htmlPaste = "<span style=\"font-family:'" + sFont + "'\">" + encodeSurrogateChar(nCurrentSymbol) + "</span>";
					window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
                    bUpdateRecents && updateRecents();
                }
            );




            $("#main-div").show();

            var container = document.getElementById('fake-symbol-table-wrap');
            Ps.initialize(container, {
                theme: 'custom-theme',
                minScrollbarLength: 50
            });
			
			$('#font-select').select2();
			$('#range-select').select2({
				minimumResultsForSearch: Infinity
			});

            //$($('.ps__scrollbar-y')[0]).append('<span id=\"tooltip-span\" class=\"tooltiptext\">sdfsdfsdf</span>');

            updateView(undefined, undefined, undefined, true);
			nLastScroll = 0;


            $('.select2-input').on("keydown", function(e) {
                if (e.keyCode == 13) {
                    $("#select2-drop-mask").click();
                    $('#name').focus();
                    e.preventDefault();
                }
            });

			var lastTime = -1;
			var lastKeyCode = -1;
            
            $(document).on( "keydown", function(e){

                if($('#symbol-code-input').is(':focus')){
                    return;
                }

                if($('.select2-search__field').is(':focus')){
                    return;
                }

                if($("#font-select").select2("isOpen")){
                    return;
                }
                if($("#range-select").select2("isOpen")){
                    return;
                }

                if(document.activeElement){
                    if(document.activeElement.nodeName && document.activeElement.nodeName.toLowerCase() === 'span'){
                        return;
                    }
                }

				var value = e.which || e.charCode || e.keyCode || 0;
				
				var bFill = true;
                if(bMainFocus){
                    var nCode = -1;
                    if ( value === 37 ){//left
                        nCode = getCodeByLinearIndex(aRanges, getLinearIndexByCode(aRanges, nCurrentSymbol) - 1);
                    }
                    else if ( value === 38 ){//top
                        nCode = getCodeByLinearIndex(aRanges, getLinearIndexByCode(aRanges, nCurrentSymbol) - getColsCount());
                    }
                    else if ( value === 39 ){//right
                        nCode = getCodeByLinearIndex(aRanges, getLinearIndexByCode(aRanges, nCurrentSymbol) + 1);
                    }
                    else if ( value === 40 ){//bottom
                        nCode = getCodeByLinearIndex(aRanges, getLinearIndexByCode(aRanges, nCurrentSymbol) + getColsCount());
                    }
                    else if(value === 36){//home
                        if(aRanges.length > 0){
                            nCode = aRanges[0].Start;
                        }
                    }
                    else if(value === 35){//end
                        if(aRanges.length > 0){
                            nCode = aRanges[aRanges.length - 1].End;
                        }
                    }
                    else if(value === 13){//enter
                        checkRecent(nCurrentSymbol, aFontSelects[nCurrentFont].m_wsFontName);
                        var _htmlPaste = "<span style=\"font-family:'" + aFontSelects[nCurrentFont].m_wsFontName + "'\">" + encodeSurrogateChar(nCurrentSymbol) + "</span>";
                        window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
                    }					
					else{
						bFill = false;
					}
                    if(nCode > -1){
                        nCurrentSymbol = nCode;
                        var bUpdateTable =  $('#c' + nCurrentSymbol).length === 0;
                        updateView(bUpdateTable);
						if(bUpdateTable){							
							nLastScroll = document.getElementById('fake-symbol-table-wrap').scrollTop;
						}
                    }
                }
                else{
                    var oSelectedCell, aStrings;
                    if ( value === 37 ){//left
                        oSelectedCell = $('.cell-selected')[0];
                        if(oSelectedCell && oSelectedCell.id[0] === 'r'){
                            var oPresCell = $(oSelectedCell).prev();
                            if(oPresCell.length > 0){
                                aStrings = $(oPresCell).attr('id').split('_');
                                nCurrentSymbol = parseInt(aStrings[1]);
                                nFontNameRecent = parseInt(aStrings[2]);
                                updateView(false);
                            }
                        }
                    }
                    else if ( value === 39 ){//right
                        oSelectedCell = $('.cell-selected')[0];
                        if(oSelectedCell && oSelectedCell.id[0] === 'r'){
                            var oNextCell = $(oSelectedCell).next();
                            if(oNextCell.length > 0){
                                aStrings = $(oNextCell).attr('id').split('_');
                                nCurrentSymbol = parseInt(aStrings[1]);
                                nFontNameRecent = parseInt(aStrings[2]);
                                updateView(false);
                            }
                        }
                    }
                    else if(value === 36){//home
                        var oFirstCell = $('#recent-table').children()[0];
                        if(oFirstCell){
                            aStrings = oFirstCell.id.split('_');
                            nCurrentSymbol = parseInt(aStrings[1]);
                            nFontNameRecent = parseInt(aStrings[2]);
                            updateView(false);
                        }
                    }
                    else if(value === 35){//end
                        var aChildren = $('#recent-table').children();
                        var oLastCell = aChildren[aChildren.length - 1];
                        if(oLastCell){
                            aStrings = oLastCell.id.split('_');
                            nCurrentSymbol = parseInt(aStrings[1]);
                            nFontNameRecent = parseInt(aStrings[2]);
                            updateView(false);
                        }
                    }
                    else if(value === 13){//enter
                        var _htmlPaste = "<span style=\"font-family:'" + aFontSelects[nFontNameRecent].m_wsFontName + "'\">" + encodeSurrogateChar(nCurrentSymbol) + "</span>";
                        window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
                    }
					else{
						bFill = false;
					}
                }
            
				if(bFill){
					lastKeyCode = value;
					lastTime = (new Date()).getTime();
				}
			} )



			var fKeyPressHandler = function(e){

                if($('#symbol-code-input').is(':focus')){
					
                    return;
                }

                if($('.select2-search__field').is(':focus')){
                    return;
                }

                if($("#font-select").select2("isOpen")){
                    return;
                }
                if($("#range-select").select2("isOpen")){
                    return;
                }

                if(document.activeElement){
                    if(document.activeElement.nodeName && document.activeElement.nodeName.toLowerCase() === 'span'){
                        return;
                    }
                }
				var value = e.which || e.charCode || e.keyCode || 0;
				if(lastKeyCode === value){
					if(Math.abs(lastTime - (new Date()).getTime()) < 1000){
						return;
					}
				}
                if(!isNaN(value) && value > 0x1F){
                    var oRange = getRangeBySymbol(aRanges, value);
                    if(oRange){
                        var bUpdateTable = ($("#c" + value).length === 0);
                        nCurrentSymbol = value;
                        bMainFocus = true;
                        updateView(bUpdateTable, undefined, true);
                    }
                }
				e.preventDefault && e.preventDefault();
            };

            $(document).on( "keypress", fKeyPressHandler)


        });
    };

    window.Asc.plugin.init = function(data){
		var oData = $(data);		
		if(oData[0]){
		    var oFirstSpan = null;
			var oFirstElem = $(oData[0]);
			if(oFirstElem.is("span")){
                oFirstSpan = oFirstElem;
            }
            else{
			    var oParFirstChild = oFirstElem.children().first();
			    if(oParFirstChild.is("span")){
                    oFirstSpan = oParFirstChild;
                }
            }

            if(oFirstSpan){
                sInitSymbol = oFirstSpan.text();
                if(sInitSymbol && sInitSymbol.length > 0){
                    sInitFont = oFirstSpan.css("font-family");
                    if(sInitFont.length > 1 && sInitFont[0] === "\"" && sInitFont[sInitFont.length-1] === "\""){
                        sInitFont = sInitFont.slice(1, sInitFont.length - 1);
                    }
                }
            }
		}
        window.Asc.plugin.executeMethod("GetFontList");
    };



    window.Asc.plugin.onExternalMouseUp = function()
    {
    	if (!_userAgentIE)
		{
			var event = new MouseEvent('mouseup', {
				'view':       window,
				'bubbles':    true,
				'cancelable': true
			});

			document.dispatchEvent(event);
		}
		else
		{
			var mouseUpEvent = document.createEvent ('MouseEvents');
			mouseUpEvent.initEvent("mouseup", true, true);
			document.dispatchEvent(mouseUpEvent);

			document.dispatchEvent(mouseUpEvent);
		}
    };

    window.Asc.plugin.button = function(id){
        saveRecent();
        this.executeCommand('close', '');
    };

})(window, undefined);
(function(window, undefined){



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

    var nMaxRecent = 36;



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
        for(var i = 0; i < nDivCount; ++i){
            if(i < arrSym.length){
                sId = 'c' + arrSym[i];
                sInnerHtml += '<div class=\"cell\" id=\"' + sId + '\">' + '&#' + arrSym[i].toString(10) + '</div>';
            }
            else{
                sInnerHtml += '<div class=\"cell\"></div>';
            }
            ++nCellsCounter;
            if(nCellsCounter >= nColsCount){
                sInnerHtml +=  '<br class=\"noselect\">';
                nCellsCounter = 0;
            }
        }
        oDiv.innerHTML = sInnerHtml;
    }



    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function fillRecentSymbols(){
        var sCookie = getCookie('recent');
        var aRecentCookies;
        if(sCookie != ''){
            aRecentCookies = JSON.parse(sCookie);
        }
        if(Array.isArray(aRecentCookies)){
            aRecents = aRecentCookies;
        }
    }

    function saveRecent(){
        var sJSON = JSON.stringify(aRecents);
        setCookie('recent', sJSON, 360);
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
        var sId = 'r' + nSymbolCode;
        var _ret = $('<div id=\"' + sId + '\"></div>');
        _ret.text(String.fromCharCode(nSymbolCode));
        _ret.addClass('cell');
        _ret.addClass('noselect');
        _ret.mousedown(cellClickHandler);
        _ret.dblclick(cellDblClickHangdler);
        if(sFontName){
            _ret.css('font-family', sFontName);
        }
        return _ret;
    }

    function updateRecents(){
        var oRecentsDiv = $('#recent-table');
        oRecentsDiv.empty();
        for(var i = 0; i < aRecents.length; ++i){
            oRecentsDiv.append(createCell(aRecents[i].symbol, aRecents[i].font));
        }
    }
    function getColsCount(){
        var nMaxWidth = $('#main-div').innerWidth() - 16 - 2;
        return ((nMaxWidth/CELL_WIDTH) >> 0);
    }


    function getMaxHeight(){

        var nMaxHeight = $('#main-div').innerHeight() - 10 - $('#header-div').outerHeight(true) - $('#recent-symbols-wrap').outerHeight(true)
            - $('#value-wrap').outerHeight(true) - $('#insert-button').outerHeight(true) - 2;
        return nMaxHeight;
    }
    function getRowsCount() {
        return  ((getMaxHeight()/CELL_HEIGHT) >> 0);
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

        var nRowsSkip = ((nIndexSymbol / nColsCount) >> 0);
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
        $('#symbols-table').css('font-family', aFontSelects[nCurrentFont].m_wsFontName);
        createTable(aSymbols, nRowsCount, nColsCount, oSymbolTable);
        return nRowsSkip;
    }



    function onResize(){

    }



    function cellClickHandler() {
        var id = $(this).attr('id');
        nCurrentSymbol = parseInt(id.slice(1, id.length));
        if(id[0] === 'c'){
            bMainFocus = true;
        }
        else{
            bMainFocus = false;
        }
        updateView(false);
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
		var bUpdateRecents = $(this).attr('id')[0] === 'c';
		bUpdateRecents && checkRecent(nCurrentSymbol, aFontSelects[nCurrentFont].m_wsFontName);
		var _htmlPaste = "<span style=\"font-family:'" + aFontSelects[nCurrentFont].m_wsFontName + "'\">" + String.fromCharCode(nCurrentSymbol) + "</span>";
		window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
		bUpdateRecents && updateView(false, undefined, undefined, true);
    }

    function updateView(bUpdateTable, nTopSymbol, bUpdateInput, bUpdateRecents) {
        //fill fonts combo box
        var oFontSelector = $('#font-select');
        oFontSelector.val(nCurrentFont);
        //fill ranges combo box
        updateRangeSelector();


        //main table
        var nRowsCount = getRowsCount();

        var nHeight = nRowsCount*CELL_HEIGHT;
        $('#scrollable-table-div').height(nHeight);
        $('#scrollable-table-div').css('margin-bottom', getMaxHeight() - nHeight);


        if(bUpdateTable !== false){
            //fill table
            var nSymbol = (nTopSymbol !== null && nTopSymbol !== undefined)? nTopSymbol : nCurrentSymbol;
            var nRowSkip = setTable(nSymbol);
            //update scroll
            var nSymbolsCount = getAllSymbolsCount(aRanges);
            var nAllRowsCount = Math.ceil(nSymbolsCount/getColsCount());
            var nFullHeight = nAllRowsCount*CELL_HEIGHT;
            $("#fake-symbol-table-wrap").height(nHeight);
            $("#fake-symbol-table").height(nFullHeight);

            var container = document.getElementById('fake-symbol-table-wrap');
            container.scrollTop = nRowSkip*CELL_HEIGHT;
            Ps.update(container);
            if($('.ps__scrollbar-y').height() === 0){
                $('.ps__scrollbar-y').css('border-width', '0px');
            }
            else{
                $('.ps__scrollbar-y').css('border-width', '1px');
            }
            $('#symbols-table > .cell').mousedown(cellClickHandler);
            $('#symbols-table > .cell').dblclick(cellDblClickHangdler);
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
            $('#r' + nCurrentSymbol).addClass('cell-selected');
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
        if(!oCurrentRange){
            oRangeSelector.empty();
            oRangeSelector.hide();
        }
        else{
            oRangeSelector.show();
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
    }

    window.Asc.plugin.onMethodReturn = function(returnValue)
    {

        var _this = this;
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
            if(oFontsByName['Cambria Math']){
                for(i = 0; i < aFontSelects.length; ++i){
                    if(aFontSelects[i].m_wsFontName === 'Cambria Math'){
                        nCurrentFont = i;
                        break;
                    }
                }
            }
            aRanges = getArrRangesByFont(nCurrentFont);
            nCurrentSymbol = aRanges[0].Start;


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
            //fill recents
            fillRecentSymbols();




            $( window ).resize(function(){
                updateView();
            });

            $('#font-select').change(
                function(){
                    var oCurrentRange = getRangeBySymbol(aRanges, nCurrentSymbol);
                    nCurrentFont = parseInt($('#font-select').val());
                    aRanges = getArrRangesByFont(nCurrentFont);
                    for(var i = 0; i < aRanges.length; ++i){
                        if(oCurrentRange.Name === aRanges[i].Name){
                            break;
                        }
                    }
                    if(i === aRanges.length){
                        nCurrentSymbol = aRanges[0].Start;
                    }
                    bMainFocus = true;
                    updateView();
                }
            );

            $('#range-select').change(
                function () {
                    var oCurrentRange = getRangeByName(aRanges, parseInt($('#range-select').val()));
                    nCurrentSymbol = oCurrentRange.Start;
                    bMainFocus = true;
                    updateView();
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
                            updateView(bUpdateTable, false);
                        }
                    }
                }
            );

            $('#symbol-code-input').focusout(
                function(){
                    updateView(false);
                }
            );


            function onScrollEnd(){

                var nSymbolsCount = getAllSymbolsCount(aRanges);
                var nColsCount = getColsCount();
                var nAllRowsCount = Math.ceil(nSymbolsCount/nColsCount);
                var nFullHeight = nAllRowsCount*CELL_HEIGHT;

                var container = document.getElementById('fake-symbol-table-wrap');

                var nRowSkip = Math.min(nAllRowsCount, (nAllRowsCount*container.scrollTop/nFullHeight + 0.5) >> 0);
                container.scrollTop = nRowSkip*CELL_HEIGHT;

                if(!bMainFocus){
                    nCurrentSymbol = getCodeByLinearIndex(aRanges, nRowSkip*nColsCount);
                    bMainFocus = true;
                }
                else{
                    var id = $('#symbols-table:first-child').children(":first").attr('id');
                    if(id){
                        var nOldFirstCode = parseInt(id.slice(1, id.length));
                        var nOldFirstLinearIndex = getLinearIndexByCode(aRanges, nOldFirstCode);
                        var nOldCurrentLinearIndex = getLinearIndexByCode(aRanges, nCurrentSymbol);
                        var nDiff = nOldCurrentLinearIndex - nOldFirstLinearIndex;
                        var nNewCurLinearIndex = nRowSkip*nColsCount + nDiff;
                        nCurrentSymbol = getCodeByLinearIndex(aRanges, nNewCurLinearIndex);
                    }
                    else{
                        nCurrentSymbol = getCodeByLinearIndex(aRanges, nRowSkip*nColsCount);
                    }

                }
                updateView(true, getCodeByLinearIndex(aRanges, nRowSkip*nColsCount));
            }

            $("#fake-symbol-table-wrap").on('mouseup.perfect-scroll', onScrollEnd);
            document.getElementById("fake-symbol-table-wrap").addEventListener("wheel", onScrollEnd);
            document.getElementById("symbols-table").addEventListener("wheel", function(e){
                var container = document.getElementById('fake-symbol-table-wrap');
                container.scrollTop -= e.wheelDelta;
                onScrollEnd();
            });
            $('#fake-symbol-table').on('scroll', onScrollEnd);


            $('#insert-button').click(
                function () {
					/*
                    checkRecent(nCurrentSymbol, aFontSelects[nCurrentFont].m_wsFontName);
                    var sScript = createScript(aFontSelects[nCurrentFont].m_wsFontName, String.fromCharCode(nCurrentSymbol));
                    updateRecents();
                    window.Asc.plugin.info.recalculate = true;
                    window.Asc.plugin.executeCommand('command', sScript);
					*/
					checkRecent(nCurrentSymbol, aFontSelects[nCurrentFont].m_wsFontName);
					var _htmlPaste = "<span style=\"font-family:'" + aFontSelects[nCurrentFont].m_wsFontName + "'\">" + String.fromCharCode(nCurrentSymbol) + "</span>";
					window.Asc.plugin.executeMethod("PasteHtml", [_htmlPaste]);
					updateRecents();
                }
            );



            updateView(undefined, undefined, undefined, true);



            var container = document.getElementById('fake-symbol-table-wrap');
            Ps.initialize(container, {
                theme: 'custom-theme',
                minScrollbarLength: 50
            });




        });
    };

    window.Asc.plugin.init = function(data){
        window.Asc.plugin.executeMethod("GetFontList");
    };


    window.Asc.plugin.button = function(id){
        saveRecent();
        this.executeCommand('close', '');
    };

})(window, undefined);
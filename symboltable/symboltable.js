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
    
    
    var sCurrentFont;
    var nCurrentRange;
    var aCurSupportedRanges;

    var aFontSelects = [];
    var aRecents = [];
    var oMapFontSelect = [];
    var nMaxRecent = 36;
    function getAllFontsSelect(data){
        aFontSelects = data;
        for(var i  = 0; i < aFontSelects.length; ++i){
            oMapFontSelect[aFontSelects[i].m_wsFontName] = aFontSelects[i];
        }
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

    function getFontInfo(sFontName){
        return oMapFontSelect[sFontName];
    }

    function getRangeName(nRangeId){
        return oRangeNames[nRangeId];
    }

    function fillFontSelect(){
        var oFontSelector = $('#font-select');
        oFontSelector.empty();
        var oOption;
        for(var i = 0; i < aFontSelects.length; ++i){
            oOption = $('<option></option>');
            oOption.attr('value', aFontSelects[i].m_wsFontName);
            oOption.text(aFontSelects[i].m_wsFontName);
            oFontSelector.append(oOption);
        }
        oFontSelector.val(sCurrentFont);
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
            }
            case 'cell':{
                
                break;
            }
        }

        return sScript;
    }

    function cellDblClick(){
        var sScript =  createScript(sCurrentFont, $(this).text());
        window.Asc.plugin.info.recalculate = true;
        window.Asc.plugin.executeCommand("command", sScript);
        if($(this).parent().attr("id") === 'symbols-table'){
            var oThis = $(this);
            checkRecent(oThis.text().charCodeAt(0), oThis.css('font-family'));
            updateRecents();
        }
    }
    function cellClick(){
        $('.cell').removeClass('cell-selected');
        $(this).addClass('cell-selected');
        if(bSetVal){
            var sVal = $(this).text().charCodeAt(0).toString(16).toUpperCase();
            var sValLen = sVal.length;
            for(var i = sValLen; i < 4; ++i){
                sVal = '0' + sVal;
            }
            $('#symbol-code-input').val(sVal);
        }
    }

    var bSetVal = true;
    function createCell(nSymbolCode, sFontName){
        var _ret = $('<div></div>');
        _ret.text(String.fromCharCode(nSymbolCode));
        _ret.addClass('cell');
        _ret.addClass('noselect');
        _ret.css('font-family', sFontName);
        _ret.dblclick(cellDblClick);
        _ret.click(cellClick);
        return _ret;
    }

    function updateFontRangeSelectByFont(){
        var oRangeSelector = $('#range-select');
        oRangeSelector.empty();
        var oOption;
        var aOptions = [];
        for(var i = 0; i < aCurSupportedRanges.length; ++i){
            oOption = $('<option></option>');
            oOption.attr('value', "" + aCurSupportedRanges[i].Name);
            oOption.text(getRangeName(aCurSupportedRanges[i].Name));
            aOptions.push(oOption);
        }
        oRangeSelector.append(aOptions);
        oRangeSelector.val("" + aCurSupportedRanges[nCurrentRange].Name);
    }

    function updateRecents(){
        var oRecentsDiv = $('#recent-table');
        oRecentsDiv.empty();
        for(var i = 0; i < aRecents.length; ++i){
            oRecentsDiv.append(createCell(aRecents[i].symbol, aRecents[i].font));
        }
    }

    function updateTableByFont(){
        var oCurRange = aCurSupportedRanges[nCurrentRange];
        var oSymbolTable = $('#symbols-table');
        oSymbolTable.empty();
        if(!oCurRange){
            return;
        }
        var nStart = Math.max(0x20,  oCurRange.Start);
        var aCells = [];
        for(var i = nStart; i <= oCurRange.End; ++i){
            var oCell = createCell(i, sCurrentFont);
            aCells.push(oCell);
        }
        oSymbolTable.append(aCells);
        updateScroll();
        aCells[0].trigger('click');
    }



    function updateScroll(){
        var container = document.getElementById('scrollable-table-div');
        Ps.update(container);
        if($('.ps__scrollbar-y').height() === 0){
            $('.ps__scrollbar-y').css('border-width', '0px');
            $('#symbols-table').css('margin-right', '0px');
        }
        else{
            $('.ps__scrollbar-y').css('border-width', '1px');
            $('#symbols-table').css('margin-right', '13px');
        }
    }


    window.Asc.plugin.onMethodReturn = function(returnValue)
    {

        var _this = this;
        $(document).ready(function () {


            var data = returnValue;

            $( window ).resize(function(){
                updateScroll();
            });

            //_this.resizeWindow(600, 700, 400, 300, 10000, 10000);

            fillRecentSymbols();

            var container = document.getElementById('scrollable-table-div');
            Ps.initialize(container, {
                theme: 'custom-theme',
                minScrollbarLength: 50
            });
            getAllFontsSelect(data);
            if(aFontSelects.length === 0){
                //  this.executeCommand('close', '');
                return;
            }
            if(oMapFontSelect['Cambria Math']){
                sCurrentFont = 'Cambria Math';
            }
            else if(oMapFontSelect['Arial Unicode MS']){
                sCurrentFont = 'Arial Unicode MS';
            }
            else{
                sCurrentFont = aFontSelects[0].m_wsFontName;
            }
            aCurSupportedRanges = getSupprotedRangesByFont(getFontInfo(sCurrentFont));
            var bFound = false;
            for(var i = 0; i < aCurSupportedRanges.length && aCurSupportedRanges[i].Name < 2; ++i){
                if(aCurSupportedRanges[i].Name === 1){
                    nCurrentRange = i;
                    bFound = true;
                    break;
                }
            }
            if(!bFound){
                nCurrentRange = 0;
            }

            $('#font-select').change(
                function(){
                    sCurrentFont = $('#font-select').val();
                    var sOldName = null;
                    if(aCurSupportedRanges[nCurrentRange]){
                        sOldName = aCurSupportedRanges[nCurrentRange].Name;
                    }
                    aCurSupportedRanges = getSupprotedRangesByFont(getFontInfo(sCurrentFont));
                    var bFound = false, i;
                    if(sOldName !== null){
                        for(i = 0; i < aCurSupportedRanges.length; ++i){
                            if(aCurSupportedRanges[i].Name === sOldName){
                                nCurrentRange = i;
                                bFound = true;
                                break;
                            }
                        }
                    }
                    if(!bFound){
                        for(i = 0; i < aCurSupportedRanges.length && aCurSupportedRanges[i].Name < 2; ++i){
                            if(aCurSupportedRanges[i].Name === 1){
                                nCurrentRange = i;
                                bFound = true;
                                break;
                            }
                        }
                    }
                    if(!bFound){
                        nCurrentRange = 0;
                    }
                    updateTableByFont();
                    updateFontRangeSelectByFont();
                }
            );

            $('#range-select').change(
                function () {
                    var bFound = false;
                    var nName = parseInt($('#range-select').val());
                    for(var i = 0; i < aCurSupportedRanges.length; ++i){
                        if(aCurSupportedRanges[i].Name === nName){
                            nCurrentRange = i;
                            bFound = true;
                            break;
                        }
                    }
                    if(!bFound){
                        nCurrentRange = 0;
                    }
                    updateTableByFont();
                }
            );

            $('#symbol-code-input').on('input',
                function(){
                    var value = parseInt($(this).val(), 16);
                    if(!isNaN(value) && value > 0x1F){
                        for(var i = 0; i < aCurSupportedRanges.length; ++i){
                            var oCurRange = aCurSupportedRanges[i];
                            if(value >= oCurRange.Start && value <= oCurRange.End){
                                var oRangeSelector = $('#range-select');
                                var sVal = "" + oCurRange.Name;
                                if(sVal !== oRangeSelector.val()){
                                    oRangeSelector.val(sVal);
                                    bSetVal = false;
                                    oRangeSelector.trigger('change');
                                    bSetVal = true;
                                }
                                $('.cell').removeClass('cell-selected');
                                var sText = "\'" + String.fromCharCode(value) + "\'";
                                $(".cell:contains(" + sText +")").addClass('cell-selected');
                                bSetVal = false;
                                $('.cell-selected').trigger('click');
                                bSetVal = true;
                                return;
                            }
                        }
                    }
                }
            );

            $('#symbol-code-input').focusout(
                function(){
                    $('.cell-selected').trigger('click');
                }
            );

            $('#insert-button').click(
                function () {
                    $('.cell-selected').trigger('dblclick');
                }
            );

            fillFontSelect();
            updateTableByFont();
            updateFontRangeSelectByFont();
            updateRecents();
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
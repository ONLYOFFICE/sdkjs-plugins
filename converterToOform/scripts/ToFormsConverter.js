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

(function (window, undefined)
{
    window.Asc.plugin.init = function ()
    {
        let context = this;

        document.getElementById("btn_Convert").onclick = function()
        {
            let strOpenToken        = document.getElementById("openToken").value;
            let strCloseToken       = document.getElementById("closeToken").value;
            strOpenToken            = strOpenToken.trim();
            strCloseToken           = strCloseToken.trim();

            function CheckStartAndEndTokens(strStart, strEnd)
            {
                let $labelInnerText = document.getElementById("lb_key_err_mes");

                if (strEnd === strStart)
                {
                    $labelInnerText.innerText = "The opening and closing token cannot be given the same sequence";
                    return true;
                }
                else if (strEnd === "" || strStart === "")
                {
                    $labelInnerText.innerText = "Closing and opening token cannot be null"
                    return true;
                }
                else
                {
                    $labelInnerText.innerText = "";
                }

                return false;
            }

            if (CheckStartAndEndTokens(strOpenToken, strCloseToken))
                return;

            Asc.scope.strOpenToken  = strOpenToken;
            Asc.scope.strCloseToken = strCloseToken;

            context.callCommand(function()
            {
                let strOpenToken            = Asc.scope.strOpenToken,
                    strCloseToken           = Asc.scope.strCloseToken,
                    oOpenCheck              = new CheckToken(strOpenToken),
                    oCloseCheck             = new CheckToken(strCloseToken),
                    oSaver                  = new RunsSaver(),
                    oFuncForParagraphSave   = function (nStart, nEnd, context)
                    {
                        let range = context.Paragraph.GetRange(nStart, nEnd);
                        oSaver.Put(range);
                    },
                    oFuncForRangeSave       = function (nStart, nEnd, context)
                    {
                        let range = context.iterator.GetRange(nStart, nEnd);
                        oSaver.Put(range);
                    };

                function ParagraphIterator(oParagraph)
                {
                    this.Paragraph              = oParagraph;
                    this.nCountOfRun            = this.Paragraph.GetElementsCount() - 1;

                    this.nCounter               = 0;
                    this.nRunCounter            = 0;
                    this.nCurrentLength         = 0;

                    this.oCurrentRun             = null;
                    this.strCurrentRun          = "";
                    this.nCurrentRunLength      = 0;

                    this.InitNewRun = function ()
                    {
                        this.oCurrentRun         = this.Paragraph.GetElement(this.nCounter);
                        this.strCurrentRun      = this.oCurrentRun.GetRange().GetText();
                        this.nCurrentRunLength  = this.strCurrentRun.length;

                        this.ResetRunProperties();

                        if (this.IsHasContent())
                            this.AddNCounter();
                    };
                    this.ResetRunProperties = function ()
                    {
                        this.nRunCounter = 0;
                    };
                    this.IsHasContentInRun = function ()
                    {
                        return this.oCurrentRun && this.nRunCounter < this.nCurrentRunLength;
                    };
                    this.IsHasContent = function ()
                    {
                        return this.nCounter <= this.nCountOfRun;
                    };
                    this.AddNCounter = function ()
                    {
                        this.nCounter++;
                    };
                    this.AddNRunCounter = function ()
                    {
                        this.nRunCounter++;
                    };
                    this.GetLetterFromRun = function ()
                    {
                        let oCurrentLetter = this.strCurrentRun[this.nRunCounter];

                        this.AddNRunCounter();
                        return oCurrentLetter;
                    };
                    this.Next = function ()
                    {
                        if (this.IsHasContentInRun())
                        {
                            this.nCurrentLength++;
                            return this.GetLetterFromRun();
                        }
                        else
                        {
                            this.InitNewRun();
                            this.nCurrentLength++;
                            return this.GetLetterFromRun();
                        }
                    };
                    this.IsContinue = function ()
                    {
                        return this.IsHasContentInRun() || this.IsHasContent();
                    };

                    this.InitNewRun();
                }
                function RangeIterator (oIterator)
                {
                    this.iterator = oIterator;
                    this.str = oIterator.GetText();
                    this.nLength = this.str.length;
                    this.nCurrentLength = 0;

                    this.IsContinue = function ()
                    {
                        return this.nCurrentLength < this.nLength;
                    }
                    this.Next = function ()
                    {
                        this.nCurrentLength++;
                        return this.str[this.nCurrentLength - 1];
                    }
                }
                function RunsSaver()
                {
                    this.arrFields = [];

                    this.Put = function (oRange)
                    {
                        this.arrFields.push(oRange)
                    };
                    this.Get = function ()
                    {
                        return this.arrFields;
                    }
                    this.Reset = function ()
                    {
                        this.arrFields = [];
                    }
                }
                function CheckToken (strToken)
                {
                    this.token = strToken;
                    this.nPos = 0;
                    this.nStartPos = null;
                    this.nEndPos = null;
                    this.isParagraph = undefined;

                    this.SetIsParagraph = function (isParagraph)
                    {
                        this.isParagraph = isParagraph;
                        return this;
                    }
                    this.Reset = function (isBoll)
                    {
                        this.nPos = 0;
                        this.nStartPos = null;
                        this.nEndPos = null;
                        return isBoll;
                    };
                    this.Put = function (oWord, oElement, oClose)
                    {
                        if (this.token[this.nPos] === oWord)
                        {
                            if (this.nStartPos === null && oClose)
                                this.nStartPos = oElement.nCurrentLength - 1;

                            this.nPos++;

                            // for tokens with length === 1
                            if (this.nPos === this.token.length)
                            {
                                if (!oClose)
                                    return true;
                                else if (this.Find(oElement, oClose))
                                    return true;
                            }

                            // for other length tokens
                            while (oElement.IsContinue())
                            {
                                let oCurrentLetter = oElement.Next();

                                if (this.token[this.nPos] === oCurrentLetter)
                                {
                                    this.nPos++;

                                    if (this.nPos === this.token.length && oClose)
                                    {
                                        if (this.Find(oElement, oClose))
                                            return true;
                                    }
                                    else if (this.nPos === this.token.length)
                                    {
                                        return true;
                                    }
                                }
                            }
                        }
                    };
                    this.Find = function (oElement, oClose)
                    {
                        while (oElement.IsContinue())
                        {
                            let oCurrentLetter = oElement.Next();

                            if (oClose.Put(oCurrentLetter, oElement))
                            {
                                if (this.nEndPos === null)
                                    this.nEndPos = oElement.nCurrentLength - 1;

                                if (this.isParagraph)
                                {
                                    oFuncForParagraphSave(this.nStartPos, this.nEndPos, oElement);
                                }
                                else
                                {
                                    oFuncForRangeSave(this.nStartPos, this.nEndPos, oElement);
                                }
                                return true;
                            }
                        }
                        return false;
                    };
                }
                function TransliterateStr(word)
                {
                    let strOutput = "";

                    let oConvert = {
                        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
                        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
                        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
                        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
                        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
                        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
                        'э': 'e',    'ю': 'yu',   'я': 'ya',

                        'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
                        'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
                        'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
                        'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
                        'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
                        'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
                        'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
                    };

                    for (let nCount = 0; nCount < word.length; ++nCount)
                    {
                        if (oConvert[word[nCount]] === undefined)
                            strOutput += word[nCount];
                        else
                            strOutput += oConvert[word[nCount]];
                    }

                    return strOutput;
                }
                function DelFromStrStartAndEndTokens (strToProceed)
                {
                    let nLengthOfStartToken = strOpenToken.length;
                    let nLengthOfCloseToken = strCloseToken.length;

                    return strToProceed.slice(nLengthOfStartToken, nLengthOfCloseToken * -1);
                }

                function ProceedContent (oContent)
                {
                    if (undefined === oContent)
                        oContent = Api.GetDocument();

                    let oSelected = oContent.GetRangeBySelect();

                    if (oSelected)
                    {
                        ProceedRange(oSelected);
                    }
                    else
                    {
                        let arrDocContent = oContent.GetAllParagraphs();
                        for (let nCounter = 0; nCounter < arrDocContent.length; nCounter++)
                        {
                            let oCurrentElement = arrDocContent[nCounter];
                            ProceedParagraph(oCurrentElement);
                        }
                    }
                }
                function ProceedParagraph(oCurrentParagraph)
                {
                    let arrOpenStr      = oCurrentParagraph.Search(strOpenToken);
                    let arrCloseStr     = oCurrentParagraph.Search(strCloseToken);
                    let isOpen          = arrOpenStr.length > 0;
                    let isClose         = arrCloseStr.length > 0;
                    let isConvert       = isClose && isOpen && arrCloseStr.length === arrOpenStr.length;

                    if (!isConvert)
                        return;

                    let oElement = new ParagraphIterator(oCurrentParagraph);

                    oOpenCheck.SetIsParagraph(true);

                    while(oElement.IsContinue())
                    {
                        let oCurrentLetter = oElement.Next();
                        let isConvert = oOpenCheck.Put(
                            oCurrentLetter,
                            oElement,
                            oCloseCheck
                        );

                        if (isConvert)
                        {
                            oOpenCheck.Reset();
                            oCloseCheck.Reset();
                        }
                    }

                    let arrRanges = oSaver.Get().reverse();

                    if (arrRanges.length > 0)
                    {
                        CreateFields(arrRanges);
                        oSaver.Reset();
                    }
                }
                function ProceedRange(oSelected)
                {
                    let oRangeIterator = new RangeIterator(oSelected);

                    while (oRangeIterator.IsContinue())
                    {
                        let oCurrentLetter = oRangeIterator.Next();

                        let isConvert = oOpenCheck.Put(
                            oCurrentLetter,
                            oRangeIterator,
                            oCloseCheck
                        );

                        if (isConvert)
                        {
                            oOpenCheck.Reset();
                            oCloseCheck.Reset();
                        }
                    }

                    let oTemp = oSaver.Get().reverse();
                    if (oTemp.length > 0)
                    {
                        CreateFields(oTemp);
                        oSaver.Reset();
                    }
                }
                function CreateFields(arrContent)
                {
                    for (let i = arrContent.length - 1; i >= 0; i--)
                    {
                        let oRange = arrContent[i];
                        let oContent = Api.GetDocument();

                        oRange.Select();

                        let strTempText         = oRange.GetText();
                        let strText             = DelFromStrStartAndEndTokens(strTempText)
                        let strWithoutSpaces    = strText.split(' ').join('');
                        let strTranslated       = TransliterateStr(strWithoutSpaces);

                        let oForm = oContent.InsertTextForm({placeholderFromSelection: false, keepSelectedTextInForm: false});

                        oForm.SetPlaceholderText(strText);
                        oForm.SetFormKey(strTranslated);
                    }
                }

                return ProceedContent();

            }, false);
        };
    };

    window.Asc.plugin.button = function (id)
    {
        if (-1 === id)
        {
            this.executeCommand("close", "", undefined);
        }
    };

})(window, undefined);

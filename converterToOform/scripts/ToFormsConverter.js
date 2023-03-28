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

            if (strOpenToken === "" || strCloseToken === "")
                return;

            Asc.scope.strOpenToken  = strOpenToken;
            Asc.scope.strCloseToken = strCloseToken;

            context.callCommand(function()
            {
                function ParagraphIterator(oParagraph)
                {
                    this.Paragraph              = oParagraph;
                    this.strTextOfParagraph     = this.Paragraph.GetText();
                    this.nCountOfRun            = this.Paragraph.GetElementsCount() - 1;

                    this.nCounter               = 0;
                    this.nRunCounter            = 0;

                    this.CurrentRun             = null;
                    this.oCurrentStyle          = null;
                    this.strCurrentRun          = "";
                    this.nCurrentRunLength      = 0;

                    this.InitNewRun = function ()
                    {
                        this.CurrentRun         = this.Paragraph.GetElement(this.nCounter);
                        this.strCurrentRun      = this.CurrentRun.GetRange().GetText();
                        this.oCurrentStyle      = this.CurrentRun.GetTextPr();
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
                        return this.CurrentRun && this.nRunCounter < this.nCurrentRunLength;
                    };
                    this.IsHasContent = function ()
                    {
                        return this.nCounter + 1 <= this.nCountOfRun;
                    };
                    this.AddNCounter = function ()
                    {
                        this.nCounter++;
                    };
                    this.GetNCounter = function ()
                    {
                        return this.nCounter - 1;
                    }
                    this.AddNRunCounter = function ()
                    {
                        this.nRunCounter++;
                    };
                    this.GetLetterFromRun = function ()
                    {
                        let oCurrentLetter = {
                            str: this.strCurrentRun[this.nRunCounter],
                            style: this.oCurrentStyle
                        };

                        this.AddNRunCounter();
                        return oCurrentLetter;
                    };
                    this.Next = function ()
                    {
                        if (this.IsHasContentInRun())
                        {
                            return this.GetLetterFromRun();
                        }
                        else
                        {
                            this.InitNewRun();
                            return this.GetLetterFromRun();
                        }
                    };
                    this.IsContinue = function ()
                    {
                        return this.IsHasContentInRun() || this.IsHasContent();
                    };

                    this.InitNewRun();
                }
                function Word(nPos, oStyle)
                {
                    this.nPos = nPos;
                    this.data = [];
                    this.type = 0;
                    this.style = oStyle;

                    this.Put = function (str)
                    {
                        this.data.push(str);
                    };

                    this.SetStyle = function (oStyle)
                    {
                        if (this.style === undefined)
                            this.style = oStyle;
                    };

                    this.DeleteStartAndEndTokens = function (strStart, strEnd)
                    {
                        for (let i = 0; i < strStart.length; i++)
                        {
                            this.data[i] = '';
                        }

                        let nLength = this.data.length - 1;
                        for (let i = 0; i < strEnd.length; i++)
                        {
                            this.data[nLength - i] = '';
                        }
                    };
                }
                function RunsSaver()
                {
                    this.runs = [];

                    this.Put = function (oWord, nCount, isNewWord)
                    {
                        let strWord     = oWord.str;
                        let oStyleWord  = oWord.style;

                        if (this.runs.length === 0)
                        {
                            this.runs.push(new Word(nCount, oStyleWord));
                            this.Put(oWord, nCount);
                        }
                        else
                        {
                            if (isNewWord)
                            {
                                this.runs.push(new RunsSaver());
                                let oLast = this.GetLast();
                                oLast.Put(oWord, nCount);
                            }
                            else if (this.runs.length > 0 && this.GetLast().type !== 1)
                            {
                                let oLast = this.GetLast();
                                oLast.Put(strWord);
                                oLast.SetStyle(oStyleWord);
                            }
                            else
                            {
                                this.runs.push(new Word(nCount, oStyleWord));
                                this.Put(oWord, nCount);
                            }
                        }
                    };
                    this.GetLast = function ()
                    {
                        let nRunArrLength   = this.runs.length;
                        let oLastWord       = this.runs[nRunArrLength - 1];

                        if (oLastWord instanceof RunsSaver && oLastWord.runs.length > 0)
                            return oLastWord.GetLast();

                        return oLastWord;
                    };
                    this.SetStyle = function (oStyle)
                    {
                        let oLast = this.GetLast();
                        oLast.SetStyle(oStyle)
                    };
                }
                function CheckToken (strToken)
                {
                    this.token = strToken;
                    this.nPos = 0;

                    this.Reset = function (isBoll)
                    {
                        this.nPos = 0;
                        return isBoll;
                    };
                    this.Put = function (oSaver, oWord, oElement, oClose)
                    {
                        let strWord     = oWord.str;

                        if (this.token[this.nPos] === strWord)
                        {
                            this.nPos++;
                            oSaver.Put(oWord, oElement.GetNCounter(), oClose !== undefined);

                            // if token is length === 1 for example: { or /
                            if (this.nPos === this.token.length)
                            {
                                if (oClose)
                                {
                                   let isFind = this.find(oSaver, oElement, oClose);
                                   if (isFind)
                                    {
                                        return this.Reset(true);
                                    }
                                }
                                else
                                    return this.Reset(true);
                            }

                            while (oElement.IsContinue())
                            {
                                let oCurrentLetter = oElement.Next();
                                oSaver.Put(oCurrentLetter, oElement.GetNCounter());

                                if (this.token[this.nPos] === oCurrentLetter.str)
                                {
                                    this.nPos++;

                                    if (this.nPos === this.token.length)
                                    {
                                        if (oClose)
                                        {
                                            let isFind = this.find(oSaver, oElement, oClose);
                                            if (isFind)
                                                return  this.Reset(true);
                                        }
                                        else if (oClose === undefined)
                                        {
                                            return this.Reset(true);
                                        }
                                    }
                                }
                            }
                        }
                    };
                    this.find = function (oSaver, oElement, oClose)
                    {
                        while (oElement.IsContinue())
                        {
                            let oCurrentLetter = oElement.Next();

                            if (oClose.Put(oSaver, oCurrentLetter, oElement))
                            {
                                let oLast = oSaver.GetLast();
                                oLast.type = 1;
                                return true;
                            }

                            oSaver.Put(oCurrentLetter, oElement.GetNCounter());
                        }
                        return false;
                    };
                }
                function ProceedContent (oContent, strOpen, strClose)
                {
                    if (undefined === oContent)
                        oContent = Api.GetDocument();

                    let oSelected = oContent.GetRangeBySelect();

                    let arrDocContent = oSelected !== null
                        ? oSelected.GetAllParagraphs()
                        : oContent.GetAllParagraphs();

                    for (let nCounter = 0; nCounter < arrDocContent.length; nCounter++)
                    {
                        let oCurrentElement = arrDocContent[nCounter];

                        ProceedParagraph(
                            oCurrentElement,
                            strOpen,
                            strClose
                        );
                    }
                }
                function ProceedParagraph(oCurrentParagraph, strOpen, strClose)
                {
                    let arrOpenStr      = oCurrentParagraph.Search(strOpen);
                    let arrCloseStr     = oCurrentParagraph.Search(strClose);
                    let isOpen          = arrOpenStr.length > 0;
                    let isClose         = arrCloseStr.length > 0;
                    let isConvert       = isClose && isOpen && arrCloseStr.length === arrOpenStr.length;

                    if (!isConvert)
                        return;

                    let oElement    = new ParagraphIterator(oCurrentParagraph);
                    let oSaver      = new RunsSaver();

                    let oOpenCheck  = new CheckToken(strOpen);
                    let oCloseCheck = new CheckToken(strClose);

                    while(oElement.IsContinue())
                    {
                        let oCurrentLetter = oElement.Next();

                        let op = oOpenCheck.Put(
                            oSaver,
                            oCurrentLetter,
                            oElement,
                            oCloseCheck
                        );

                        if (!op)
                            oSaver.Put(oCurrentLetter, oElement.GetNCounter());
                    }

                    CreateNewContentForParagraph(
                        oCurrentParagraph,
                        oSaver.runs,
                        strOpen,
                        strClose
                    );
                }
                function CreateNewContentForParagraph (oCurrentElement, arrContent, strOpen, strClose)
                {
                    oCurrentElement.RemoveAllElements();

                    for (let i = 0; i < arrContent.length; i++)
                    {
                        let oWord = arrContent[i];

                        if (oWord instanceof Word)
                        {
                            if (oWord.type === 1)
                            {
                                CreateFormField(oCurrentElement, oWord, strOpen, strClose);
                            }
                            else
                            {
                                CreateRun(oCurrentElement, oWord)
                            }
                        }
                        else if (oWord instanceof RunsSaver)
                        {
                            let runs = oWord.runs;
                            for (let i = 0; i < runs.length; i++)
                            {
                                let oRun = runs[i];

                                if (oRun.type === 1)
                                {
                                    CreateFormField(oCurrentElement, oRun, strOpen, strClose);
                                }
                                else
                                {
                                    CreateRun(oCurrentElement, oRun);
                                }
                            }
                        }
                    }
                }
                function CreateFormField (oCurrentElement, oData, strStart, strEnd)
                {
                    let oStyle              = oData.style;
                    let oTextForm           = Api.CreateTextForm();

                    oData.DeleteStartAndEndTokens(strStart, strEnd);

                    let strContent          = oData.data.join('');
                    let strWithoutSpaces    = strContent.split(' ').join('');
                    let strTranslated       = TransliterateStr(strWithoutSpaces);

                    oTextForm.SetPlaceholderText(strContent);
                    oTextForm.SetFormKey(strTranslated);
                    oTextForm.OnChangeTextPr(oStyle);
                    oCurrentElement.AddElement(oTextForm);
                }
                function CreateRun (oCurrentElement, oWord)
                {
                    let oCurrentStr = oWord.data.join('');
                    let oStyle = oWord.style;

                    let oRun = Api.CreateRun();
                    oRun.AddText(oCurrentStr);
                    oRun.SetTextPr(oStyle);

                    oCurrentElement.AddElement(oRun);
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
                        if (oConvert[word[nCount]] == undefined)
                            strOutput += word[nCount];
                        else
                            strOutput += oConvert[word[nCount]];
                    }

                    return strOutput;
                }

                ProceedContent(
                    undefined,
                    Asc.scope.strOpenToken,
                    Asc.scope.strCloseToken
                );

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

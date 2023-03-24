/**
 *
 * (c) Copyright Ascensio System SIA 2020
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *	 http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (window, undefined) {
    const version = '0.1.3';
    let loader;
    let isDarkTheme = false;
    let elements = {};
    let apiKey = null;
    let errTimeout = null;
    let modalTimeout = null;
    let maxChars = 1000;
    let startQuery;
    const editImage = {};
    let currentAction = "create";
    const isIE = checkInternetExplorer();

    const arrAllowedSize = [{id: '256x256', text: '256x256', width: 256, height: 256},
                            {id: '512x512', text: '512x512', width: 512, height: 512},
                            {id: '1024x1024', text: '1024x1024', width: 1024, height: 1024}];

    const arrActions = [{id: 'create', text: 'Generate image from text'},
                        {id: 'edit', text: 'Change image'},
                        {id: 'vars', text: 'Generate image variations'}];

    window.Asc.plugin.init = function() {
        if (isIE) {
            document.getElementById('div_ie_error').classList.remove('hidden');
            return;
        }

        apiKey = localStorage.getItem('OpenAiApiKey') || null;

        addSlidersListeners();
        addTitlelisteners();
        initElements();
        initScrolls();

        checkDocumentSelectionType();

        if (apiKey) {
            elements.divContent.classList.remove('hidden');
        } else {
            elements.divConfig.classList.remove('hidden');
        }

        // elements.textArea.value = startQuery;
        elements.inpTopSl.oninput = onSlInput;

        elements.btnSaveConfig.onclick = function() {
            elements.apiKeyField.classList.remove('error_border');
            elements.textArea.classList.remove('error_border');
            document.getElementById('apiKeyError').classList.add('hidden');
            document.getElementById('lb_key_err').innerHTML = '';
            document.getElementById('lb_key_err_mes').innerHTML = '';
            elements.divConfig.classList.add('hidden');
            apiKey = elements.apiKeyField.value.trim();
            localStorage.setItem('OpenAiApiKey', apiKey);

            elements.divContent.classList.remove('hidden');
        };

        elements.reconfigure.onclick = function() {
            if (errTimeout) {
                clearTimeout(errTimeout);
                errTimeout = null;
                clearMainError();
            }
            localStorage.removeItem('OpenAiApiKey');
            elements.apiKeyField.value = apiKey;
            apiKey = '';
            elements.divContent.classList.add('hidden');
            elements.divConfig.classList.remove('hidden');
        };

        elements.btnClear.onclick = function() {
            elements.textArea.value = '';
            elements.textArea.focus();

            $("#idx-preview").empty();
        };

        elements.textArea.oninput = function(event) {
            elements.textArea.classList.remove('error_border');

            elements.lbTokens.innerText = event.target.value.trim().length;
            checkLen();
        };

        elements.divTokens.onmouseenter = function() {
            elements.modal.classList.remove('hidden');
            if (modalTimeout) {
                clearTimeout(modalTimeout);
                modalTimeout = null;
            }
        };

        elements.divTokens.onmouseleave = function() {
            modalTimeout = setTimeout(function() {
                elements.modal.classList.add('hidden');
            },100)
        };

        elements.modal.onmouseenter = function() {
            if (modalTimeout) {
                clearTimeout(modalTimeout);
                modalTimeout = null;
            }
        };

        elements.modal.onmouseleave = function() {
            elements.modal.classList.add('hidden');
        };

        elements.labelMore.onclick = function() {
            elements.linkMore.click();
        };

        elements.btnShowSettins.onclick = function() {
            elements.divParams.classList.toggle('hidden');
            elements.arrow.classList.toggle('arrow_down');
            elements.arrow.classList.toggle('arrow_up');
        };

        async function requestVariations() {
            if ( !editImage.src )
                return;

            const s = utils.getSettingsImageSize();

            const res = await utils.imageToBlob(editImage.src);
            const formdata = new FormData();
            formdata.append('image', res.blob);
            formdata.append('size', `${s.width}x${s.height}`);
            formdata.append('n', Number.parseInt(elements.inpTopSl.value));
            formdata.append('response_format', "b64_json");

            makeRequest('vars', formdata);
        }

        function requestImageGeneration() {
            if ( !elements.textArea.value.length )
                return;

            const size = utils.getSettingsImageSize();
            const settings = {
                prompt: elements.textArea.value,
                size: `${size.width}x${size.height}`,
                n: Number.parseInt(elements.inpTopSl.value),
                response_format: "b64_json",
            };

            makeRequest('create', JSON.stringify(settings));
        }

        async function requestImageMerge() {
            if ( !editImage.src )
                return;

            const s = utils.getSettingsImageSize();

            const ressrc = await utils.imageToBlob(editImage.src);
            const resmask = await utils.imageToBlob(document.getElementById('idx-img-mask'));

            const formdata = new FormData();
            formdata.append('image', ressrc.blob);
            formdata.append('mask', resmask.blob);
            formdata.append('size', `${s.width}x${s.height}`);
            formdata.append('n', Number.parseInt(elements.inpTopSl.value));
            formdata.append('response_format', "b64_json");

            makeRequest('var', formdata);
        }

        elements.btnSubmit.onclick = function() {
            createLoader();

            switch ( currentAction ) {
            case 'create': requestImageGeneration(); break;
            case 'edit': requestImageMerge(); break;
            case 'vars': requestVariations(); break;
            default: break;
            }
        }
    };

    function getDocumentSeletedText () {
        return new Promise(resolve => {
            switch (window.Asc.plugin.info.editorType) {
                case 'word':
                case 'slide': {
                    window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                        resolve(data.replace(/\r/g, ' '));
                    });
                    break;
                }
                case 'cell':
                    window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                        // if (data == '')
                            // startQuery = startQuery.replace(/\r/g, ' ').replace(/\t/g, '\n');
                        // else
                            resolve(startQuery = data.replace(/\r/g, ' '));
                    });
                    break;
                default: resolve(undefined);
            }
        });
    }

    function queryDocumentSelectedText () {
        const _setStartQueryText = function(text) {
            document.getElementById('textarea').value = text;
            document.getElementById('lb_tokens').innerText = text.trim().length;

            checkLen();
        }

        switch (window.Asc.plugin.info.editorType) {
            case 'word':
            case 'slide': {
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                    _setStartQueryText(data.replace(/\r/g, ' '));
                });
                break;
            }
            case 'cell':
                window.Asc.plugin.executeMethod("GetSelectedText", [{Numbering:false, Math: false, TableCellSeparator: '\n', ParaSeparator: '\n'}], function(data) {
                    // if (data == '')
                        // startQuery = startQuery.replace(/\r/g, ' ').replace(/\t/g, '\n');
                    // else
                        _setStartQueryText(startQuery = data.replace(/\r/g, ' '));
                });
                break;
        }

    };

    function checkDocumentSelectionType() {
        window.Asc.plugin.executeMethod ("GetSelectionType", [], function(sType) {
            switch (sType) {
                case "none": break;
                case "drawing":
                    $('#idx-cmb-action').val('vars').trigger('change');
                    break;
                case "text":
                    queryDocumentSelectedText();
                    break;
            }
        });
    }

    function initElements() {
        $('#idx_imgsize').select2({
            data: arrAllowedSize,
            minimumResultsForSearch: Infinity
        });

        $('#idx-cmb-action').select2({
            data: arrActions,
            minimumResultsForSearch: Infinity
        }).on('change', onActionChanged).trigger('change');

        elements.inpTopSl       = document.getElementById('inp_top_sl');
        elements.textArea       = document.getElementById('textarea');
        elements.btnSubmit      = document.getElementById('btn_submit');
        elements.btnClear       = document.getElementById('btn_clear');
        elements.btnSaveConfig  = document.getElementById('btn_saveConfig');
        elements.apiKeyField    = document.getElementById('apiKeyField');
        elements.divContent     = document.getElementById('div_content');
        elements.divConfig      = document.getElementById('div_config');
        elements.reconfigure    = document.getElementById('logoutLink');
        elements.mainError      = document.getElementById('div_err');
        elements.mainErrorLb    = document.getElementById('lb_err');
        elements.keyError       = document.getElementById('apiKeyError');
        elements.keyErrorLb     = document.getElementById('lb_key_err');
        elements.keyErrorMes    = document.getElementById('lb_key_err_mes');
        elements.lbTokens       = document.getElementById('lb_tokens');
        elements.divTokens      = document.getElementById('div_tokens');
        elements.modal          = document.getElementById('div_modal');
        elements.modalErrLen    = document.getElementById('modal_err_len');
        elements.modalError     = document.getElementById('modal_error');
        elements.modalLink      = document.getElementById('modal_link');
        elements.labelMore      = document.getElementById('lb_more');
        elements.linkMore       = document.getElementById('link_more');
        elements.btnShowSettins = document.getElementById('div_show_settings');
        elements.divParams      = document.getElementById('div_parametrs');
        elements.arrow          = document.getElementById('arrow');

        // document.getElementById('idx-input-mask').addEventListener('change', e => {
        $('#idx-input-mask').on('change', e => {
            const URL = window.webkitURL || window.URL;
            const url = URL.createObjectURL(e.target.files[0]);

            setSourceImage('idx-img-mask', url);
        });
    };

    const onActionChanged = e => {
        currentAction = e.target.value;
        document.body.classList.remove('plugin-action__create', 'plugin-action__edit', 'plugin-action__vars');
        document.body.classList.add(`plugin-action__${currentAction}`);

        if ( currentAction == "vars" || currentAction == "edit" ) {
            if ( !editImage.src ) {
                updateSourceImage();
            }
        }
    };

    function initScrolls() {
        PsMain = new PerfectScrollbar('#div_content', {});
        PsConf = new PerfectScrollbar('#div_config', {});
    };

    function addSlidersListeners() {
        const rangeInputs = document.querySelectorAll('input[type="range"]');

        function handleInputChange(e) {
            let target = e.target;
            if (e.target.type !== 'range') {
                target = document.getElementById('range');
            }
            const min = target.min;
            const max = target.max;
            const val = target.value;

            target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
        };

        rangeInputs.forEach(function(input) {
            input.addEventListener('input', handleInputChange);
        });
    };

    function addTitlelisteners() {
        let divs = document.querySelectorAll('.div_parametr');
        divs.forEach(function(div) {
            div.addEventListener('mouseenter', function handleClick(event) {
                event.target.children[0].classList.remove('hidden');
            });

            div.addEventListener('mouseleave', function handleClick(event) {
                event.target.children[0].classList.add('hidden');
            });
        });
    };

    function onSlInput(e) {
        e.target.nextElementSibling.innerText = e.target.value;
    };

    function createLoader() {
        $('#loader-container').removeClass( "hidden" );
        loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
        loader = showLoader($('#loader-container')[0], getMessage('Loading...'));
    };

    function destroyLoader() {
        $('#loader-container').addClass( "hidden" )
        loader && (loader.remove ? loader.remove() : $('#loader-container')[0].removeChild(loader));
        loader = undefined;
    };

    function clearMainError() {
        elements.mainError.classList.add('hidden');
        elements.mainErrorLb.innerHTML = '';
    };

    function getMessage(key) {
        return window.Asc.plugin.tr(key);
    };

    function updateScroll() {
        PsMain && PsMain.update();
        PsConf && PsConf.update();
    };

    function checkInternetExplorer() {
        let rv = -1;
        if (window.navigator.appName == 'Microsoft Internet Explorer') {
            const ua = window.navigator.userAgent;
            const re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        } else if (window.navigator.appName == 'Netscape') {
            const ua = window.navigator.userAgent;
            const re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');

            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv !== -1;
    };

    function checkLen() {
        let cur = Number.parseInt(elements.lbTokens.innerText);
        if (cur > maxChars) {
            elements.modalError.classList.remove('hidden');
            elements.modalLink.classList.remove('hidden');
            elements.lbTokens.parentNode.classList.add('lb_err');
        } else {
            elements.modalError.classList.add('hidden');
            elements.modalLink.classList.add('hidden');
            elements.lbTokens.parentNode.classList.remove('lb_err');
        }
    };

    function updateSourceImage() {
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if ( oResult ) {
                const img = document.getElementById('idx-img-src');
                if ( img ) {
                    if ( !editImage.src ) {
                        const image = new Image();
                        image.onload = () => {
                            editImage.size = {width: image.width, height: image.height};
                            $('#idx_imgsize').val(utils.normalizeImageSize(editImage.size).str).trigger('change');
                        };
                        image.src = oResult.src;
                    }

                    editImage.src = oResult.src;

                    img.src = oResult.src;
                    const label = img.previousElementSibling;
                    if ( !label.classList.contains('src-full') )
                        label.classList.add('src-full');
                }
            }
        });
    }

    function setSourceImage(id, imgdata) {
        const img = document.getElementById(id);
        if ( img ) {
            img.src = imgdata;
            const label = img.previousElementSibling;
            if ( !label.classList.contains('src-full') )
                label.classList.add('src-full');
        }
    }

    const insert_image_to_doc = info => {
        let sImageSrc = /^data\:image\/png\;base64/.test(info.base64img) ? info.base64img : `data:image/png;base64,${info.base64img}`;
        let oImageData = {
            "src": sImageSrc,
            "width": info.size.width,
            "height": info.size.height
        };

        window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
    }

    function makeRequest(action, config, callback) {
        let url_, headers_ = {
            'Authorization': 'Bearer ' + apiKey,
        };

        switch (action) {
        case 'create':
            url_ = 'https://api.openai.com/v1/images/generations';
            headers_['Content-Type'] = 'application/json';
            break;
        case 'edit':
            url_ = 'https://api.openai.com/v1/images/edits';
            break;
        case 'vars':
            url_ = 'https://api.openai.com/v1/images/variations';
            break;
        default: return;
        }

        fetch(url_, {
            method: 'POST',
            headers: headers_,
            body: config,
        }).then(function(response) {
            return response.json()
        }).then(function(obj) {
            console.log('answer data', obj.data);
            if ( obj.data && typeof obj.data == 'object' &&
                    /*settings.response_format == 'b64_json' &&*/ obj.data["0"].b64_json )
            {
                if ( callback ) callback(obj);
                else parse_reply_images(obj);
            }
        }).catch(function(error) {
            if ( callback )
                callback('error');
            else {
                elements.mainError.classList.remove('hidden');
                elements.mainErrorLb.innerHTML = error.message;
                if (errTimeout) {
                    clearTimeout(errTimeout);
                    errTimeout = null;
                }
                errTimeout = setTimeout(clearMainError, 10000);
            }
        }).finally(function(){
            destroyLoader();
        });
    }

    const parse_reply_images = info => {
        if ( info.data && typeof info.data == 'object' ) {
            let cnt = document.getElementById("idx-preview");
            cnt.addEventListener('dblclick', e => {
                if ( !!e.target.dataset && !!info.data[e.target.dataset.index] ) {
                    insert_image_to_doc({
                        base64img: info.data[e.target.dataset.index].b64_json,
                        size: editImage.size
                    });
                }
            });

            let box = document.getElementById("idx-boxpreview");
            box.innerHTML = "";
            for (let i in info.data) {
                const img = document.createElement('img');
                img.src = `data:image/png;base64, ${utils.imageDataFromRequest(info.data[i])}`;
                img.classList.add('gen-img-preview');
                img.setAttribute('data-index', i);
                box.appendChild(img);
            }
        }
    }



    const utils = new (function() {
        return {
            imageDataFromRequest: function(data) {
                return data.b64_json ? data.b64_json : data
            },

            getSettingsImageSize: function() {
                const _size_val = $('#idx_imgsize').val();
                return arrAllowedSize.find(m => m.id == _size_val);
            },

            normalizeImageSize: function(size) {
                let width = 0, height = 0;
                if ( size.width > 750 || size.height > 750 )
                    width = height = 1024;
                else if ( size.width > 375 || size.height > 350 )
                    width = height = 512;
                else width = height = 256;

                return {width: width, height: height, str: `${width}x${height}`}
            },

            imageToBlob: function(srcimage, size) {
                return new Promise(resolve => {
                    const image = new Image();
                    image.onload = () => {
                        const img_size = {width: image.width, height: image.height};
                        const canvas_size = size ? size : utils.normalizeImageSize(img_size);
                        const draw_size = canvas_size.width > image.width ? img_size : canvas_size;

                        let canvas = document.createElement('canvas');
                        canvas.width = canvas_size.width;
                        canvas.height = canvas_size.height;

                        canvas.getContext('2d').drawImage(image, 0, 0, draw_size.width, draw_size.height*image.height/image.width);
                        canvas.toBlob(blob => resolve({blob: blob, size: img_size}), 'image/png');
                    };
                    image.src = srcimage;
                });
            }
        }

    });

    window.Asc.plugin.onTranslate = function() {
        let elements = document.querySelectorAll('.i18n');

        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];
            element.innerText = getMessage(element.innerText);
        }
    };

    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);
        if (isIE) return;

        let rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        let sliderBG, thumbBG
        if (theme.type.indexOf('dark')) {
            isDarkTheme = true;
            sliderBG = theme.Border || '#757575';
            // for dark '#757575';
            // for contrast dark #616161
            thumbBG = '#fcfcfc';
        } else {
            isDarkTheme = false;
            sliderBG = '#ccc';
            thumbBG = '#444';
        }
        rule += '\n input[type="range"] { background-color: '+sliderBG+' !important; background-image: linear-gradient('+thumbBG+', '+thumbBG+') !important; }';
        rule += '\n input[type="range"]::-webkit-slider-thumb { background: '+thumbBG+' !important; }';
        rule += '\n input[type="range"]::-moz-range-thumb { background: '+thumbBG+' !important; }';
        rule += '\n input[type="range"]::-ms-thumb { background: '+thumbBG+' !important; }';
        rule += "\n .arrow { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";

        let styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
    };

    window.onresize = function() {
        updateScroll();
    };

    window.Asc.plugin.button = function(id) {
        window.Asc.plugin.executeCommand("close", "");
    };

    window.Asc.plugin.event_onClick = function(isSelection) {
        if ( /*!editImage &&*/ isSelection && (currentAction == "edit" || currentAction == "vars") )
            updateSourceImage();
    }

    window.Asc.plugin.event_onContextMenuShow = function(options) {
        let items_ = [];
        if ( options.type == 'Image' ) {
            items_.push({
                id: 'genone',
                text: "Generate another one",
            }, {
                id: 'gensome',
                text: 'Generate variations',
            });
        } else
        if ( options.type == 'Selection' ) {
            items_.push({
                id: 'createone',
                text: "Generate from text",
            }, {
                id: 'createsome',
                text: 'Generate variations',
            });
        }

        if ( items_.length )
            this.executeMethod("AddContextMenuItem", [{
                guid : this.guid,
                items : [
                    {
                        id: "onClickItem1",
                        text: "DALL-E",
                        items: items_
                    }
                ]
            }]);
    };

    window.Asc.plugin.attachContextMenuClickEvent("genone", function(){
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if ( oResult ) {
                utils.imageToBlob(oResult.src).then(
                    result => {
                        const request_image_size = utils.normalizeImageSize(result.size);
                        const formdata = new FormData();
                        formdata.append('image', result.blob);
                        formdata.append('size', request_image_size.str);
                        formdata.append('n', 1);
                        formdata.append('response_format', "b64_json");

                        makeRequest('vars', formdata, a => {
                            if ( a != 'error' ) {
                                insert_image_to_doc({
                                    base64img: utils.imageDataFromRequest(a.data[0]),
                                    size: result.size
                                });
                            }
                        });
                    }
                );
            }
        });

        // window.Asc.plugin.executeMethod("InputText", ["clicked: onClickItem1Sub1"]);
    }.bind(this));

    window.Asc.plugin.attachContextMenuClickEvent("gensome", function(){
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if ( oResult ) {
                createLoader();

                $('#idx-cmb-action').val('vars').trigger('change');

                const img_count = 5;
                const size = '512x512';
                $('#inp_top_sl').val(img_count).trigger('input');

                const image = new Image();
                image.onload = () => {
                    editImage.src = oResult.src;
                    editImage.size = {width: image.width, height: image.height};
                    $('#idx_imgsize').val(utils.normalizeImageSize(editImage.size).str).trigger('change');

                    const img = document.getElementById('idx-img-src');
                    img.src = oResult.src;
                    const label = img.previousElementSibling;
                    if ( !label.classList.contains('src-full') )
                        label.classList.add('src-full');

                    utils.imageToBlob(oResult.src).then(
                        result => {
                            const request_image_size = utils.normalizeImageSize(result.size);
                            const formdata = new FormData();
                            formdata.append('image', result.blob);
                            formdata.append('size', request_image_size.str);
                            formdata.append('n', img_count);
                            formdata.append('response_format', "b64_json");

                            makeRequest('vars', formdata, a => {
                                if ( a != 'error' ) {
                                    parse_reply_images(a);
                                }
                            });
                        });
                };
                image.src = oResult.src;
            }
        })
    });

    window.Asc.plugin.attachContextMenuClickEvent("createone", async function(){
        const text = await getDocumentSeletedText();
        if ( text !== undefined && text.length < 1000 ) {
            const size = {width: 512, height: 512};
            const settings = {
                prompt: text,
                size: `${size.width}x${size.height}`,
                n: 1,
                response_format: "b64_json",
            };

            makeRequest('create', JSON.stringify(settings), a => {
                if ( a != 'error' ) {
                    insert_image_to_doc({
                        base64img: utils.imageDataFromRequest(a.data[0]),
                        size: size
                    });
                }
            });
        }
    });

    window.Asc.plugin.attachContextMenuClickEvent("createsome", async function(){
        const text = await getDocumentSeletedText();
        if ( text !== undefined && text.length < 1000 ) {
            createLoader();

            $('#idx-cmb-action').val('create').trigger('change');
            $('#textarea').val(text);

            const img_count = 5;
            const size = '512x512';
            $('#inp_top_sl').val(img_count).trigger('input');
            $('#idx_imgsize').val(size).trigger('change');

            const settings = {
                prompt: text,
                size: size,
                n: img_count,
                response_format: "b64_json",
            };

            makeRequest('create', JSON.stringify(settings), a => {
                if ( a != 'error' ) {
                    parse_reply_images(a);
                }

                destroyLoader();
            });
        }
    });

})(window, undefined);

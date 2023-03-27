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
                        {id: 'replacebkg', text: 'Replace background'},
                        {id: 'rembkg', text: 'Remove background'},
                        {id: 'remtext', text: 'Remove the text from image'},
                        {id: 'incqual', text: 'Increase image resolution and quality'}];

    window.Asc.plugin.init = function() {
        if (isIE) {
            document.getElementById('div_ie_error').classList.remove('hidden');
            return;
        }

        apiKey = localStorage.getItem('ClipDropApiKey') || null;

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
            localStorage.setItem('ClipDropApiKey', apiKey);

            elements.divContent.classList.remove('hidden');
        };

        elements.reconfigure.onclick = function() {
            if (errTimeout) {
                clearTimeout(errTimeout);
                errTimeout = null;
                clearMainError();
            }
            localStorage.removeItem('ClipDropApiKey');
            elements.apiKeyField.value = apiKey;
            apiKey = '';
            elements.divContent.classList.add('hidden');
            elements.divConfig.classList.remove('hidden');
        };

        elements.btnClear.onclick = function() {
            elements.textArea.value = '';
            elements.textArea.focus();

            // document.getElementById("idx-preview");
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

        function requestRemoveImageBackground(action) {
            if ( !editImage.src )
                return;

            // const i = new Image;
            // i.onload = () => {
            //     console.log('inner image size', `${i.width}x${i.height}`)
            // }
            // i.src = editImage.src;

            const file = utils.base64ImageToFile(editImage.src, 'car.png');
            console.log('send file', file);

            const formdata = new FormData();
            formdata.append('image_file', file);

            makeRequest(action, formdata);
        }

        function requestImageGeneration() {
            if ( !elements.textArea.value.length )
                return;

            const formdata = new FormData();
            formdata.append('prompt', elements.textArea.value);

            makeRequest('create', formdata);
        }

        elements.btnSubmit.onclick = function() {
            createLoader();

            switch ( currentAction ) {
            case 'create':      requestImageGeneration(); break;
            case 'replacebkg': break;
            case 'rembkg':
            case 'remtext':     requestRemoveImageBackground(currentAction); break;
            case 'incqual': break;
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
                    $('#idx-cmb-action').val('rembkg').trigger('change');
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

        if ( currentAction ) {
            const all_actions = ['create', 'replacebkg', 'rembkg', 'remtext', 'incqual'];

            document.body.className = document.body.className.replace(/plugin-action__[\w]+/, '');
            document.body.classList.add(`plugin-action__${currentAction}`);

            if ( !(currentAction == 'create') ) {
                if ( !editImage.src ) {
                    updateSourceImage();
                }
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
                            // editImage.size = {width: image.width, height: image.height};
                            // $('#idx_imgsize').val(utils.normalizeImageSize(editImage.size).str).trigger('change');
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
        let sImageSrc = /^data\:image\/(?:png|jpeg)\;base64/.test(info.base64img) ? info.base64img : `data:${info.type};base64,${info.base64img}`;
        let oImageData = {
            "src": sImageSrc,
            "width": info.size.width,
            "height": info.size.height
        };

        window.Asc.plugin.executeMethod ("PutImageDataToSelection", [oImageData]);
    }

    function makeRequest(action, config, callback) {
        let url_, headers_ = {
            'x-api-key': apiKey,
        };

        switch (action) {
        case 'create':      url_ = 'https://clipdrop-api.co/text-to-image/v1'; break;
        case 'replacebkg':  url_ = 'https://clipdrop-api.co/replace-background/v1'; break;
        case 'rembkg':      url_ = 'https://clipdrop-api.co/remove-background/v1'; break;
        case 'remtext':     url_ = 'https://clipdrop-api.co/remove-text/v1'; break;
        case 'incqual':     url_ = 'https://clipdrop-api.co/super-resolution/v1'; break;
        default: return;
        }

        // destroyLoader();
        // return;

        fetch(url_, {
            method: 'POST',
            headers: headers_,
            body: config,
        }).then(function(response) {
            console.log('credits count', response.headers.get('x-remaining-credits'));
            if ( response.ok ) {
                response.headers.get('Content-type')
                return response.blob();
                // return response.arrayBuffer();
            } else return response.json()
        }).then(function(blob) {
            console.log('answer data', blob);
            const info = {data: {blob: blob}};
            if ( callback ) callback(info);
            else parse_reply_images(info);
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
            const blob_ = info.data.blob;
            const url_ = URL.createObjectURL(blob_);

            let img_size, img_base64data;
            const image_ = new Image;
            image_.onload = () => {
                img_size = {width: image_.width, height: image_.height};
            };
            image_.src = url_;

            const reader_ = new FileReader;
            reader_.onload = e => {
                img_base64data = e.target.result;
            }
            reader_.readAsDataURL(blob_);

            let box = document.getElementById("idx-boxpreview");
            box.innerHTML = "";

            const img = document.createElement('img');
            img.src = url_;
            img.classList.add('gen-img-preview');
            box.appendChild(img);

            img.addEventListener('dblclick', e => {
                insert_image_to_doc({
                    base64img: img_base64data,
                    size: img_size,
                    imgtype: blob_.type
                });
            });
        }
    }



    const utils = new (function() {
        return {
            normalizeImageSize: function(size) {
                let width = 0, height = 0;
                if ( size.width > 750 || size.height > 750 )
                    width = height = 1024;
                else if ( size.width > 375 || size.height > 350 )
                    width = height = 512;
                else width = height = 256;

                return {width: width, height: height, str: `${width}x${height}`}
            },

            imageToBlob: function(base64str, size) {
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
                    image.src = base64str;
                });
            },

            base64ImageToFile: function (base64str, filename = 'temp.png') {
                const re_ = /^data\:(image\/(?:png|jpeg))\;base64/;
                const mime = re_.exec(base64str)[1];

                const trimmed_string = base64str.replace('data:image/png;base64,', '');
                const image_content = atob(trimmed_string);
                const buffer = new ArrayBuffer(image_content.length);
                const view = new Uint8Array(buffer);

                for (let n = 0; n < image_content.length; n++) {
                    view[n] = image_content.charCodeAt(n);
                }

                switch ( mime ) {
                case 'image/png': !/.png$/.test(filename) && (filename += '.png'); break;
                case 'image/jpeg': !/.jpe?g$/.test(filename) && (filename += '.jpeg'); break;
                default: break;
                }

                const blob = new Blob([buffer], {type: mime});
                return new File([blob], filename, {type: mime});
            },

            blob_to_base64: function (blob) {
                return new Promise(resolve => {
                    const reader_ = new FileReader;
                    reader_.onload = e => {
                        resolve(e.target.result);
                    }

                    reader_.readAsDataURL(blob);
                });
            },

            get_image_size: function (src) {
                return new Promise(resolve => {
                    const image_ = new Image;
                    image_.onload = () => {
                        resolve({width: image_.width, height: image_.height});
                    };
                    image_.src = src;
                })
            },
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
        if ( /*!editImage &&*/ isSelection && currentAction != "create" )
            updateSourceImage();
    }

    window.Asc.plugin.event_onContextMenuShow = function(options) {
        let items_ = [];
        console.log('type', options.type)
        if ( options.type == 'Image' ) {
            items_.push({
                id: 'rembkg',
                text: "Remove background",
            }, {
                id: 'remtext',
                text: 'Remove text',
            });
        } else
        if ( options.type == 'Selection' ) {
            items_.push({
                id: 'createone',
                text: "Generate from text",
            });
        }

        if ( items_.length )
            this.executeMethod("AddContextMenuItem", [{
                guid : this.guid,
                items : [
                    {
                        id: "onClickItem1",
                        text: "ClipDrop",
                        items: items_
                    }
                ]
            }]);
    };

    window.Asc.plugin.attachContextMenuClickEvent("rembkg", function(){
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if ( oResult ) {
                const file = utils.base64ImageToFile(oResult.src, 'car.png');

                const formdata = new FormData();
                formdata.append('image_file', file);

                makeRequest('rembkg', formdata, a => {
                    if ( a != 'error' ) {
                        const fn_ = async (info) => {
                            const blob_ = info.data.blob;

                            const img_base64data = await utils.blob_to_base64(blob_);
                            const img_size = await utils.get_image_size(URL.createObjectURL(blob_));

                            insert_image_to_doc({
                                base64img: img_base64data,
                                size: img_size,
                                imgtype: blob_.type
                            });
                        }

                        fn_(a);
                    }
                });
            }
        });
    }.bind(this));

    window.Asc.plugin.attachContextMenuClickEvent("remtext", function(){
        window.Asc.plugin.executeMethod("GetImageDataFromSelection", [], function(oResult) {
            if ( oResult ) {
                const file = utils.base64ImageToFile(oResult.src, 'car.png');

                const formdata = new FormData();
                formdata.append('image_file', file);

                makeRequest('remtext', formdata, a => {
                    if ( a != 'error' ) {
                        const fn_ = async (info) => {
                            const blob_ = info.data.blob;

                            const img_base64data = await utils.blob_to_base64(blob_);
                            const img_size = await utils.get_image_size(URL.createObjectURL(blob_));

                            insert_image_to_doc({
                                base64img: img_base64data,
                                size: img_size,
                                imgtype: blob_.type
                            });
                        }

                        fn_(a);
                    }
                });
            }
        })
    });

    window.Asc.plugin.attachContextMenuClickEvent("createone", async function(){
        const text = await getDocumentSeletedText();
        if ( text !== undefined && text.length < 1000 ) {
            const formdata = new FormData();
            formdata.append('prompt', text);

            makeRequest('create', formdata, a => {
                if ( a != 'error' ) {
                    const fn_ = async (info) => {
                        const blob_ = info.data.blob;

                        const img_base64data = await utils.blob_to_base64(blob_);
                        const img_size = await utils.get_image_size(URL.createObjectURL(blob_));

                        insert_image_to_doc({
                            base64img: img_base64data,
                            size: img_size,
                            imgtype: blob_.type
                        });
                    }

                    fn_(a);
                }
            });
        }
    });
})(window, undefined);

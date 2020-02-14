[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://opensource.org/licenses/MIT)    ![Release](https://img.shields.io/badge/Release-v4.1.2-blue.svg?style=flat)

## Overview

The plugins for [ONLYOFFICE Document Server](https://github.com/ONLYOFFICE/DocumentServer) and [ONLYOFFICE Desktop Editors](https://github.com/ONLYOFFICE/DesktopEditors) to enhance their functionality.

## Available plugins

Currently the following plugins are available:

* [OCR](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/ocr) for recognizing text from pictures and screenshots and inserting it into your documents.
* [Photo Editor](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/photoeditor) for editing images right in your documents, including cropping, resizing, applying effects, and more. 
* [Speech](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/speech) for converting selected text into speech.
* [Thesaurus](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/synonim) for finding synonyms of a word and replacing it with the selected one.
* [Translator](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/translate) for translating the selected text using Yandex Translator.
* [YouTube](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/youtube) for embedding YouTube videos into your documents. 
* [Macros](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/macros) for creating JavaScript macros to run in your documents.
* [Highlight code](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/code) for highlighting syntax of the code selecting the necessary language, style, and background color.

If you want to create your own plugin, check out the [examples folder](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/release/v5.5.0/examples).

All the plugins are released under an [MIT license](https://opensource.org/licenses/MIT). See the LICENSE file for more information.

## How to add plugins to ONLYOFFICE solutions

**For server solutions**

Put the folder with the plugin code to ONLYOFFICE Document Server folder:

* For Linux - /var/www/onlyoffice/documentserver/sdkjs-plugins/.
* For Windows - %ProgramFiles%\ONLYOFFICE\DocumentServer\sdkjs-plugins\.

**For desktop editors**

* Archive the plugin files (config.json, index.html, and pluginCode.js).
* Change the file extension to .plugin. 
* Go to the Plugins tab, click Manage Plugins >> Add plugin, browse for the .plugin file.

**For the cloud version**

Turn your plugin into a browser extension. Currently, it works for Chrome users only.

Use [chrome_extension_example](https://github.com/ONLYOFFICE/sdkjs-plugins/tree/master/examples/chrome_extension_example) to learn how to transform an ONLYOFFICE plugin into a Chrome extension.

Detailed installation instructions for all versions can be found in the [API documentation](https://api.onlyoffice.com/plugin/installation).

## Project information

Official website: [https://www.onlyoffice.com/](https://www.onlyoffice.com/?utm_source=github&utm_medium=cpc&utm_campaign=GitHubPlugins)

App Directory: [https://www.onlyoffice.com/app-directory](https://www.onlyoffice.com/app-directory?utm_source=github&utm_medium=cpc&utm_campaign=GitHubPlugins)

SaaS version: [https://www.onlyoffice.com/cloud-office.aspx](https://www.onlyoffice.com/cloud-office.aspx?utm_source=github&utm_medium=cpc&utm_campaign=GitHubPlugins)

## Documentation

Plugins structure and installation https://api.onlyoffice.com/plugin/basic.

Plugins code and methods https://api.onlyoffice.com/docbuilder/basic.

## User feedback and support

If you have any problems or question about ONLYOFFICE plugins, use the issues section here, in this repository.  

